const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../src/utils/mailer.js'), 'utf8');

function fixture(env = {}, fail = false) {
  const posts = [];
  const module = { exports: {} };
  const axios = { post: async (url, body, options) => {
    posts.push({ url, body, options });
    if (fail) throw new Error('fixture unavailable');
    return { data: { id: 'fixture' } };
  }};
  vm.runInNewContext(source, { module, require: () => axios, process: { env }, console: { warn() {}, error() {} } });
  return { mailer: module.exports, posts };
}
const user = { _id: 'u1', email: 'learner@example.com', name: '<Learner>', track: 'Web Development' };
const env = { RESEND_API_KEY: 'fixture', RESEND_FROM_EMAIL: 'Support <support@example.com>' };
test('payment instructions are offered only where access is not already present', () => {
  const { mailer } = fixture();
  assert.match(mailer.learnerOnboardingMessage(user).text, /₦2,000/);
  for (const access of [{ isPremium: true }, { scholarship: 'limited' }, { scholarship: 'full' }, { purchasedCourses: [{ courseId: 'course1' }] }]) {
    assert.doesNotMatch(mailer.learnerOnboardingMessage({ ...user, ...access }).text, /₦2,000/);
  }
  assert.match(mailer.learnerOnboardingMessage({ ...user, isPremium: true, premiumExpiresAt: '2000-01-01' }).text, /₦2,000/);
});
test('application goes to account email and uses a stable idempotency key', async () => {
  const { mailer, posts } = fixture(env);
  assert.equal((await mailer.sendLearnerOnboarding(user, { _id: 'a1', email: 'other@example.com', track: 'Web Development' })).ok, true);
  assert.equal(posts[0].body.to[0], user.email);
  assert.equal(posts[0].options.headers['Idempotency-Key'], 'learner-application/a1');
  assert.match(posts[0].body.html, /&lt;Learner&gt;/);
});
test('test sender and explicit opt-out do not attempt delivery', async () => {
  for (const config of [{ RESEND_API_KEY: 'fixture', RESEND_FROM_EMAIL: 'onboarding@resend.dev' }, { ...env, WELCOME_EMAIL_ENABLED: 'false' }]) {
    const { mailer, posts } = fixture(config);
    assert.equal((await mailer.sendLearnerOnboarding(user)).skipped, true);
    assert.equal(posts.length, 0);
  }
});
test('provider failure is nonfatal and no success is reported', async () => {
  const { mailer } = fixture(env, true);
  assert.equal((await mailer.sendLearnerOnboarding(user)).ok, false);
});
