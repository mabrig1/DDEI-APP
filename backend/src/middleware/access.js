const User = require('../models/User');
const { COURSES } = require('../data/courseCatalog');
const { ONLINE_COURSE_PRICE_NGN, HUMAN_ASSISTED_PRICE_NGN, isIntroductoryCourse } = require('../config/pricing');

async function requireActiveAccess(req, res, next) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const courseId = req.params.id;
  const course = COURSES.find((c) => c.id === courseId);
  const hasPurchased = (user.purchasedCourses || []).some((p) => p.courseId === courseId);

  if (isIntroductoryCourse(courseId) || hasPurchased || user.hasActiveAccess()) return next();

  return res.status(402).json({
    message: `Enroll online for ₦${ONLINE_COURSE_PRICE_NGN.toLocaleString()} or choose online plus human-assisted learning for ₦${HUMAN_ASSISTED_PRICE_NGN.toLocaleString()}.`,
    upgradeRequired: true,
    purchaseRequired: true,
    purchasePlan: 'course-online',
    humanAssistedPlan: 'course-human-assisted',
    courseId,
    onlinePriceNGN: ONLINE_COURSE_PRICE_NGN,
    humanAssistedPriceNGN: HUMAN_ASSISTED_PRICE_NGN,
  });
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
