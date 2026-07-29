const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
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
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    // Admin tokens carry isAdmin and no `sub`, so a route that only reads
    // req.userId sees an admin as anonymous. Surfacing the flag lets a route
    // treat staff as entitled without a second token check.
    req.isAdmin = Boolean(payload.isAdmin);
  } catch (err) {
    // ignore invalid token, treat as anonymous
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
