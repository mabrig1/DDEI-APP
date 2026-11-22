const crypto = require('crypto');
const AdminAuthAttempt = require('../models/AdminAuthAttempt');

function sharedRateLimit(namespace, max = 8, windowMs = 15 * 60 * 1000, service = 'Authentication') {
  return async (req, res, next) => {
    const now = Date.now();
    const end = (Math.floor(now / windowMs) + 1) * windowMs;
    const ip = crypto.createHash('sha256').update(req.ip || req.socket?.remoteAddress || 'unknown').digest('hex');
    const key = `${namespace}:${ip}:${Math.floor(now / windowMs)}`;
    try {
      let bucket;
      try {
        bucket = await AdminAuthAttempt.findOneAndUpdate({ _id: key }, {
          $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(end + windowMs) },
        }, { upsert: true, new: true });
      } catch (err) {
        if (err.code !== 11000) throw err;
        bucket = await AdminAuthAttempt.findOneAndUpdate({ _id: key }, { $inc: { count: 1 } }, { new: true });
      }
      if (bucket.count > max) {
        res.setHeader('Retry-After', String(Math.ceil((end - now) / 1000)));
        return res.status(429).json({ message: 'Too many attempts. Please wait a few minutes and try again.' });
      }
      return next();
    } catch (_) {
      return res.status(503).json({ message: `${service} is temporarily unavailable. Please try again shortly.` });
    }
  };
}
// Keep the established admin limiter while reusing the database-backed
// counter for learner sign-in, recovery and payment endpoints.
const adminRateLimit = (namespace, max = 8, windowMs = 15 * 60 * 1000) =>
  sharedRateLimit(namespace, max, windowMs, 'Administrator sign-in');

module.exports = { adminRateLimit, sharedRateLimit };
