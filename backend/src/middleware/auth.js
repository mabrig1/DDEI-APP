const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

function verifyLearnerToken(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
  // Administrator credentials must never double as learner credentials.
  if (payload?.isAdmin || typeof payload?.sub !== 'string' || !/^[a-f0-9]{24}$/i.test(payload.sub) || !mongoose.isValidObjectId(payload.sub)) {
    throw new Error('Not a learner token');
  }
  return payload.sub;
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    req.userId = verifyLearnerToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function optionalAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next();

  try {
    req.userId = verifyLearnerToken(token);
  } catch (err) {
    // ignore invalid token, treat as anonymous
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
