const test = require('node:test');
const assert = require('node:assert/strict');
const { resolveRoute } = require('../src/utils/aiModelRouter');
test('routes configured tutor', () => {
 const route = resolveRoute('tutoring', { HF_TOKEN: 'test-token', HF_TUTOR_MODEL: 'org/tutor' });
 assert.equal(route.provider, 'huggingface');
 assert.equal(route.model, 'org/tutor');
});
test('rejects unsupported tasks', () => {
 assert.throws(() => resolveRoute('unknown', {}), /Unsupported AI task/);
});
test('requires server configuration', () => {
 assert.throws(() => resolveRoute('career', {}), /No configured AI provider/);
});
