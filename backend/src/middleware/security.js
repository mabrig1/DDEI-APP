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
  return async function rateLimitMiddleware(req, res, next) {
    const now = Date.now();
    sweepExpired(now);
    const key = `${namespace}:${clientKey(req)}`;
    let bucket;
    const shared = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
    if (shared) {
      try {
        const RateLimitBucket = require('../models/RateLimitBucket');
        const window = Math.floor(now / windowMs);
        const resetAt = (window + 1) * windowMs;
        const filter = { _id: `${key}:${window}` };
        const update = { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(resetAt) } };
        let record;
        try { record = await RateLimitBucket.findOneAndUpdate(filter, update, { upsert: true, new: true }); }
        catch (err) {
          if (err.code !== 11000) throw err;
          record = await RateLimitBucket.findOneAndUpdate(filter, { $inc: { count: 1 } }, { new: true });
        }
        bucket = { count: record.count - 1, resetAt };
      } catch (_) {
        securityEvent('rate_limit_store_unavailable', req);
        res.setHeader('Retry-After', '30');
        return res.status(503).json({ message: 'The service is temporarily unavailable.' });
      }
    } else bucket = buckets.get(key);
    if (!shared && !bucket && buckets.size >= 10000) {
      res.setHeader('Retry-After', '60');
      return res.status(429).json({ message: 'Too many requests. Please try again shortly.' });
    }
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
      if (bucket.count === max + 1) securityEvent('rate_limit_exceeded', req, { namespace });
      res.setHeader('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
      return res.status(429).json({ message: 'Too many requests. Please wait and try again.' });
    }
    next();
  };
}

function securityHeaders(req, res, next) {
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
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

function securityEvent(event, req, details = {}) {
  // Never log bodies, queries, tokens, emails, raw IPs or error objects.
  console.warn(JSON.stringify({ component: 'ddei-security', event, method: req.method,
    client: clientKey(req), ...details }));
}
function safeInput(value, depth = 0) {
  if (depth > 20) return false;
  if (value === null || typeof value !== 'object') return true;
  return Object.entries(value).every(([key, child]) =>
    !key.startsWith('$') && !key.includes('.') &&
    !['__proto__', 'constructor', 'prototype'].includes(key) && safeInput(child, depth + 1));
}
function validateRequest(req, res, next) {
  const body = req.body;
  if ((body !== undefined && (body === null || Array.isArray(body) || typeof body !== 'object')) ||
      !safeInput(body) || !safeInput(req.query)) {
    securityEvent('invalid_request_structure', req);
    return res.status(400).json({ message: 'Invalid request structure.' });
  }
  if (req.path.startsWith('/auth') || req.path.startsWith('/admin')) {
    for (const key of ['password', 'username', 'email', 'token', 'recoveryToken']) {
      if (body?.[key] !== undefined && (typeof body[key] !== 'string' || body[key].length > 2048)) {
        return res.status(400).json({ message: 'Invalid credential format.' });
      }
    }
  }
  next();
}
module.exports = { rateLimit, securityHeaders, validateRequest, securityEvent };

