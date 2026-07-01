const User = require('../models/User');

async function ping(req, res) {
  const { event } = req.body;
  const update = { $set: { lastSeenAt: new Date() } };

  if (event === 'visit') {
    update.$inc = { visitCount: 1 };
  } else if (event === 'heartbeat') {
    update.$inc = { totalMinutes: 2 };
  }

  await User.findByIdAndUpdate(req.userId, update);
  res.json({ ok: true });
}

module.exports = { ping };
