const axios = require('axios');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { logActivity } = require('../utils/activityLogger');
const { allowedOrigins } = require('../config/cors');
const { normalizeEmail, isValidEmail } = require('../utils/validation');
const { reportMabrigConversion } = require('../utils/mabrigGrowth');
const { sendCustomEmail } = require('../utils/mailer');
const { entitlementForPlan, paymentMatchesRecord, entitlementExpiry } = require('../utils/paymentEntitlements');

const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const PROMOTER_CONVERSION_URL = process.env.PROMOTER_CONVERSION_URL || 'https://academic.mabrigkorie.org/api/referrals/conversion';

const PLANS = {
  'premium-monthly': { amountNGN: 2000, label: 'Premium Monthly', type: 'subscription' },
  'premium-yearly': { amountNGN: 24000, label: 'Premium Yearly', type: 'subscription' },
  'prompt-engineering-full': {
    amountNGN: 12000,
    label: 'Mastering Prompt Engineering — Full Course + Certificate',
    type: 'course',
    courseId: 'mastering-prompt-engineering',
  },
  'prompt-engineering-earlybird': {
    amountNGN: 10000,
    label: 'Mastering Prompt Engineering — Early Bird + Certificate',
    type: 'course',
    courseId: 'mastering-prompt-engineering',
  },
  'cinematic-special-edition': {
    amountNGN: 10000,
    label: 'AI Cinematic Video & Avatar Creation Mastery — Special Edition + Certificate',
    type: 'course',
    courseId: 'ai-cinematic-special-edition',
  },
  'certificate-fee': {
    amountNGN: 5000,
    label: 'Verified Course Certificate',
    type: 'certificate',
  },
  'sponsor-starter': { amountNGN: 10000, label: 'Sponsor a Learner — Starter', type: 'sponsorship' },
  'sponsor-complete': { amountNGN: 50000, label: 'Sponsor a Learner — Complete Track', type: 'sponsorship' },
  'sponsor-cohort': { amountNGN: 250000, label: 'Sponsor a Youth Cohort', type: 'sponsorship' },
};

function paystackClient() {
  return axios.create({
    baseURL: PAYSTACK_BASE_URL,
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    timeout: 20000,
  });
}

function normalizeAttributionToken(value) {
  const clean = String(value || '').trim();
  if (clean.length < 20 || clean.length > 2048) return null;
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(clean) ? clean : null;
}

