/**
 * OpenRouter client — the agent loop.
 *
 * OpenRouter speaks the OpenAI chat-completions wire format, so this is a plain
 * axios call rather than a vendor SDK. That is deliberate: keeping the
 * transport provider-neutral is the whole point of routing through OpenRouter,
 * and it avoids adding a dependency for what is one POST and a loop.
 *
 * The loop is the agentic part. The model may answer immediately, or ask to
 * call one of the tools in utils/aiTools.js; we run the tool, hand back the
 * result, and let it continue until it has an answer or the budget runs out.
 *
 * Two things this file is strict about, both learned from running on a
 * serverless host:
 *
 *   • **A wall-clock budget, not just a per-call timeout.** Four tool rounds at
 *     a 12s timeout each is 48s, and the platform kills the invocation at 20s —
 *     so every HTTP call gets whatever is left of the turn's budget, and the
 *     loop stops when there isn't enough left to be worth starting.
 *   • **Failure is never fatal.** Callers catch and fall back to the rule-based
 *     engines. An expired OpenRouter balance degrades a feature; it must not
 *     break a page.
 */

const axios = require('axios');
const { openRouterConfig, isAiEnabled } = require('../config/openrouter');
const { toolDefinitions, runTool } = require('./aiTools');

// Below this there is no point starting another HTTP call — it would time out
// before the model could produce anything useful.
const MIN_CALL_MS = 2500;

class AiUnavailableError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'AiUnavailableError';
    this.cause = cause;
  }
}

// The two chat widgets in index.html each keep their own history and label the
// bot's turns differently — the advisor uses role:'advisor', the help bot uses
// role:'bot'. Anything not in this set is treated as the learner speaking.
// Getting this wrong is quiet and expensive: the model reads its own previous
// replies as things the user said, and starts answering its own questions.
const ASSISTANT_ROLES = new Set(['assistant', 'advisor', 'bot', 'ai', 'system']);

/** Turn the stored chat history into chat-completions messages. */
function normaliseHistory(history, limit = 8) {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-limit)
    .map((entry) => {
      const label = String(entry.role || entry.from || '').toLowerCase();
      const role = ASSISTANT_ROLES.has(label) ? 'assistant' : 'user';
      const content = String(entry.content || entry.text || entry.message || '').slice(0, 2000);
      return content ? { role, content } : null;
    })
    .filter(Boolean);
}

function parseArguments(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}

/**
 * Readable reasons for the log. OpenRouter returns real HTTP statuses, and the
 * difference between "you are out of credit" and "that model slug does not
 * exist" is exactly what an operator needs to see at 2am.
 */
function describeFailure(err) {
  const status = err.response && err.response.status;
  const detail = err.response && err.response.data && (err.response.data.error || err.response.data);
  const message = (detail && (detail.message || detail.error)) || err.message;

  if (status === 401 || status === 403) return `OpenRouter rejected the API key (${status}): ${message}`;
  if (status === 402) return `OpenRouter account is out of credit (402): ${message}`;
  if (status === 404) return `OpenRouter does not recognise the model "${openRouterConfig().model}" (404): ${message}`;
  if (status === 429) return `OpenRouter rate limit reached (429): ${message}`;
  if (err.code === 'ECONNABORTED') return 'OpenRouter did not respond within the time budget.';
  return status ? `OpenRouter error ${status}: ${message}` : `OpenRouter request failed: ${message}`;
}

/**
 * Run one agent turn.
 *
 * @param {object} options
 * @param {string} options.system      System prompt.
 * @param {string} options.message     The user's latest message.
 * @param {Array}  [options.history]   Prior turns.
 * @param {string[]} [options.tools]   Tool names from aiTools.js the agent may call.
 * @param {object} [options.toolContext] Passed to every tool — carries entitlements.
 * @param {number} [options.maxTokens]
 * @param {number} [options.temperature]
 * @returns {Promise<{reply: string, model: string, toolsUsed: string[], rounds: number, usage: object|null}>}
 */
async function runAgent({
  system,
  message,
  history = [],
  tools = [],
  toolContext = {},
  maxTokens,
  temperature,
}) {
  if (!isAiEnabled()) throw new AiUnavailableError('OpenRouter is not configured.');

  const cfg = openRouterConfig();
  const deadline = Date.now() + cfg.budgetMs;
  const definitions = toolDefinitions(tools);

  const messages = [
    { role: 'system', content: system },
    ...normaliseHistory(history),
    { role: 'user', content: String(message).slice(0, 4000) },
  ];

  const client = axios.create({
    baseURL: cfg.baseUrl,
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      'Content-Type': 'application/json',
      // Optional attribution headers — OpenRouter uses them for its public
      // app leaderboards. Neither is a credential.
      'HTTP-Referer': cfg.siteUrl,
      'X-Title': cfg.siteName,
    },
  });

  const toolsUsed = [];
  let usage = null;
  let servedBy = cfg.model;

  for (let round = 0; round <= cfg.maxToolRounds; round += 1) {
    const remaining = deadline - Date.now();
    if (remaining < MIN_CALL_MS) {
      throw new AiUnavailableError(`Ran out of time budget after ${round} round(s).`);
    }

    const body = {
      model: cfg.model,
      messages,
      max_tokens: maxTokens || cfg.maxTokens,
      temperature: temperature === undefined ? cfg.temperature : temperature,
    };

    // OpenRouter's own in-request failover: if the primary model is rate
    // limited or down, it tries these before returning an error to us.
    if (cfg.fallbackModels.length) body.models = [cfg.model, ...cfg.fallbackModels];

    // On the final round, drop the tools so the model has no choice but to
    // answer in prose — otherwise it can spend the last round on a tool call
    // whose result nobody will ever read.
    if (definitions.length && round < cfg.maxToolRounds) {
      body.tools = definitions;
      body.tool_choice = 'auto';
    }

    let data;
    try {
      const response = await client.post('/chat/completions', body, {
        timeout: Math.min(cfg.timeoutMs, remaining),
      });
      data = response.data;
    } catch (err) {
      throw new AiUnavailableError(describeFailure(err), err);
    }

    // OpenRouter can return a 200 whose body is an error object.
    if (data && data.error) {
      throw new AiUnavailableError(`OpenRouter error: ${data.error.message || JSON.stringify(data.error)}`);
    }

    const choice = data && data.choices && data.choices[0];
    if (!choice || !choice.message) throw new AiUnavailableError('OpenRouter returned no completion.');

    if (data.usage) usage = data.usage;
    // With auto-routing or a fallback list, the model that actually served the
    // request is not necessarily the one we asked for. Report what ran.
    if (data.model) servedBy = data.model;

    const assistant = choice.message;
    const toolCalls = assistant.tool_calls || [];

    if (!toolCalls.length) {
      const reply = (assistant.content || '').trim();
      if (!reply) throw new AiUnavailableError('OpenRouter returned an empty reply.');
      return { reply, model: servedBy, toolsUsed, rounds: round, usage };
    }

    // The assistant turn holding the tool calls must be echoed back verbatim,
    // and every call must get a matching tool message, or the next request is
    // rejected as malformed.
    messages.push(assistant);

    for (const call of toolCalls) {
      const name = call.function && call.function.name;
      const args = parseArguments(call.function && call.function.arguments);
      const result = runTool(name, args, toolContext);
      toolsUsed.push(name);
      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        name,
        content: JSON.stringify(result).slice(0, 8000),
      });
    }
  }

  throw new AiUnavailableError(`Stopped after ${cfg.maxToolRounds} tool rounds without a final answer.`);
}

module.exports = { runAgent, AiUnavailableError, normaliseHistory };
