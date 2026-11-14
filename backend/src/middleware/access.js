const User = require('../models/User');
const { COURSES } = require('../data/courseCatalog');

// Enrollment is available only through server-confirmed purchases, active
// Premium subscription or an existing owner-granted scholarship. Archived
// free-trial dates never authorize lessons, quizzes or tutoring requests.
async function requireActiveAccess(req, res, next) {
  const courseId = req.params.id;
  const course = COURSES.find((item) => item.id === courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const directPurchaseOnly = Boolean(course.paidOnly || (course.specialCourse && course.purchasePlan));
  const purchased = (user.purchasedCourses || []).some((item) => item.courseId === courseId);
  const hasFullScholarship = user.scholarship === 'full';
  const hasStandardAccess = user.scholarship === 'limited' || user.hasPremiumAccess();

  // Special paid-only courses require direct purchase or a full scholarship;
  // ordinary courses accept Premium and either scholarship level.
  if (purchased || hasFullScholarship || (!directPurchaseOnly && hasStandardAccess)) {
    return next();
  }

  const price = course.earlyBirdPrice || course.price || null;
  return res.status(402).json({
    message: directPurchaseOnly
      ? 'This special course requires a one-time purchase to unlock its lessons.'
      : 'Full training is available after enrollment. Explore the interactive demonstration, then subscribe to Premium or request a scholarship.',
    upgradeRequired: true,
    purchaseRequired: Boolean(directPurchaseOnly && course.purchasePlan),
    purchasePlan: course.purchasePlan || null,
    courseId,
    priceNGN: price,
    demoUrl: '/#demo',
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
