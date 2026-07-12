const User = require('../models/User');
const { logActivity, requestClientInfo } = require('../utils/activityLogger');

async function ping(req, res) {
  const { event } = req.body;
  const update = { $set: { lastSeenAt: new Date() } };

  if (event === 'visit') {
    update.$inc = { visitCount: 1 };
  } else if (event === 'heartbeat') {
    update.$inc = { totalMinutes: 2 };
  }

  const user = await User.findByIdAndUpdate(req.userId, update, { new: true });

  if (event === 'visit' && user) {
    logActivity(user._id, user.name, 'visit', requestClientInfo(req));
  }

  res.json({ ok: true });
}

module.exports = { ping };
