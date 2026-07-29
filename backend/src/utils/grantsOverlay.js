/**
 * Applies admin-approved proposals on top of the static directory.
 *
 * `data/grants.js` is the committed, human-written baseline. Approved
 * GrantUpdate documents are layered over it at request time, so a deadline
 * correction goes live the moment an admin approves it — no commit, no
 * redeploy. That is what makes a daily agent worth having: a finding on Monday
 * morning can be corrected on the site by Monday morning.
 *
 * An approved patch sets `verified: true` and stamps `verifiedOn` with the
 * approval date. That is not the model's word being trusted — it is a person
 * having read the citations and said yes. The rule the directory promises
 * ("nothing states a fact nobody checked") survives intact.
 *
 * If Mongo is unreachable the overlay is skipped and the baseline is served.
 * A degraded directory beats a broken page.
 */

const { GRANTS } = require('../data/grants');

function isoDay(date) {
  return new Date(date).toISOString().slice(0, 10);
}

/**
 * @param {Array} approved  Approved GrantUpdate documents (plain objects).
 * @returns {Array} the directory with approved changes applied.
 */
function applyOverlay(approved = []) {
  if (!approved.length) return GRANTS;

  // Oldest first, so a later approval wins over an earlier one on the same field.
  const ordered = [...approved].sort(
    (a, b) => new Date(a.reviewedAt || a.createdAt || 0) - new Date(b.reviewedAt || b.createdAt || 0)
  );

  const byId = new Map(GRANTS.map((grant) => [grant.id, { ...grant }]));
  const added = [];

  for (const update of ordered) {
    const stamp = isoDay(update.reviewedAt || update.createdAt || Date.now());

    if (update.kind === 'new') {
      const patch = update.patch || {};
      if (!patch.name || !patch.url) continue;
      added.push({
        id: `proposed-${update._id}`,
        name: patch.name,
        provider: patch.provider || 'See official page',
        category: patch.category || 'training',
        levels: patch.levels || ['beginner', 'intermediate'],
        value: patch.value || 'See official page',
        summary: update.summary,
        whatYouGet: patch.whatYouGet || ['See the official page for full details'],
        eligibility: patch.eligibility || 'See the official page.',
        deadline: patch.deadline || null,
        deadlineNote: patch.deadline ? null : 'Timing not stated on the sources checked — confirm on the official page.',
        url: patch.url,
        location: patch.location || 'See official page',
        effort: patch.effort || 'Varies',
        status: patch.status || 'open',
        tags: patch.tags || [],
        verified: true,
        verifiedOn: stamp,
        addedByAgent: true,
      });
      continue;
    }

    const grant = byId.get(update.grantId);
    if (!grant) continue;

    // Only fields a proposal is allowed to touch. A patch cannot rewrite
    // eligibility or the summary — those are editorial and stay with the human
    // who wrote them.
    const ALLOWED = ['deadline', 'deadlineNote', 'value', 'status', 'url'];
    let touched = false;
    for (const field of ALLOWED) {
      if (update.patch && Object.prototype.hasOwnProperty.call(update.patch, field)) {
        grant[field] = update.patch[field];
        touched = true;
      }
    }

    if (touched) {
      grant.verified = true;
      grant.verifiedOn = stamp;
      // A corrected deadline makes the old caveat stale and possibly wrong.
      if (update.patch.deadline) grant.caveat = null;
    }
  }

  return [...byId.values(), ...added];
}

module.exports = { applyOverlay };
