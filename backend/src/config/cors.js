/**
 * Shared CORS origin policy.
 *
 * CLIENT_ORIGIN accepts a comma-separated list, because the site is reachable
 * on the apex domain, on www, and on Vercel preview URLs — a single origin
 * would break two of the three. Unset means "allow any", which keeps local
 * development and first deploys working before the variable is configured.
 *
 * Lives on its own so the serverless entrypoint can send the same headers on
 * its early-exit responses. Without them the browser reports an opaque CORS
 * failure instead of the JSON error, which is precisely the bare
 * "Failed to fetch" this codebase works to avoid.
 */

function allowedOrigins() {
  return (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

/** True when `origin` may call this API. */
function isOriginAllowed(origin) {
  const allowed = allowedOrigins();
  if (allowed.length === 0) return true;
  // Same-origin and server-to-server requests send no Origin header.
  if (!origin) return true;
  return allowed.includes(String(origin).replace(/\/$/, ''));
}

/** Options object for the `cors` middleware. */
function corsOptions() {
  return {
    origin(origin, callback) {
      // Reject by withholding the CORS headers, never by throwing. Passing an
      // Error here surfaces as a 500, which is wrong twice over: a request from
      // an unlisted origin is not a server fault, and burying it among real
      // errors makes genuine failures harder to spot. Returning false lets the
      // response complete normally without Access-Control-Allow-Origin — the
      // browser then blocks it, which is where that decision belongs.
      callback(null, isOriginAllowed(origin));
    },
  };
}

/**
 * The value for Access-Control-Allow-Origin on a hand-written response, or null
 * when the request's origin is not permitted.
 */
function allowOriginHeader(origin) {
  if (!isOriginAllowed(origin)) return null;
  if (allowedOrigins().length === 0) return '*';
  return origin || '*';
}

module.exports = { allowedOrigins, isOriginAllowed, corsOptions, allowOriginHeader };
