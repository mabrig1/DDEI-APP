const { test } = require('node:test');
const assert = require('node:assert/strict');
const { paymentReply, validCronAuth, runSwarm } = require('../src/utils/managementSwarm');

test('support replies distinguish actual fulfillment from pending payments', () => {
  assert.equal(paymentReply(null), null);
  assert.equal(paymentReply({ status: 'failed' }), null);
  assert.match(paymentReply({ status: 'pending' }), /do not pay again/i);
  assert.match(paymentReply({ status: 'success' }), /not yet recorded as activated/);
  assert.match(paymentReply({ status: 'success', benefitsAppliedAt: new Date() }), /access was activated/);
});
test('cron authorization fails closed and accepts the configured secret', () => {
  assert.equal(validCronAuth('Bearer secret', ''), false);
  assert.equal(validCronAuth('Bearer wrong', 'secret'), false);
  assert.equal(validCronAuth('Bearer secret', 'secret'), true);
});
test('disabled management swarm never starts database work', async () => {
  const previous = process.env.MANAGEMENT_SWARM_ENABLED;
  process.env.MANAGEMENT_SWARM_ENABLED = 'false';
  try { assert.deepEqual(await runSwarm('scheduled'), { skipped: true, reason: 'disabled' }); }
  finally { if (previous === undefined) delete process.env.MANAGEMENT_SWARM_ENABLED; else process.env.MANAGEMENT_SWARM_ENABLED = previous; }
});
