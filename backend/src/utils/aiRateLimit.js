/**
 * Per-caller ceiling on paid model calls.
 *
 * Deliberately in-memory and deliberately modest in what it claims. On Vercel
 * each function instance keeps its own counter, so a determined caller spread
 * across instances gets more than the nominal limit. That is fine for what this
 * guards against: a stuck retry loop or one user hammering the chat box running
 * up an OpenRouter bill. It is not a security control, and the real spend cap
 * is the credit limit on the OpenRouter account itself — set one.
 *
 * Exceeding the limit is not an error to the caller. The request falls through
 * to the rule-based engine, so the chat still answers; it just answers the way
 * it did before this integration existed.
 */

const WINDOW_MS = 60000;

// Bounded so a long-lived instance can't accumulate a key per visitor forever.
const MAX_TRACKED_KEYS = 5000;

const hits = new Map();

function prune(now) {
  for (const [key, timestamps] of hits) {
    const live = timestamps.filter((time) => now - time < WINDOW_MS);
    if (live.length) hits.set(key, live);
    else hits.delete(key);
  }
}

/**
 * Record an attempt and report whether it is within the limit.
 * @returns {boolean} true if the call may proceed.
 */
function allowAiCall(key, limitPerMinute) {
  if (!limitPerMinute || limitPerMinute <= 0) return true;

  const now = Date.now();
  if (hits.size > MAX_TRACKED_KEYS) prune(now);

  const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= limitPerMinute) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
}

/** Identify the caller: the signed-in user where we have one, otherwise the IP. */
function callerKey(req) {
  return req.userId ? `user:${req.userId}` : `ip:${req.ip || 'unknown'}`;
}

module.exports = { allowAiCall, callerKey };
