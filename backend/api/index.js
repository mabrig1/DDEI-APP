/**
 * Vercel serverless entrypoint.
 */

const app = require('../src/app');
const connectDB = require('../src/config/db');
const { allowOriginHeader } = require('../src/config/cors');

module.exports = async function handler(req, res) {
  // 1. Reflect only origins approved by the shared CORS policy.
  const reqOrigin = req.headers.origin;
  const allowOrigin = allowOriginHeader(reqOrigin);

  // 2. Set CORS headers globally on ALL outgoing responses
  if (allowOrigin) res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');

  // 3. IMMEDIATELY ANSWER PREFLIGHT (OPTIONS) REQUESTS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    // 4. CONNECT TO DATABASE
    await connectDB();
  } catch (err) {
    console.error('Database connection failed:', err);

    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      message: 'The service is temporarily unavailable. Please try again in a moment.',
    }));
    return;
  }

  // 5. HAND OFF TO EXPRESS APP
  return app(req, res);
};
