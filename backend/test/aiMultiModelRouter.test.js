'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { resolveRoute } = require('../src/utils/aiModelRouter');
const env = {
  DDEI_AI_PROVIDER: 'openrouter',
  OPENROUTER_API_KEY: 'test-only',
  OPENROUTER_TUTOR_MODEL: 'qwen/tutor',
  OPENROUTER_CODING_MODEL: 'qwen/code',
  OPENROUTER_REASONING_MODEL: 'deepseek/reason',
  OPENROUTER_ASSESSMENT_MODEL: 'qwen/assess',
  OPENROUTER_AGENT_MODEL: 'nvidia/agent',
  OPENROUTER_VISION_MODEL: 'google/vision',
  OPENROUTER_FALLBACK_MODEL: 'qwen/backup',
};
for (const [task, expected] of Object.entries({
  tutoring: 'qwen/tutor', coding: 'qwen/code', reasoning: 'deepseek/reason',
  assessment: 'qwen/assess', agent: 'nvidia/agent', vision: 'google/vision',
  fallback: 'qwen/backup'
})) {
  test('resolves ' + task + ' to configured model', () => {
    assert.equal(resolveRoute(task, env).model, expected);
  });
}
test('requires a server-side API key', () => {
  assert.throws(() => resolveRoute('vision', { ...env, OPENROUTER_API_KEY: '' }), /No configured/);
});
test('rejects unknown tasks', () => {
  assert.throws(() => resolveRoute('video', env), /Unsupported AI task/);
});
