const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { securityEvent } = require('./security');
async function authenticate(req, res, next, optional = false) {
  const header = req.headers.authorization || '';
  if (!header && optional) return next();
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  let payload;
  try {
    if (!token) throw new Error('missing token');
    payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (!/^[a-f0-9]{24}$/i.test(payload.sub || '') || payload.isAdmin) throw new Error('wrong role');
  } catch (_) {
    securityEvent('authentication_rejected', req);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  const user = await User.findById(payload.sub).select('authVersion');
  if (!user || (payload.ver || 0) !== (user.authVersion || 0)) return res.status(401).json({ message: 'Invalid or expired token' });
  req.userId = payload.sub;
  next();
}
function requireAuth(req, res, next) { return authenticate(req, res, next); }
function optionalAuth(req, res, next) { return authenticate(req, res, next, true); }
module.exports = { requireAuth, optionalAuth };
