'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const routes = fs.readFileSync(path.join(__dirname, '../src/routes/courseRoutes.js'), 'utf8');
const controller = fs.readFileSync(path.join(__dirname, '../src/controllers/courseController.js'), 'utf8');
test('reasoning route is guarded by authentication and course access', () => {
  assert.match(routes, /router\.post\('\/:id\/reason', coachRateLimit, requireAuth, requireActiveAccess, reasonAboutLesson\)/);
});
test('reasoning controller validates lesson and uses server-side reasoning task', () => {
  assert.match(controller, /async function reasonAboutLesson/);
  assert.match(controller, /findLesson\(course, lessonId\)/);
  assert.match(controller, /generateTutorReply\(\{ question, task: 'reasoning', context \}\)/);
});
