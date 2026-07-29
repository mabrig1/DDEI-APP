/**
 * OpenRouter configuration.
 *
 * OpenRouter is a single OpenAI-compatible endpoint in front of hundreds of
 * models from many vendors. That is the reason it was chosen here over any one
 * vendor's SDK: the model is a string in an environment variable, so this app
 * can move between providers — or onto a zero-cost free-tier model — without a
 * code change or a redeploy.
 *
 * Nothing in this file is required. With OPENROUTER_API_KEY unset the AI
 * features degrade to the rule-based engines that were already here
 * (advisorEngine, helpBotEngine, the deterministic portfolio writer), so the
 * site behaves exactly as it did before. That matters on a platform that has
 * already been shut down twice by a billing surprise: an unpaid or exhausted
 * OpenRouter account must not be able to take a page down.
 */

const DEFAULT_BASE_URL = 'https://openrouter.ai/api/v1';

// openrouter/auto is OpenRouter's own Auto Router — it picks a suitable model
// per request, so this default keeps working when individual model slugs are
// retired or renamed. Pin a specific slug (see https://openrouter.ai/models)
// once you know what you want, or set openrouter/free to route only to
// zero-cost models. Slugs ending in ":free" are also free but rotate often.
const DEFAULT_MODEL = 'openrouter/auto';

function num(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function apiKey() {
  return (process.env.OPENROUTER_API_KEY || '').trim();
}

/** True when a key is present — i.e. live model calls are possible at all. */
function isOpenRouterConfigured() {
  return apiKey().length > 0;
}

/**
 * True when live calls should actually be made. Set OPENROUTER_ENABLED=false to
 * pause every AI feature (falling back to the rule-based engines) while leaving
 * the credentials in place — useful for capping spend without redeploying.
 */
function isAiEnabled() {
  return isOpenRouterConfigured() && process.env.OPENROUTER_ENABLED !== 'false';
}

/**
 * Fallback models, passed to OpenRouter as the `models` array. If the primary
 * model errors — rate limit, downtime, context length, moderation — OpenRouter
 * tries these in order within the same request, which is cheaper than a
 * round trip back to us to retry.
 */
function fallbackModels() {
  return (process.env.OPENROUTER_FALLBACK_MODELS || '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
}

function openRouterConfig() {
  const onVercel = Boolean(process.env.VERCEL);
  return {
    apiKey: apiKey(),
    baseUrl: (process.env.OPENROUTER_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, ''),
    model: (process.env.OPENROUTER_MODEL || DEFAULT_MODEL).trim(),
    fallbackModels: fallbackModels(),
    maxTokens: num(process.env.OPENROUTER_MAX_TOKENS, 700),
    temperature: Number.isFinite(Number(process.env.OPENROUTER_TEMPERATURE))
      ? Number(process.env.OPENROUTER_TEMPERATURE)
      : 0.4,

    // Per-HTTP-call ceiling.
    timeoutMs: num(process.env.OPENROUTER_TIMEOUT_MS, 12000),

    // Ceiling for a whole agent turn including every tool round. app.js gives up
    // on a request at 20s on Vercel, so the budget has to end comfortably before
    // that: a timeout we control returns a useful fallback answer, whereas the
    // platform's timeout returns nothing.
    budgetMs: num(process.env.OPENROUTER_BUDGET_MS, onVercel ? 15000 : 30000),

    maxToolRounds: num(process.env.OPENROUTER_MAX_TOOL_ROUNDS, 4),

    // Sent as HTTP-Referer / X-Title. OpenRouter uses these to attribute
    // traffic on its public leaderboards; they are optional and non-secret.
    siteUrl: process.env.OPENROUTER_SITE_URL || process.env.FRONTEND_URL || 'https://ddei.online',
    siteName: process.env.OPENROUTER_SITE_NAME || 'Destiny Skills Bridge',

    // Per-caller ceiling, counted in this process only — see utils/aiRateLimit.js.
    rateLimitPerMinute: num(process.env.OPENROUTER_RATE_LIMIT_PER_MINUTE, 12),
  };
}

/** Non-secret summary for /api/health and the admin dashboard. */
function aiStatus() {
  const cfg = openRouterConfig();
  return {
    provider: 'openrouter',
    configured: isOpenRouterConfigured(),
    enabled: isAiEnabled(),
    model: cfg.model,
    fallbackModels: cfg.fallbackModels,
  };
}

module.exports = {
  DEFAULT_MODEL,
  openRouterConfig,
  isOpenRouterConfigured,
  isAiEnabled,
  aiStatus,
};