function normalizeReferralCode(value) {
  const clean = String(value || '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 64);
  return clean || null;
}

function commissionablePlan(plan) {
  if (String(plan || '').startsWith('certificate-fee:')) return true;
  const config = PLANS[plan];
  return config?.type === 'course' || config?.type === 'subscription';
}

function planLabel(plan) {
  if (String(plan || '').startsWith('certificate-fee:')) return 'Verified Course Certificate';
  return PLANS[plan]?.label || String(plan || 'DDEI purchase');
}

async function reportGrowthConversion(subscription) {
  if (!subscription || subscription.status !== 'success' || subscription.growthConversionReportedAt) return;
  if (!subscription.customerEmail) return;

  const result = await reportMabrigConversion({
    id: `ddei:paystack:${subscription.reference}`,
    type: 'purchase',
    email: subscription.customerEmail,
    amount: Number(subscription.amount || 0),
    currency: subscription.currency || 'NGN',
    attributionToken: subscription.attributionToken || undefined,
    product: planLabel(subscription.plan),
    reference: subscription.reference,
    occurredAt: subscription.paystackData?.paidAt || new Date().toISOString(),
    source: 'ddei:paystack',
  });

  if (result.reported) {
    subscription.growthConversionReportedAt = new Date();
    await subscription.save();
  }
}

async function reportPromoterConversion(subscription) {
  if (!subscription?.referralCode || subscription.status !== 'success' || subscription.promoterConversionReportedAt) return;
  if (!commissionablePlan(subscription.plan)) return;
  if (!process.env.PROMOTER_CONVERSION_SECRET) {
    console.warn('PROMOTER_CONVERSION_SECRET is not configured; DDEI commission reporting is disabled.');
    return;
  }
  try {
    const response = await axios.post(PROMOTER_CONVERSION_URL, {
      referralCode: subscription.referralCode,
      product: 'DDEI',
      externalReference: subscription.reference,
      label: planLabel(subscription.plan),
      value: Number(subscription.amount || 0),
      currency: subscription.currency || 'NGN',
      paidAt: subscription.paystackData?.paidAt || new Date().toISOString(),
    }, {
      headers: { 'x-mabrig-referral-secret': process.env.PROMOTER_CONVERSION_SECRET },
      timeout: 10000,
    });
    if (response.status >= 200 && response.status < 300) {
      subscription.promoterConversionReportedAt = new Date();
      await subscription.save();
    }
  } catch (err) {
    console.error('Promoter commission reporting failed:', err.response?.data || err.message);
  }
}

function safeCallbackUrl(value) {
  if (!value) return process.env.FRONTEND_URL || allowedOrigins()[0] || undefined;
  try {
    const url = new URL(value);
    const origin = url.origin.replace(/\/$/, '');
    const allowed = new Set([...(allowedOrigins()), process.env.FRONTEND_URL].filter(Boolean).map((item) => {
      try { return new URL(item).origin; } catch (_) { return String(item).replace(/\/$/, ''); }
    }));
    return allowed.has(origin) ? url.toString() : (process.env.FRONTEND_URL || allowedOrigins()[0] || undefined);
  } catch (_) {
    return process.env.FRONTEND_URL || allowedOrigins()[0] || undefined;
  }
}

function paymentSnapshot(data) {
  return {
    id: data.id,
    status: data.status,
    reference: data.reference,
    amount: data.amount,
    currency: data.currency,
    paidAt: data.paid_at || data.paidAt || null,
    channel: data.channel || null,
    fees: data.fees || null,
  };
}

async function initializePayment(req, res) {
  const { plan, courseId } = req.body;
  let email = normalizeEmail(req.body.email);
  const referralCode = normalizeReferralCode(req.body.referralCode);
  const attributionToken = normalizeAttributionToken(req.body.attributionToken);
  const planConfig = PLANS[plan];
  if (!planConfig) return res.status(400).json({ message: 'Invalid or unknown payment plan.' });
  // Only sponsorships accept guest checkout. Paid courses, certificates and
  // subscriptions must be tied to the authenticated learner before checkout;
  // a payment must never wait for the owner to assign access manually.
  let purchaser = null;
  if (planConfig.type !== 'sponsorship') {
    if (!req.userId) return res.status(401).json({ message: 'Create an account or log in before paying so your access can activate automatically.' });
    purchaser = await User.findById(req.userId);
    if (!purchaser) return res.status(401).json({ message: 'Your account was not found. Please log in again.' });
    if (email && email !== purchaser.email) return res.status(400).json({ message: 'Payment email must match your signed-in account.' });
    email = purchaser.email;
  }
  if (!isValidEmail(email)) return res.status(400).json({ message: 'Enter a valid email address.' });
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return res.status(503).json({ message: 'Payments are not configured on the server yet (missing Paystack key). Please contact support.' });
  }

  let storedPlan = plan;
  let amountNGN = planConfig.amountNGN;
  if (planConfig.type === 'certificate') {
    const { COURSES } = require('../data/courseCatalog');
    const course = COURSES.find((c) => c.id === courseId);
    if (!course || !course.certificateFee) return res.status(400).json({ message: 'This course does not offer a paid certificate.' });
    storedPlan = `certificate-fee:${course.id}`;
    amountNGN = course.certificateFee;
  }

  const reference = `dsb_${crypto.randomBytes(8).toString('hex')}`;
  const amountKobo = amountNGN * 100;

  let subscription;
  try {
    subscription = await Subscription.create({
      user: req.userId || null,
      plan: storedPlan,
      reference,
      referralCode,
      customerEmail: email,
      attributionToken,
      amount: amountNGN,
      currency: 'NGN',
      status: 'pending',
    });
  } catch (err) {
    console.error('Failed to create payment record:', err);
    return res.status(503).json({ message: 'The payment service is temporarily unavailable. Please try again in a few minutes.' });
  }

  try {
    const response = await paystackClient().post('/transaction/initialize', {
      email,
      amount: amountKobo,
      reference,
      callback_url: safeCallbackUrl(req.body.callbackUrl),
      metadata: {
        plan: storedPlan,
        ...(attributionToken ? { mabrig_attribution: attributionToken } : {}),
      },
    });
    res.status(201).json({ authorizationUrl: response.data.data.authorization_url, reference, subscriptionId: subscription._id });
  } catch (err) {
    await Subscription.updateOne({ _id: subscription._id, status: 'pending' }, { $set: { status: 'failed' } }).catch(() => {});
    const message = err.response?.data?.message || 'Failed to initialize payment with Paystack';
    res.status(502).json({ message });
  }
}

