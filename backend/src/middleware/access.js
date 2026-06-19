const User = require('../models/User');

async function requireActiveAccess(req, res, next) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.trialExpiresAt) {
    user.trialExpiresAt = user.trialEndsAt();
    await user.save();
  }

  if (!user.hasActiveAccess()) {
    return res.status(402).json({
      message: 'Your free 7-day trial has ended. Upgrade to Premium to keep learning.',
      upgradeRequired: true,
      trialExpiresAt: user.trialExpiresAt,
    });
  }

  next();
}

module.exports = { requireActiveAccess };
