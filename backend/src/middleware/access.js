const User = require('../models/User');
const { COURSES } = require('../data/courseCatalog');

async function requireActiveAccess(req, res, next) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const courseId = req.params.id;
  const course = COURSES.find((item) => item.id === courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  // All course content requires verified payment or administrator-granted access.
  // Existing course purchases and scholarships remain valid.
  const purchased = (user.purchasedCourses || []).some((item) => item.courseId === courseId);
  const scholarship = user.scholarship === 'full' || user.scholarship === 'limited';
  const premium = user.hasPremiumAccess();
  if (purchased || scholarship || premium) return next();

  return res.status(402).json({
    message: 'This course requires a paid subscription, course purchase, or an administrator-approved scholarship.',
    upgradeRequired: true,
    purchaseRequired: true,
    courseId,
    purchasePlan: course.purchasePlan || null,
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
