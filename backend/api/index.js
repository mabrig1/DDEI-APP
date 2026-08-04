/**
 * Vercel serverless entrypoint.
 */

const app = require('../src/app');
const connectDB = require('../src/config/db');
const { allowOriginHeader } = require('../src/config/cors');

module.exports = async function handler(req, res) {
  // Determine allowed origin or fallback to production domain
  const reqOrigin = req.headers.origin;
  const allowOrigin = allowOriginHeader(reqOrigin) || 'https://ddei.online';

  // 1. IMMEDIATELY ANSWER PREFLIGHT (OPTIONS) REQUESTS
  // Never make preflight requests wait for a database connection.
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    // 2. CONNECT TO DATABASE
    await connectDB();
  } catch (err) {
    console.error('Database connection failed:', err);

    // Guaranteed CORS headers on DB failure
    res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    if (allowOrigin !== '*') res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      message: 'The service is temporarily unavailable. Please try again in a moment.',
    }));
    return;
  }

  // 3. HAND OFF TO EXPRESS APP
  return app(req, res);
};
