const mongoose = require('mongoose');
const { attachAppwriteMirror } = require('../utils/appwriteMirrorHooks');

/**
 * A proposed change to the Grants Directory, produced by the daily agent.
 *
 * This model exists to hold a line that the rest of the grants feature depends
 * on: **a language model never publishes a fact to learners.**
 *
 * `backend/src/data/grants.js` is the human-verified baseline, and its tests
 * enforce that a hard deadline only ever appears on a verified entry. If the
 * daily agent wrote directly into the served directory, that guarantee would be
 * gone in a day — a model that misreads a page would quietly tell a learner a
 * grant closes next month when it closed last week.
 *
 * So the agent proposes and a human disposes. Proposals sit here as `pending`
 * with their citations attached. An admin approving one is what makes it
 * `verified` — because at that point a person has actually looked. Rejected
 * proposals are kept, not deleted: knowing the agent keeps re-proposing the
 * same wrong thing is useful signal.
 */

const citationSchema = new mongoose.Schema(
  {
    url: String,
    title: String,
    excerpt: String,
  },
  { _id: false }
);

const grantUpdateSchema = new mongoose.Schema(
  {
    // What the agent thinks should happen.
    //   change    an existing listing's facts moved (deadline, value, status)
    //   expired   the deadline has passed — usually found without any AI
    //   dead-link the official URL no longer resolves
    //   new       a grant not currently in the directory
    kind: {
      type: String,
      enum: ['change', 'expired', 'dead-link', 'new'],
      required: true,
    },

    // The id in data/grants.js. Null for `new`.
    grantId: { type: String, default: null, index: true },
    grantName: { type: String, required: true },

    // The fields to apply on approval. Only keys present here are changed;
    // everything else on the listing stays as the human wrote it.
    patch: { type: mongoose.Schema.Types.Mixed, default: {} },

    // Plain-English explanation for the reviewer.
    summary: { type: String, required: true },

    // Where the claim came from. A proposal with no citation is not
    // reviewable, so the agent refuses to raise one — see utils/grantsAgent.js.
    citations: { type: [citationSchema], default: [] },

    // The agent's own confidence, and which model produced it. Both are for
    // triage only; neither is evidence.
    confidence: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    model: { type: String, default: null },

    // 'deterministic' findings (expiry, dead links) come from date arithmetic
    // and HTTP status codes rather than a model, and can be trusted further.
    source: { type: String, enum: ['agent', 'deterministic'], default: 'agent' },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'superseded'],
      default: 'pending',
      index: true,
    },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: String, default: null },
    reviewNote: { type: String, default: null },

    runId: { type: String, default: null, index: true },
  },
  { timestamps: true }
);

// One open proposal per grant per kind. A daily job would otherwise pile up an
// identical finding every morning until someone looked at it.
grantUpdateSchema.index(
  { grantId: 1, kind: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: 'pending' } }
);

attachAppwriteMirror(grantUpdateSchema, 'GrantUpdate');

module.exports = mongoose.model('GrantUpdate', grantUpdateSchema);
