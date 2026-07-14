const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { VAULT_CATEGORIES, VAULT_TOOL_COUNT } = require('../data/videoToolsVault');

const VAULT_COURSE_ID = 'ai-cinematic-special-edition';

// Access: platform admins, or learners who purchased the AI Video Mastery
// Special Edition (full-scholarship learners are admin-granted, so included).
async function getVault(req, res) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Log in to access the Tools Vault.', vaultLocked: true });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.', vaultLocked: true });
  }

  let allowed = false;
  let viewer = 'admin';
  if (payload.isAdmin) {
    allowed = true;
  } else if (payload.sub) {
    const user = await User.findById(payload.sub).lean();
    if (user) {
      viewer = user.name;
      const purchased = (user.purchasedCourses || []).some((p) => p.courseId === VAULT_COURSE_ID);
      allowed = purchased || user.scholarship === 'full';
    }
  }

  if (!allowed) {
    return res.status(403).json({
      message: 'The 100 Free AI Tools Vault is exclusive to AI Cinematic Video & Avatar Creation Mastery — Special Edition students. Enroll for ₦4,000 to unlock it instantly.',
      vaultLocked: true,
      purchasePlan: 'cinematic-special-edition',
      courseId: VAULT_COURSE_ID,
    });
  }

  res.json({ viewer, toolCount: VAULT_TOOL_COUNT, categories: VAULT_CATEGORIES });
}

module.exports = { getVault };
