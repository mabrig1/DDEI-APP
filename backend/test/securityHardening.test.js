'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const jwt = require('jsonwebtoken');
const { requireAuth, optionalAuth } = require('../src/middleware/auth');

const frontend = fs.readFileSync(path.join(__dirname, '../../frontend/index.html'), 'utf8');
const admin = fs.readFileSync(path.join(__dirname, '../../frontend/admin.html'), 'utf8');
const deployment = JSON.parse(fs.readFileSync(path.join(__dirname, '../../frontend/vercel.json'), 'utf8'));

function response() {
  return {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
}

test('learner authentication accepts only HS256 learner subjects', () => {
  const previous = process.env.JWT_SECRET;
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  try {
    const id = '507f1f77bcf86cd799439011';
    const exercise = (token, middleware = requireAuth) => {
      const req = { headers: { authorization: 'Bearer ' + token } };
      const res = response();
      let called = false;
      middleware(req, res, () => { called = true; });
      return { req, res, called };
    };
    const learner = jwt.sign({ sub: id }, process.env.JWT_SECRET, { algorithm: 'HS256' });
    assert.equal(exercise(learner).req.userId, id);
    assert.equal(exercise(learner).called, true);

    const admin = jwt.sign({ sub: 'admin', isAdmin: true }, process.env.JWT_SECRET);
    assert.equal(exercise(admin).res.statusCode, 401);
    const roleConfusion = jwt.sign({ sub: id, isAdmin: true }, process.env.JWT_SECRET);
    assert.equal(exercise(roleConfusion).res.statusCode, 401);
    const invalidSub = jwt.sign({ sub: 'not-an-object-id' }, process.env.JWT_SECRET);
    assert.equal(exercise(invalidSub).res.statusCode, 401);
    const wrongAlgorithm = jwt.sign({ sub: id }, process.env.JWT_SECRET, { algorithm: 'HS384' });
    assert.equal(exercise(wrongAlgorithm).res.statusCode, 401);
    assert.equal(exercise(admin, optionalAuth).req.userId, undefined);
  } finally {
    if (previous === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previous;
  }
});

test('untrusted article, chat and portfolio content has safe rendering guards', () => {
  assert.match(frontend, /replaceChildren\(safeArticleFragment\(item\.body\)\)/);
  assert.doesNotMatch(frontend, /contentViewBody'\)\.innerHTML\s*=\s*item\.body/);
  assert.match(frontend, /const blocked = new Set\(/);
  assert.match(frontend, /escapeHtml\(text\)/);
  assert.match(frontend, /escapeHtml\(p\.headline\)/);
  assert.match(frontend, /escapeHtml\(p\.summary\)/);
  assert.match(frontend, /escapeHtml\(h\)/);
  assert.match(frontend, /parsed\.protocol === 'https:'/);
});

test('admin bearer token is tab-scoped and production has baseline CSP', () => {
  assert.match(admin, /sessionStorage\.getItem\('dsb_admin_token'\)/);
  assert.match(admin, /localStorage\.removeItem\('dsb_admin_token'\)/);
  assert.doesNotMatch(admin, /localStorage\.setItem\('dsb_admin_token'/);
  const mainPolicy = deployment.headers.find((entry) => entry.source === '/(.*)')
    ?.headers.find((header) => header.key === 'Content-Security-Policy')?.value;
  assert.ok(mainPolicy);
  assert.match(mainPolicy, /object-src 'none'/);
  assert.match(mainPolicy, /frame-ancestors 'none'/);
});
