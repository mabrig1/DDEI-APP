const GrantUpdate = require('../models/GrantUpdate');
const { GRANTS } = require('../data/grants');

/**
 * The review queue for the daily grants agent.
 *
 * This is the human half of the loop. The agent can propose anything; only what
 * passes through here reaches a learner. Approving is deliberately a deliberate
 * act — it stamps the listing as verified, which is a claim the platform makes
 * on its own behalf, not the model's.
 */

function presentable(update) {
  const current = update.grantId ? GRANTS.find((g) => g.id === update.grantId) : null;
  return {
    id: update._id,
    kind: update.kind,
    grantId: update.grantId,
    grantName: update.grantName,
    summary: update.summary,
    patch: update.patch,
    // The reviewer needs to see what the value is now, not just what is
    // proposed — "changed the deadline to 31 October" means nothing without
    // knowing it currently says 31 August.
    currentValues: current
      ? {
        deadline: current.deadline,
        deadlineNote: current.deadlineNote || null,
        value: current.value,
        status: current.status || 'open',
        url: current.url,
        verifiedOn: current.verifiedOn,
      }
      : null,
    citations: update.citations,
    confidence: update.confidence,
    source: update.source,
    model: update.model,
    status: update.status,
    createdAt: update.createdAt,
    reviewedAt: update.reviewedAt,
    reviewedBy: update.reviewedBy,
    reviewNote: update.reviewNote,
  };
}

async function listUpdates(req, res) {
  const status = req.query.status || 'pending';
  const filter = status === 'all' ? {} : { status };

  const updates = await GrantUpdate.find(filter).sort({ createdAt: -1 }).limit(200);
  const pendingCount = await GrantUpdate.countDocuments({ status: 'pending' });

  res.json({
    pendingCount,
    updates: updates.map(presentable),
  });
}

async function reviewUpdate(req, res) {
  const { decision, note } = req.body;

  if (!['approved', 'rejected'].includes(decision)) {
    return res.status(400).json({ message: 'decision must be "approved" or "rejected"' });
  }

  const update = await GrantUpdate.findById(req.params.id);
  if (!update) return res.status(404).json({ message: 'Proposal not found' });
  if (update.status !== 'pending') {
    return res.status(409).json({ message: `This proposal was already ${update.status}.` });
  }

  update.status = decision;
  update.reviewedAt = new Date();
  update.reviewedBy = req.adminUsername || 'admin';
  update.reviewNote = note ? String(note).slice(0, 500) : null;
  await update.save();

  res.json({
    update: presentable(update),
    // Approved changes are layered onto the served directory immediately —
    // grantsController reads them on the next request. No redeploy.
    applied: decision === 'approved',
  });
}

module.exports = { listUpdates, reviewUpdate };
