const crypto = require('crypto');

const buckets = new Map();
let lastSweep = 0;

function clientKey(req) {
  // Express derives req.ip according to the configured trusted proxy count;
  // reading X-Forwarded-For directly would let direct clients spoof buckets.
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 24);
}

function sweepExpired(now) {
  if (now - lastSweep < 60 * 1000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function rateLimit({ windowMs = 15 * 60 * 1000, max = 100, namespace = 'api' } = {}) {
  return function rateLimitMiddleware(req, res, next) {
    const now = Date.now();
    sweepExpired(now);
    const key = `${namespace}:${clientKey(req)}`;
    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    const remaining = Math.max(0, max - bucket.count);
    res.setHeader('RateLimit-Limit', String(max));
    res.setHeader('RateLimit-Remaining', String(remaining));
    res.setHeader('RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)));
    if (bucket.count > max) {
      res.setHeader('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
      return res.status(429).json({ message: 'Too many requests. Please wait and try again.' });
    }
    next();
  };
}

function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  res.setHeader('Cache-Control', 'no-store');
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
}

module.exports = { rateLimit, securityHeaders };
