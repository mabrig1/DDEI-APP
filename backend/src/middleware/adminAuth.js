const jwt = require('jsonwebtoken');
const AdminCredential = require('../models/AdminCredential');
const { securityEvent } = require('./security');
async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  let payload;
  try {
    payload = jwt.verify(header.startsWith('Bearer ') ? header.slice(7) : '', process.env.JWT_SECRET, { algorithms: ['HS256'] });
  } catch (_) {
    securityEvent('admin_authentication_rejected', req);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  if (payload.sub !== 'admin' || payload.isAdmin !== true) return res.status(403).json({ message: 'Admin access required' });
  const credential = await AdminCredential.findOne({ key: 'primary' }).select('authVersion');
  if ((payload.ver || 0) !== (credential?.authVersion || 0)) return res.status(401).json({ message: 'Invalid or expired token' });
  next();
}
module.exports = { requireAdmin };
