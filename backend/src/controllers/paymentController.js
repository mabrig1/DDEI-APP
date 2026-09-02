const axios = require('axios');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { logActivity } = require('../utils/activityLogger');
const { allowedOrigins } = require('../config/cors');
const { normalizeEmail, isValidEmail } = require('../utils/validation');

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
  const planConfig = PLANS[plan];
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
    });
    res.status(201).json({ authorizationUrl: response.data.data.authorization_url, reference, subscriptionId: subscription._id });
  } catch (err) {
    await Subscription.updateOne({ _id: subscription._id, status: 'pending' }, { $set: { status: 'failed' } }).catch(() => {});
    const message = err.response?.data?.message || 'Failed to initialize payment with Paystack';
    res.status(502).json({ message });
  }
}

async function grantPaymentBenefits(subscription) {
  if (!subscription.user || subscription.status !== 'success') return;
  const resolvedPlan = PLANS[subscription.plan] || {};
  if (resolvedPlan.type === 'sponsorship') {
    logActivity(subscription.user, 'Sponsor', 'payment', { plan: subscription.plan, label: resolvedPlan.label, amountNGN: subscription.amount, sponsorship: true });
    return;
  }
  if (subscription.plan.startsWith('certificate-fee:')) {
    const certCourseId = subscription.plan.split(':')[1];
    const user = await User.findById(subscription.user);
    if (user && certCourseId && !(user.purchasedCourses || []).some((p) => p.courseId === certCourseId)) {
      user.purchasedCourses.push({ courseId: certCourseId, purchasedAt: new Date() });
      await user.save();
      logActivity(user._id, user.name, 'payment', { plan: subscription.plan, label: 'Verified Course Certificate', amountNGN: subscription.amount });
    }
    return;
  }
  if (resolvedPlan.type === 'course' && resolvedPlan.courseId) {
    const user = await User.findById(subscription.user);
    if (user && !(user.purchasedCourses || []).some((p) => p.courseId === resolvedPlan.courseId)) {
      user.purchasedCourses.push({ courseId: resolvedPlan.courseId, purchasedAt: new Date() });
      await user.save();
      logActivity(user._id, user.name, 'payment', { plan: subscription.plan, label: resolvedPlan.label, amountNGN: subscription.amount });
    }
    return;
  }
  if (resolvedPlan.type === 'subscription') {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + (subscription.plan === 'premium-yearly' ? 12 : 1));
    const user = await User.findByIdAndUpdate(subscription.user, { isPremium: true, premiumExpiresAt: expiresAt });
    if (user) logActivity(user._id, user.name, 'payment', { plan: subscription.plan, label: resolvedPlan.label, amountNGN: subscription.amount });
  }
}

async function settlePayment(data) {
  const reference = String(data.reference || '');
  const existing = await Subscription.findOne({ reference });
  if (!existing) return null;

  const validAmount = Number(data.amount) === existing.amount * 100;
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
    await reportPromoterConversion(existing);
    return existing;
  }

  const settled = await Subscription.findOneAndUpdate(
    { _id: existing._id, status: { $ne: 'success' } },
    { $set: { status: 'success', paystackData: paymentSnapshot(data) } },
    { new: true }
  );
  if (!settled) {
    const current = await Subscription.findById(existing._id);
    await reportPromoterConversion(current);
    return current;
  }
  await grantPaymentBenefits(settled, data);
  await reportPromoterConversion(settled);
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
    res.json({ status: subscription.status, subscription });
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to verify payment with Paystack';
    res.status(502).json({ message });
  }
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

module.exports = { initializePayment, verifyPayment, paystackWebhook, PLANS };
