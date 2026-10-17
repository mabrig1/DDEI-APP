'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../../frontend/index.html'), 'utf8');

test('lesson panel exposes DeepSeek reasoning control and guarded request', () => {
  assert.match(html, /onclick="runLessonReasoning\(\)"/);
  assert.match(html, /async function runLessonReasoning\(\)/);
  assert.match(html, /\/reason`/);
});

test('lesson panel supports image tutoring with size and format validation', () => {
  assert.match(html, /onchange="runLessonVision\(this\)"/);
  assert.match(html, /async function runLessonVision\(input\)/);
  assert.match(html, /file\.size > 2000000/);
  assert.match(html, /image\/png/);
  assert.match(html, /image\/jpeg/);
  assert.match(html, /image\/webp/);
  assert.match(html, /\/vision`/);
});

test('image tutor discloses external AI processing', () => {
  assert.match(html, /Image uploads are sent to an AI provider/);
});
