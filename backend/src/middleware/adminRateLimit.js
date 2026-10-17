const crypto = require('crypto');
const AdminAuthAttempt = require('../models/AdminAuthAttempt');

function adminRateLimit(namespace, max = 8, windowMs = 15 * 60 * 1000) {
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
      return res.status(503).json({ message: 'Administrator sign-in is temporarily unavailable. Please try again shortly.' });
    }
  };
}
module.exports = { adminRateLimit };
