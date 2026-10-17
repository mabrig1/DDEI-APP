'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const routes = fs.readFileSync(path.join(__dirname, '../src/routes/courseRoutes.js'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '../src/app.js'), 'utf8');
test('vision route requires authentication and active course access', () => {
  assert.match(routes, /router\.post\('\/:id\/vision', coachRateLimit, requireAuth, requireActiveAccess, interpretCourseImage\)/);
});
test('vision upload parser requires authentication before accepting larger JSON', () => {
  assert.match(app, /app\.use\('\/api\/courses\/:id\/vision', require\('\.\/middleware\/auth'\)\.requireAuth, express\.json\(\{ limit: '3mb' \}\)\)/);
});
