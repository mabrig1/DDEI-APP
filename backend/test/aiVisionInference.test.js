'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { interpretLessonImage } = require('../src/utils/aiVisionInference');
const png = Buffer.from('89504e470d0a1a0a0000000049454e44ae426082', 'hex').toString('base64');
const env = { DDEI_AI_PROVIDER: 'openrouter', OPENROUTER_API_KEY: 'test-only', OPENROUTER_VISION_MODEL: 'google/gemini-2.5-flash' };
test('vision adapter sends image to configured model without leaking API key', async () => {
  let called = false;
  const result = await interpretLessonImage({
    question: 'Explain the chart', image: png, mimeType: 'image/png', env,
    fetchImpl: async (url, options) => {
      called = true;
      assert.match(url, /^https:\/\/openrouter\.ai\//);
      const body = JSON.parse(options.body);
      assert.equal(body.model, env.OPENROUTER_VISION_MODEL);
      assert.match(JSON.stringify(body), /data:image\/png;base64,/);
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'This is a chart.' } }] }) };
    }
  });
  assert.equal(called, true);
  assert.equal(result.answer, 'This is a chart.');
});
test('vision adapter rejects image type mismatch', async () => {
  await assert.rejects(interpretLessonImage({ question: 'Explain', image: png, mimeType: 'image/jpeg', env }), /mismatch/);
});
test('vision adapter rejects oversized images before network', async () => {
  await assert.rejects(interpretLessonImage({ question: 'Explain', image: 'a'.repeat(2800004), mimeType: 'image/png', env }), /Invalid image data/);
});
