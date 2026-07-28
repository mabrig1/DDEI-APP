/**
 * Vercel serverless entrypoint.
 *
 * vercel.json rewrites every path here, so this function serves the whole API.
 * The Express app comes from src/app.js unchanged — the only serverless-specific
 * work is making sure MongoDB is connected before the app handles the request,
 * since there is no startup phase to do it in.
 */

const app = require('../src/app');
const connectDB = require('../src/config/db');
const { allowOriginHeader } = require('../src/config/cors');

module.exports = async function handler(req, res) {
  try {
    // Resolves instantly on a warm invocation; src/config/db.js caches the
    // connection across invocations.
    await connectDB();
  } catch (err) {
    console.error('Database connection failed:', err);

    // This response bypasses the Express CORS middleware, so set the headers
    // by hand — without them the browser reports an opaque CORS failure and
    // the user sees a bare "Failed to fetch" instead of this message.
    const allowOrigin = allowOriginHeader(req.headers.origin);
    if (allowOrigin) res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    if (allowOrigin && allowOrigin !== '*') res.setHeader('Vary', 'Origin');

    // A dead database is a 503, not a 500 — it means "try again", and it keeps
    // the failure distinguishable from a bug in a route handler. The frontend
    // treats 5xx as a cue to fall back to the Appwrite mirror.
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      message: 'The service is temporarily unavailable. Please try again in a moment.',
    }));
    return;
  }

  return app(req, res);
};