async function grantPaymentBenefits(subscription) {
  if (!subscription || subscription.status !== 'success') return false;
  if (subscription.benefitsAppliedAt) return true;
  const entitlement = entitlementForPlan(subscription.plan, PLANS);
  if (!entitlement) throw new Error('Unknown purchased entitlement');
  if (entitlement.type === 'sponsorship') {
    await Subscription.updateOne({ _id: subscription._id, benefitsAppliedAt: null },
      { $set: { benefitsAppliedAt: new Date() } });
    return true;
  }
  if (!subscription.user) {
    // Old anonymous checkouts cannot be safely assigned by guessing an email.
    // Keep them visible as paid-but-unfulfilled for private support resolution.
    return false;
  }
  if (entitlement.type === 'course') {
    // Atomic conditional push prevents duplicate course grants on concurrent
    // webhook deliveries. A successful retry does not change a prior grant.
    const update = await User.updateOne(
      { _id: subscription.user, 'purchasedCourses.courseId': { $ne: entitlement.courseId } },
      { $push: { purchasedCourses: { courseId: entitlement.courseId, purchasedAt: new Date() } } }
    );
    if (!update.matchedCount) {
      const exists = await User.exists({ _id: subscription.user, 'purchasedCourses.courseId': entitlement.courseId });
      if (!exists) throw new Error('Learner account is missing for this payment');
    }
  } else if (entitlement.type === 'premium') {
    // Use the gateway payment time rather than the webhook delivery time.
    // Replaying the same payment cannot extend the subscription repeatedly.
    const expiration = entitlementExpiry(subscription.paystackData?.paidAt || subscription.createdAt, entitlement.months);
    const update = await User.updateOne(
      { _id: subscription.user },
      { $set: { isPremium: true }, $max: { premiumExpiresAt: expiration } }
    );
    if (!update.matchedCount) throw new Error('Learner account is missing for this payment');
  }
  await Subscription.updateOne(
    { _id: subscription._id, benefitsAppliedAt: null },
    { $set: { benefitsAppliedAt: new Date() } }
  );
  logActivity(subscription.user, 'Learner', 'payment', {
    plan: subscription.plan, amountNGN: subscription.amount, automatic: true,
  });
  return true;
}

async function notifyAccess(subscription) {
  if (!subscription.user || !subscription.benefitsAppliedAt || subscription.accessEmailSentAt) return;
  if (!process.env.RESEND_API_KEY || !subscription.customerEmail) return;
  const result = await sendCustomEmail(subscription.customerEmail,
    'DDEI payment confirmed — your access is ready',
    'We have confirmed your payment for ' + planLabel(subscription.plan) +
    '. Your learner access has been activated automatically, without administrator approval.\n\nLog in at https://ddei.online with the account used to pay. If you cannot see your course, use Help & Support to verify the payment or open a support ticket.\n\nReference: ' + subscription.reference);
  if (result.ok) {
    await Subscription.updateOne({ _id: subscription._id, accessEmailSentAt: null },
      { $set: { accessEmailSentAt: new Date() } });
  }
}

