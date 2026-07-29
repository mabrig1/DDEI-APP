/**
 * The bridge between a controller and an agent — including the way back down.
 *
 * Every AI feature here is an upgrade to something that already worked. The
 * rule-based engines (advisorEngine, helpBotEngine, the deterministic portfolio
 * writer) are still in the codebase and still correct; OpenRouter simply
 * answers better when it is available. So the contract for every caller is the
 * same: ask the agent, and if anything at all goes wrong — no key, no credit,
 * rate limited, slow, malformed — quietly serve the old answer instead.
 *
 * The learner never sees an AI outage. They see a slightly less tailored reply.
 */

const { runAgent } = require('./aiClient');
const { getAgent } = require('./aiAgents');
const { isAiEnabled, openRouterConfig } = require('../config/openrouter');
const { allowAiCall, callerKey } = require('./aiRateLimit');

/**
 * @param {object} options
 * @param {string}   options.agentName    Key in aiAgents.js.
 * @param {object}   options.req          Express request, for rate-limit identity.
 * @param {string}   options.message
 * @param {Array}    [options.history]
 * @param {object}   [options.toolContext] Entitlements passed to the tools.
 * @param {function} options.fallback     Returns the rule-based reply. Must not throw.
 * @returns {Promise<{reply: string, source: 'ai'|'fallback', model?: string, toolsUsed?: string[]}>}
 */
async function answerWithAgent({ agentName, req, message, history = [], toolContext = {}, fallback }) {
  const agent = getAgent(agentName);
  const cfg = openRouterConfig();

  if (!isAiEnabled()) return { reply: fallback(), source: 'fallback' };

  if (!allowAiCall(callerKey(req), cfg.rateLimitPerMinute)) {
    // Not an error worth logging every time — a busy user is not a fault.
    return { reply: fallback(), source: 'fallback' };
  }

  try {
    const result = await runAgent({
      system: agent.system,
      message,
      history,
      tools: agent.tools,
      toolContext,
      maxTokens: agent.maxTokens,
      temperature: agent.temperature,
    });
    return {
      reply: result.reply,
      source: 'ai',
      model: result.model,
      toolsUsed: result.toolsUsed,
    };
  } catch (err) {
    // One line, not a stack trace: this path is expected whenever the
    // OpenRouter account lapses, and it should be readable in the log rather
    // than buried. describeFailure() has already made the reason specific.
    console.warn(`[ai] ${agentName} fell back to the rule-based engine — ${err.message}`);
    return { reply: fallback(), source: 'fallback' };
  }
}

module.exports = { answerWithAgent };
