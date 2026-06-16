const axios = require('axios');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const PLANS = {
  'premium-monthly': { amountNGN: 5000, label: 'Premium Monthly' },
  'premium-yearly': { amountNGN: 50000, label: 'Premium Yearly' },
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
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + (subscription.plan === 'premium-yearly' ? 12 : 1));
      await User.findByIdAndUpdate(subscription.user, { isPremium: true, premiumExpiresAt: expiresAt });
    }

    res.json({ status: subscription.status, subscription });
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to verify payment with Paystack';
    res.status(502).json({ message });
  }
}

module.exports = { initializePayment, verifyPayment, PLANS };
