const axios = require('axios');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { logActivity } = require('../utils/activityLogger');
const { allowedOrigins } = require('../config/cors');
const { normalizeEmail, isValidEmail } = require('../utils/validation');
const { reportMabrigConversion } = require('../utils/mabrigGrowth');

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
  const email = normalizeEmail(req.body.email);
  const referralCode = normalizeReferralCode(req.body.referralCode);
  const attributionToken = normalizeAttributionToken(req.body.attributionToken);
  const planConfig = typeof plan === 'string' && Object.hasOwn(PLANS, plan) ? PLANS[plan] : null;
  if (!planConfig) return res.status(400).json({ message: 'Invalid or unknown payment plan.' });
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
    const message = 'Failed to initialize payment with Paystack';
    res.status(502).json({ message });
  }
}

async function grantPaymentBenefits(subscription) {
  if (!subscription.user || subscription.status !== 'success' || subscription.benefitsGrantedAt) return;
  const plan = PLANS[subscription.plan] || {};
  const courseId = subscription.plan.startsWith('certificate-fee:')
    ? subscription.plan.split(':')[1] : plan.courseId;
  if (courseId) {
    // Atomic predicate prevents duplicate grants across verify/webhook races.
    await User.updateOne(
      { _id: subscription.user, 'purchasedCourses.courseId': { $ne: courseId } },
      { $push: { purchasedCourses: { courseId, purchasedAt: subscription.settledAt || subscription.createdAt } } }
    );
  } else if (plan.type === 'subscription') {
    // Fixed settlement time makes retries idempotent; $max prevents older payments
    // from shortening a more recent entitlement.
    const expiresAt = new Date(subscription.settledAt || subscription.createdAt);
    expiresAt.setMonth(expiresAt.getMonth() + (subscription.plan === 'premium-yearly' ? 12 : 1));
    await User.updateOne({ _id: subscription.user }, { $set: { isPremium: true }, $max: { premiumExpiresAt: expiresAt } });
  }
  await Subscription.updateOne({ _id: subscription._id }, { $set: { benefitsGrantedAt: new Date() } });
}

async function settlePayment(data) {
  const reference = String(data.reference || '');
  const existing = await Subscription.findOne({ reference });
  if (!existing) return null;

  if (!existing.customerEmail && data.customer?.email) {
    const providerEmail = normalizeEmail(data.customer.email);
    if (isValidEmail(providerEmail)) {
      existing.customerEmail = providerEmail;
      await existing.save();
    }
  }

  const validAmount = Number.isSafeInteger(data.amount) && data.amount > 0 && data.amount === Math.round(existing.amount * 100);
  const validCurrency = String(data.currency || '').toUpperCase() === existing.currency;
  const success = data.status === 'success' && validAmount && validCurrency;
  if (!success) {
    if (existing.status !== 'success') {
      existing.status = 'failed';
      existing.paystackData = paymentSnapshot(data);
      await existing.save();
    }
    return existing;
  }

  if (existing.status === 'success') {
    await grantPaymentBenefits(existing);
    await reportPromoterConversion(existing);
    await reportGrowthConversion(existing);
    return existing;
  }

  const settled = await Subscription.findOneAndUpdate(
    { _id: existing._id, status: { $ne: 'success' } },
    { $set: { status: 'success', settledAt: new Date(), paystackData: paymentSnapshot(data) } },
    { new: true }
  );
  if (!settled) {
    const current = await Subscription.findById(existing._id);
    await grantPaymentBenefits(current);
    await reportPromoterConversion(current);
    return current;
  }
  await grantPaymentBenefits(settled, data);
  await reportPromoterConversion(settled);
  await reportGrowthConversion(settled);
  return settled;
}

async function verifyPayment(req, res) {
  const reference = String(req.params.reference || '');
  if (!/^dsb_[a-f0-9]{16}$/.test(reference)) return res.status(400).json({ message: 'Invalid payment reference.' });
  if (!process.env.PAYSTACK_SECRET_KEY) return res.status(503).json({ message: 'Payments are temporarily unavailable.' });
  try {
    const response = await paystackClient().get(`/transaction/verify/${reference}`);
    const data = response.data.data;
    if (data.reference !== reference) return res.status(502).json({ message: 'Payment provider returned a mismatched reference.' });
    const subscription = await settlePayment(data);
    if (!subscription) return res.status(404).json({ message: 'Subscription not found for this reference' });
    // A reference is a bearer capability for status only, never customer records.
    res.json({ status: subscription.status, reference: subscription.reference, plan: subscription.plan });
  } catch (err) {
    const message = 'Failed to verify payment with Paystack';
    res.status(502).json({ message });
  }
}

async function paystackWebhook(req, res) {
  const signature = String(req.headers['x-paystack-signature'] || '');
  const rawBody = req.rawBody;
  if (!process.env.PAYSTACK_SECRET_KEY || !rawBody || !/^[a-f0-9]{128}$/i.test(signature)) { require('../middleware/security').securityEvent('webhook_signature_rejected', req); return res.status(401).json({ message: 'Invalid webhook signature.' }); }
  const expected = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(rawBody).digest('hex');
  const suppliedBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  if (suppliedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)) { require('../middleware/security').securityEvent('webhook_signature_rejected', req); return res.status(401).json({ message: 'Invalid webhook signature.' }); }
  try {
    const event = req.body;
    if (event.event === 'charge.success' && /^dsb_[a-f0-9]{16}$/.test(String(event.data?.reference || ''))) await settlePayment(event.data);
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Paystack webhook settlement failed:', err);
    return res.status(500).json({ message: 'Webhook processing failed.' });
  }
}

module.exports = { initializePayment, verifyPayment, paystackWebhook, PLANS, settlePayment, grantPaymentBenefits };

