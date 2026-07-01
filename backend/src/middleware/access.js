const User = require('../models/User');

async function requireActiveAccess(req, res, next) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.trialExpiresAt) {
    user.trialExpiresAt = user.trialEndsAt();
    await user.save();
  }

  if (!user.hasActiveAccess()) {
    const courseId = req.params.id;
    const hasPurchased = (user.purchasedCourses || []).some((p) => p.courseId === courseId);
    if (!hasPurchased) {
      return res.status(402).json({
        message: 'Your free 7-day trial has ended. Upgrade to Premium or purchase this course to continue.',
        upgradeRequired: true,
        trialExpiresAt: user.trialExpiresAt,
      });
    }
  }

  next();
}

async function requirePremium(req, res, next) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!user.hasPremiumAccess()) {
    return res.status(402).json({
      message: 'This is a Premium feature. Upgrade to a paid plan to unlock it.',
      upgradeRequired: true,
    });
  }

  next();
}

module.exports = { requireActiveAccess, requirePremium };
