const test = require('node:test');
const assert = require('node:assert/strict');
const { initializePayment, verifyPayment } = require('../src/controllers/paymentController');
const { createTicket, replyAsLearner } = require('../src/controllers/supportController');
const Subscription = require('../src/models/Subscription');
const SupportTicket = require('../src/models/SupportTicket');

function response() {
  return {
    code: 200, body: null,
    status(code) { this.code = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test('paid course and Premium checkout require a signed-in learner', async () => {
  for (const plan of ['premium-monthly', 'prompt-engineering-full', 'certificate-fee']) {
    const res = response();
    await initializePayment({ body: { plan, email: 'test@example.com' } }, res);
    assert.equal(res.code, 401);
    assert.match(res.body.message, /log in/i);
  }
});

test('payment verification cannot inspect another learner purchase', async () => {
  const original = Subscription.findOne;
  const previousKey = process.env.PAYSTACK_SECRET_KEY;
  try {
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_for_unit_test_only';
    Subscription.findOne = async () => ({
      _id: 'fake-id', user: 'learner-owner',
      plan: 'premium-monthly', reference: 'dsb_0123456789abcdef',
    });
    const res = response();
    await verifyPayment({ params: { reference: 'dsb_0123456789abcdef' }, userId: 'attacker' }, res);
    assert.equal(res.code, 403);
    assert.equal(res.body.subscription, undefined);
  } finally {
    Subscription.findOne = original;
    if (previousKey === undefined) delete process.env.PAYSTACK_SECRET_KEY;
    else process.env.PAYSTACK_SECRET_KEY = previousKey;
  }
});

test('support ticket payment reference cannot link another learner payment', async () => {
  const original = Subscription.exists;
  try {
    Subscription.exists = async () => null;
    const res = response();
    await createTicket({
      userId: 'learner', body: {
        category: 'payment', subject: 'Access missing',
        description: 'I paid but cannot see my training.',
        paymentReference: 'dsb_0123456789abcdef',
      },
    }, res);
    assert.equal(res.code, 403);
  } finally {
    Subscription.exists = original;
  }
});

test('learner ticket replies are scoped to request owner', async () => {
  const original = SupportTicket.findOne;
  try {
    SupportTicket.findOne = async () => null;
    const res = response();
    await replyAsLearner({ userId: 'attacker', params: { id: 'other-ticket' }, body: { message: 'hello' } }, res);
    assert.equal(res.code, 404);
  } finally {
    SupportTicket.findOne = original;
  }
});
