const User = require('../models/User');
const { buildReply } = require('../utils/advisorEngine');
const { answerWithAgent } = require('../utils/aiAssist');
const { VAULT_COURSE_ID } = require('../utils/aiTools');

/**
 * Whether this learner may be given the AI Video Tools Vault links. Mirrors
 * vaultController.getVault exactly — the vault is a paid perk of the Special
 * Edition course, and the advisor must not be a way around the paywall.
 */
async function hasVaultAccess(userId) {
  if (!userId) return false;
  const user = await User.findById(userId).lean();
  if (!user) return false;
  return (user.purchasedCourses || []).some((p) => p.courseId === VAULT_COURSE_ID)
    || user.scholarship === 'full';
}

async function chat(req, res) {
  const { message, history } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'message is required' });
  }

  const turns = Array.isArray(history) ? history : [];

  const result = await answerWithAgent({
    agentName: 'advisor',
    req,
    message,
    history: turns,
    // requirePremium guards this route, so every caller here is entitled to the
    // full grants directory. The vault is a separate, narrower purchase.
    toolContext: { premium: true, vaultAccess: await hasVaultAccess(req.userId) },
    fallback: () => buildReply(message, turns),
  });

  // `source` lets the frontend (and the admin dashboard) tell a live model
  // answer from the rule-based fallback without changing the existing shape —
  // clients that only read `reply` keep working untouched.
  res.json({ reply: result.reply, source: result.source, model: result.model });
}

module.exports = { chat };
