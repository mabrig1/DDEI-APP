const test = require('node:test');
const assert = require('node:assert/strict');
const { entitlementForPlan, paymentMatchesRecord, entitlementExpiry } = require('../src/utils/paymentEntitlements');

const plans = {
  'premium-monthly': { type: 'subscription' },
  'premium-yearly': { type: 'subscription' },
  'some-course': { type: 'course', courseId: 'intro' },
  'sponsor-starter': { type: 'sponsorship' },
};

test('entitlement is derived from trusted server plan, never amount or client metadata', () => {
  assert.deepEqual(entitlementForPlan('premium-yearly', plans), { type: 'premium', months: 12 });
  assert.deepEqual(entitlementForPlan('some-course', plans), { type: 'course', courseId: 'intro' });
  assert.deepEqual(entitlementForPlan('certificate-fee:intro', plans), { type: 'course', courseId: 'intro' });
  assert.deepEqual(entitlementForPlan('sponsor-starter', plans), { type: 'sponsorship' });
  assert.equal(entitlementForPlan('nonexistent', plans), null);
});

test('payment settlement checks provider status reference amount currency and payer email', () => {
  const record = { reference: 'dsb_0123456789abcdef', amount: 3000, currency: 'NGN', customerEmail: 'buyer@example.com' };
  const paid = { reference: record.reference, amount: 300000, currency: 'NGN', status: 'success', customer: { email: 'buyer@example.com' } };
  assert.equal(paymentMatchesRecord(paid, record), true);
  for (const tampered of [
    { amount: 200000 }, { currency: 'USD' }, { status: 'pending' },
    { reference: 'dsb_fake' }, { customer: { email: 'attacker@example.com' } },
  ]) assert.equal(paymentMatchesRecord({ ...paid, ...tampered }, record), false);
});

test('premium expiry is deterministic across retries', () => {
  assert.equal(entitlementExpiry('2026-11-14T09:00:00.000Z', 1).toISOString(), '2026-12-14T09:00:00.000Z');
  assert.equal(entitlementExpiry('2026-11-14T09:00:00.000Z', 12).toISOString(), '2027-11-14T09:00:00.000Z');
});
