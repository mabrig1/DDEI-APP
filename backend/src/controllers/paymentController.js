const axios = require('axios');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

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
    amountNGN: 4000,
    label: 'AI Cinematic Video & Avatar Creation Mastery — Special Edition (7 Days) + Certificate',
    type: 'course',
    courseId: 'ai-cinematic-special-edition',
  },
};

function paystackClient() {
  return axios.create({
    baseURL: PAYSTACK_BASE_URL,
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
}

async function initializePayment(req, res) {
  const { plan, email } = req.body;
  const planConfig = PLANS[plan];
  if (!planConfig) {
    return res.status(400).json({ message: 'Invalid plan. Use premium-monthly or premium-yearly' });
  }
  if (!email) {
    return res.status(400).json({ message: 'email is required' });
  }

  const reference = `dsb_${crypto.randomBytes(8).toString('hex')}`;
  const amountKobo = planConfig.amountNGN * 100;

  const subscription = await Subscription.create({
    user: req.userId || null,
    plan,
    reference,
    amount: planConfig.amountNGN,
    currency: 'NGN',
    status: 'pending',
  });

  try {
    const response = await paystackClient().post('/transaction/initialize', {
      email,
      amount: amountKobo,
      reference,
      callback_url: req.body.callbackUrl,
    });

    res.status(201).json({
      authorizationUrl: response.data.data.authorization_url,
      reference,
      subscriptionId: subscription._id,
    });
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to initialize payment with Paystack';
    res.status(502).json({ message });
  }
}

async function verifyPayment(req, res) {
  const { reference } = req.params;

  try {
    const response = await paystackClient().get(`/transaction/verify/${reference}`);
    const data = response.data.data;
    const success = data.status === 'success';

    const subscription = await Subscription.findOneAndUpdate(
      { reference },
      { status: success ? 'success' : 'failed', paystackData: data },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found for this reference' });
    }

    if (success && subscription.user) {
      const planConfig = PLANS[subscription.plan] || {};
      if (planConfig.type === 'course' && planConfig.courseId) {
        const user = await User.findById(subscription.user);
        if (user) {
          const alreadyPurchased = (user.purchasedCourses || []).some(
            (p) => p.courseId === planConfig.courseId
          );
          if (!alreadyPurchased) {
            user.purchasedCourses.push({ courseId: planConfig.courseId, purchasedAt: new Date() });
            await user.save();
          }
        }
      } else {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + (subscription.plan === 'premium-yearly' ? 12 : 1));
        await User.findByIdAndUpdate(subscription.user, { isPremium: true, premiumExpiresAt: expiresAt });
      }
    }

    res.json({ status: subscription.status, subscription });
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to verify payment with Paystack';
    res.status(502).json({ message });
  }
}

module.exports = { initializePayment, verifyPayment, PLANS };