async function settlePayment(data) {
  const reference = String(data.reference || '');
  const existing = await Subscription.findOne({ reference });
  if (!existing) return null;

  // Do not change a successfully settled transaction back to failed if a
  // delayed/older provider event arrives after the successful callback.
  if (!paymentMatchesRecord(data, existing)) {
    if (existing.status !== 'success' && data.status !== 'pending') {
      await Subscription.updateOne({ _id: existing._id, status: { $ne: 'success' } },
        { $set: { status: 'failed', paystackData: paymentSnapshot(data) } });
    }
    return existing;
  }

  const settled = await Subscription.findOneAndUpdate(
    { _id: existing._id, status: { $ne: 'success' } },
    { $set: { status: 'success', paystackData: paymentSnapshot(data) } },
    { new: true }
  );
  const paid = settled || await Subscription.findById(existing._id);
  // Always retry fulfillment even when payment status was marked success on
  // an earlier request: 'success' != 'benefits delivered'.
  await grantPaymentBenefits(paid);
  await notifyAccess(await Subscription.findById(paid._id));
  // Analytics / partner reporting must never prevent paid learners entering.
  try { await reportPromoterConversion(paid); } catch (_) { /* retried later */ }
  try { await reportGrowthConversion(paid); } catch (_) { /* retried later */ }
  return Subscription.findById(paid._id);
}

async function verifyPayment(req, res) {
  const reference = String(req.params.reference || '');
  if (!/^dsb_[a-f0-9]{16}$/.test(reference)) return res.status(400).json({ message: 'Invalid payment reference.' });
  if (!process.env.PAYSTACK_SECRET_KEY) return res.status(503).json({ message: 'Payments are temporarily unavailable.' });
  const record = await Subscription.findOne({ reference });
  if (!record) return res.status(404).json({ message: 'Payment reference not found.' });
  const sponsorship = entitlementForPlan(record.plan, PLANS)?.type === 'sponsorship';
  if (!sponsorship && (!req.userId || String(req.userId) !== String(record.user || ''))) {
    return res.status(403).json({ message: 'Log in to the account that started this payment to check its status.' });
  }
  try {
    const response = await paystackClient().get(`/transaction/verify/${reference}`);
    const data = response.data.data;
    if (data.reference !== reference) return res.status(502).json({ message: 'Payment provider returned a mismatched reference.' });
    const subscription = await settlePayment(data);
    // Only return the owner's minimal payment state: never expose
    // customerEmail, attribution tokens or full provider payload.
    res.json({
      reference,
      status: subscription.status,
      accessGranted: Boolean(subscription.benefitsAppliedAt),
      message: subscription.status === 'success' && !subscription.benefitsAppliedAt
        ? 'Payment confirmed. Access could not be linked automatically; please contact support with your reference.'
        : undefined,
    });
  } catch (err) {
    console.error('Payment verification failed:', err.message);
    res.status(502).json({ message: 'Could not confirm this payment. Try checking again or contact support.' });
  }
}

async function myPayments(req, res) {
  const records = await Subscription.find({ user: req.userId })
    .sort({ createdAt: -1 }).limit(30)
    .select('plan reference amount currency status benefitsAppliedAt createdAt');
  res.json({ payments: records.map((item) => ({
    plan: item.plan, reference: item.reference, amount: item.amount,
    currency: item.currency, status: item.status,
    accessGranted: Boolean(item.benefitsAppliedAt), createdAt: item.createdAt,
  })) });
}

async function paystackWebhook(req, res) {
  const signature = String(req.headers['x-paystack-signature'] || '');
  const rawBody = req.rawBody;
  if (!process.env.PAYSTACK_SECRET_KEY || !rawBody || !/^[a-f0-9]{128}$/i.test(signature)) return res.status(401).json({ message: 'Invalid webhook signature.' });
  const expected = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(rawBody).digest('hex');
  const suppliedBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  if (suppliedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)) return res.status(401).json({ message: 'Invalid webhook signature.' });
  try {
    const event = req.body;
    if (event.event === 'charge.success' && /^dsb_[a-f0-9]{16}$/.test(String(event.data?.reference || ''))) await settlePayment(event.data);
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Paystack webhook settlement failed:', err);
    return res.status(500).json({ message: 'Webhook processing failed.' });
  }
}

module.exports = { initializePayment, verifyPayment, paystackWebhook, myPayments, PLANS };
