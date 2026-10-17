const jwt = require('jsonwebtoken');
const AdminCredential = require('../models/AdminCredential');

async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (payload.sub !== 'admin' || payload.isAdmin !== true) {
      return res.status(403).json({ message: 'Admin access required' });
    }
  } catch (_) {
    return res.status(401).json({ message: 'Invalid or expired token. Please sign in again.' });
  }
  try {
    const credential = await AdminCredential.findOne({ key: 'primary' });
    if ((payload.sv || null) !== (credential?.sessionVersion || null)) {
      return res.status(401).json({ message: 'Your admin session has ended. Please sign in again.' });
    }
    req.adminSessionVersion = credential?.sessionVersion || null;
    return next();
  } catch (_) {
    return res.status(503).json({ message: 'Could not verify administrator access. Please try again shortly.' });
  }
}
module.exports = { requireAdmin };
