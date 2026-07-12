const ActivityLog = require('../models/ActivityLog');

// Lightweight user-agent parsing — enough for admin analytics without a dependency.
function parseUserAgent(ua = '') {
  let browser = 'Other';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';

  let os = 'Other';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/mac os/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  const device = /mobile|iphone|ipod|android(?!.*tablet)/i.test(ua)
    ? 'Mobile'
    : /ipad|tablet/i.test(ua) ? 'Tablet' : 'Desktop';

  return { browser, os, device };
}

function requestClientInfo(req) {
  const ua = req.headers['user-agent'] || '';
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) || req.ip || null;
  return { ...parseUserAgent(ua), ip };
}

// Fire-and-forget: analytics must never break or slow down the main request.
function logActivity(userId, userName, action, metadata = null) {
  ActivityLog.create({ user: userId || null, userName: userName || null, action, metadata })
    .catch((err) => console.error('Failed to write activity log:', err.message));
}

module.exports = { logActivity, requestClientInfo, parseUserAgent };
