const crypto = require('crypto');
const User = require('../models/User');
const Application = require('../models/Application');
const Subscription = require('../models/Subscription');
const SupportTicket = require('../models/SupportTicket');
const State = require('../models/ManagementSwarmState');
const { reconcileManagedPayment } = require('../controllers/paymentController');

const KEY = 'management-v1';
const enabled = () => process.env.MANAGEMENT_SWARM_ENABLED === 'true';
const canAct = () => enabled() && process.env.MANAGEMENT_SWARM_ACTIONS === 'true';

function paymentReply(payment) {
  if (!payment) return null;
  if (payment.status === 'success' && payment.benefitsAppliedAt)
    return 'Our automated support check found that your payment was confirmed and access was activated. Sign in with the account used for payment and check your course dashboard. If you still cannot access it, reply here.';
  if (payment.status === 'success')
    return 'Our automated support check found a confirmed payment whose access is not yet recorded as activated. The recovery agent will retry eligible payments. Do not pay again; reply here if access remains unavailable.';
  if (payment.status === 'pending')
    return 'Our automated support check found a pending payment. Open My Payments and check the reference with Paystack. If you were debited, do not pay again; reply here if the problem persists.';
  return null;
}

async function enrollmentAgent(now) {
  const since = new Date(now - 86400000);
  const [registrations, applications, pending] = await Promise.all([
    User.countDocuments({ createdAt: { $gte: since } }),
    Application.countDocuments({ createdAt: { $gte: since } }),
    Application.countDocuments({ status: 'pending' }),
  ]);
  return { registrations24h: registrations, applications24h: applications, reviewMetadataPending: pending,
    note: 'Paid course access never depends on application approval.' };
}

async function paymentAgent(now, act) {
  const eligible = { user: { $ne: null }, benefitsAppliedAt: null };
  const [unfulfilled, pending, candidate] = await Promise.all([
    Subscription.countDocuments({ ...eligible, status: 'success' }),
    Subscription.countDocuments({ ...eligible, status: 'pending', createdAt: { $lt: new Date(now - 600000) } }),
    act ? Subscription.findOne({ ...eligible, $or: [{ status: 'success' }, { status: 'pending', createdAt: { $gte: new Date(now - 86400000), $lt: new Date(now - 600000) } }] }).sort({ status: -1, updatedAt: 1 }).select('reference').lean() : null,
  ]);
  let action = 'none';
  if (candidate) {
    // One gateway reconciliation per run; only known, account-linked records.
    // Rotate unsuccessful pending candidates without changing payment status.
    try { action = await reconcileManagedPayment(candidate.reference); }
    catch (_) { action = 'retry-later'; }
    if (action !== 'recovered') await Subscription.updateOne({ reference: candidate.reference, benefitsAppliedAt: null }, { $set: { updatedAt: new Date() } });
  }
  return { unfulfilledBeforeRun: unfulfilled, pendingOlderThan10m: pending, reconciliation: action, maxGatewayChecks: 1 };
}

async function supportAgent(act) {
  const open = await SupportTicket.countDocuments({ status: 'open' });
  if (!act) return { open, automatedReplies: 0 };
  const tickets = await SupportTicket.find({ status: 'open', category: 'payment', paymentReference: { $type: 'string' } })
    .sort({ updatedAt: 1 }).limit(5).select('requester paymentReference updatedAt replies').lean();
  let replied = 0;
  for (const ticket of tickets) {
    // At most one automated reply per ticket. Escalations remain open for a person.
    if ((ticket.replies || []).some(r => r.author === 'support')) continue;
    const payment = await Subscription.findOne({ reference: ticket.paymentReference, user: ticket.requester })
      .select('status benefitsAppliedAt').lean();
    const body = paymentReply(payment);
    if (!body) continue;
    const result = await SupportTicket.updateOne({ _id: ticket._id, status: 'open', updatedAt: ticket.updatedAt, 'replies.author': { $ne: 'support' } },
      { $push: { replies: { author: 'support', body, sentAt: new Date() } }, $set: { status: 'awaiting_user' } });
    replied += result.modifiedCount || 0;
  }
  return { open, automatedReplies: replied, maxTicketsPerRun: 5, note: 'No automatic closure or external email.' };
}

async function learningAgent(now) {
  const [active, inactive, selected] = await Promise.all([
    User.countDocuments({ lastSeenAt: { $gte: new Date(now - 7 * 86400000) } }),
    User.countDocuments({ lastSeenAt: { $lt: new Date(now - 7 * 86400000) } }),
    User.countDocuments({ activeCourseId: { $type: 'string' } }),
  ]);
  return { active7d: active, inactive7d: inactive, courseSelected: selected };
}

async function safeAgent(id, task) {
  try { return { id, status: 'completed', result: await task() }; }
  catch (_) { return { id, status: 'error', result: { note: 'Agent failed; see server diagnostics. No sensitive details retained.' } }; }
}

async function runSwarm(trigger) {
  if (!enabled()) return { skipped: true, reason: 'disabled' };
  const now = Date.now(), token = crypto.randomUUID(), act = canAct();
  let lease;
  try {
    lease = await State.findOneAndUpdate({ _id: KEY, $or: [{ leaseUntil: { $lte: new Date(now) } }, { leaseUntil: null }] },
      { $set: { leaseUntil: new Date(now + 120000), leaseToken: token } }, { upsert: true, new: true });
  } catch (err) {
    if (err.code === 11000) return { skipped: true, reason: 'already-running' };
    throw err;
  }
  if (!lease || lease.leaseToken !== token) return { skipped: true, reason: 'already-running' };
  try {
    // Independent read agents run together; support observes post-reconciliation state.
    const agents = await Promise.all([
      safeAgent('enrollment', () => enrollmentAgent(now)),
      safeAgent('payments', () => paymentAgent(now, act)),
      safeAgent('learning', () => learningAgent(now)),
    ]);
    agents.push(await safeAgent('support', () => supportAgent(act)));
    agents.push({ id: 'supervisor', status: 'completed', result: {
      errors: agents.filter(a => a.status === 'error').length,
      mode: act ? 'bounded-actions' : 'monitor-only',
      policy: 'No charges, refunds, price changes, scholarships, admin credentials, or bulk messages.',
    } });
    const summary = { trigger, startedAt: new Date(now), finishedAt: new Date(), agents };
    await State.updateOne({ _id: KEY, leaseToken: token }, { $set: { lastRun: summary } });
    return summary;
  } finally {
    await State.updateOne({ _id: KEY, leaseToken: token }, { $set: { leaseUntil: new Date(0) }, $unset: { leaseToken: '' } });
  }
}

async function swarmStatus() {
  const state = await State.findById(KEY).lean();
  return { enabled: enabled(), actionsEnabled: canAct(), scheduleConfigured: Boolean(process.env.CRON_SECRET),
    lastRun: state?.lastRun || null };
}

function validCronAuth(header, secret) {
  if (!secret || typeof header !== 'string') return false;
  const actual = Buffer.from(header), expected = Buffer.from('Bearer ' + secret);
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

module.exports = { runSwarm, swarmStatus, paymentReply, validCronAuth };
