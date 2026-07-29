const User = require('../models/User');
const GrantUpdate = require('../models/GrantUpdate');
const { GRANTS, CATEGORIES, LEVELS, DIRECTORY_VERIFIED_ON, deadlineState } = require('../data/grants');
const { applyOverlay } = require('../utils/grantsOverlay');

/**
 * The Grants Directory.
 *
 * Premium unlocks the full record: eligibility, what you get, the caveats and
 * the apply link. Free accounts get a real teaser — name, provider, category,
 * and crucially the deadline state.
 *
 * That last part is deliberate. What is being sold here is curation and
 * verification, not the existence of a public grant. Hiding the fact that a
 * ₦50,000/month fellowship closes in two days would mean a learner misses it
 * because of a paywall, which is not a trade this platform should make. So the
 * teaser always shows what is closing and when; Premium shows how to apply.
 */

function summarise(grant, now) {
  const { state, daysLeft } = deadlineState(grant, now);
  return {
    id: grant.id,
    name: grant.name,
    provider: grant.provider,
    category: grant.category,
    levels: grant.levels,
    value: grant.value,
    deadline: grant.deadline,
    deadlineNote: grant.deadlineNote || null,
    deadlineState: state,
    daysLeft,
    verified: grant.verified,
    verifiedOn: grant.verifiedOn,
  };
}

function full(grant, now) {
  return {
    ...summarise(grant, now),
    summary: grant.summary,
    whatYouGet: grant.whatYouGet,
    eligibility: grant.eligibility,
    caveat: grant.caveat || null,
    url: grant.url,
    contact: grant.contact || null,
    location: grant.location,
    effort: grant.effort,
    startsOn: grant.startsOn || null,
    status: grant.status || 'open',
    tags: grant.tags,
  };
}

/**
 * Sort by urgency: what closes soonest comes first, rolling programmes next,
 * closed ones last. A directory ordered by anything else buries the deadline
 * that actually matters this week.
 */
function byUrgency(a, b) {
  const rank = { 'closing-soon': 0, open: 1, rolling: 2, closed: 3 };
  const diff = rank[a.deadlineState] - rank[b.deadlineState];
  if (diff !== 0) return diff;
  if (a.daysLeft !== null && b.daysLeft !== null) return a.daysLeft - b.daysLeft;
  return 0;
}

/**
 * The directory as it stands right now: the committed baseline plus whatever an
 * admin has approved from the daily agent.
 *
 * A database problem must not take the page down — approvals are an
 * enhancement, so falling back to the baseline is the correct degradation.
 */
async function currentDirectory() {
  try {
    const approved = await GrantUpdate.find({ status: 'approved' })
      .sort({ reviewedAt: 1 })
      .lean();
    return applyOverlay(approved);
  } catch (err) {
    console.warn(`[grants] serving the baseline directory — overlay unavailable: ${err.message}`);
    return GRANTS;
  }
}

async function hasPremium(userId) {
  if (!userId) return false;
  const user = await User.findById(userId);
  return Boolean(user && user.hasPremiumAccess());
}

async function listGrants(req, res) {
  const now = new Date();
  const unlocked = req.isAdmin || (await hasPremium(req.userId));
  const directory = await currentDirectory();

  const { category, level, q } = req.query;
  let grants = directory;

  if (category) grants = grants.filter((g) => g.category === category);
  if (level) grants = grants.filter((g) => g.levels.includes(level));
  if (q) {
    const needle = String(q).toLowerCase();
    grants = grants.filter((g) => `${g.name} ${g.provider} ${g.summary} ${g.tags.join(' ')}`.toLowerCase().includes(needle));
  }

  const rendered = grants.map((g) => (unlocked ? full(g, now) : summarise(g, now))).sort(byUrgency);

  res.json({
    unlocked,
    total: directory.length,
    matched: rendered.length,
    directoryVerifiedOn: DIRECTORY_VERIFIED_ON,
    categories: CATEGORIES,
    levels: LEVELS,
    grants: rendered,
    // Shown by the locked view. Speaks plainly about what the money buys —
    // someone deciding whether to spend ₦2,000 deserves a straight answer.
    upgradeMessage: unlocked
      ? null
      : 'Upgrade to Premium (₦2,000/month) to see full eligibility rules, what each grant actually pays, '
        + 'the application links and our verification notes on every listing.',
  });
}

module.exports = { listGrants, currentDirectory };
