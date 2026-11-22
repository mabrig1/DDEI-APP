const crypto = require('crypto');
const { requireAdmin } = require('./adminAuth');

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireContentWriteAccess(req, res, next) {
  const apiKey = req.headers['x-content-api-key'];
  // The server-to-server API key is a separate explicit permission boundary.
  if (apiKey && process.env.CONTENT_API_KEY && safeEqual(apiKey, process.env.CONTENT_API_KEY)) {
    return next();
  }
  // Apply exactly the same role, subject and session-version checks as every
  // other administrator route. Password changes and resets revoke old tokens.
  return requireAdmin(req, res, next);
}

module.exports = { requireContentWriteAccess };
