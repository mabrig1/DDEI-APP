const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { MongoMemoryServer } = require('mongodb-memory-server');
const AdminCredential = require('../src/models/AdminCredential');
const AdminAuthAttempt = require('../src/models/AdminAuthAttempt');
const { login, forgotPassword, resetPassword, recover, changeCredentials } = require('../src/controllers/adminCredentialController');
const { requireAdmin } = require('../src/middleware/adminAuth');
const { adminRateLimit } = require('../src/middleware/adminRateLimit');
let db, sent, failMail, originalPost;
const email = 'owner@example.com';
const password = 'A fresh administrator passphrase';
const digest = (value) => crypto.createHash('sha256').update(value).digest('hex');
const response = () => ({ statusCode: 200, headers: {}, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; }, setHeader(k, v) { this.headers[k] = v; } });
async function call(fn, body = {}) { const res = response(); await fn({ body, headers: {}, ip: '127.0.0.1' }, res); return res; }
async function session(token) { const res = response(); let allowed = false; await requireAdmin({headers:{authorization:`Bearer ${token}`}},res,()=>{allowed=true;}); return {allowed, res}; }
const mailedToken = () => new URLSearchParams(new URL(sent.at(-1).text.match(/https:\/\/\S+/)[0]).hash.slice(1)).get('token');
async function seed(overrides = {}) { return AdminCredential.create({ key: 'primary', username: 'legacy-admin', passwordHash: await bcrypt.hash('Existing administrator passphrase', 4), ...overrides }); }
before(async () => {
  db = await MongoMemoryServer.create();
  await mongoose.connect(db.getUri());
  await Promise.all([AdminCredential.init(), AdminAuthAttempt.init()]);
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  process.env.RESEND_API_KEY = 'test-key-no-network';
  originalPost = axios.post;
  axios.post = async (url, body) => { assert.equal(url, 'https://api.resend.com/emails'); if(failMail) throw new Error('provider unavailable'); sent.push(body); return {data:{id:'test-mail-id'}}; };
});
after(async () => { axios.post = originalPost; await mongoose.disconnect(); if(db) await db.stop(); });
beforeEach(async () => {
  await Promise.all([AdminCredential.deleteMany({}),AdminAuthAttempt.deleteMany({})]);
  sent=[]; failMail=false;
  process.env.ADMIN_RECOVERY_EMAIL=email;
  process.env.ADMIN_USERNAME='legacy-admin';
  process.env.ADMIN_PASSWORD_HASH=await bcrypt.hash('Environment administrator passphrase',4);
  process.env.RESEND_API_KEY='test-key-no-network';
  delete process.env.ADMIN_RECOVERY_ORIGIN;
});

test('existing admin resets by verified email; hash-only token; old password and sessions are revoked', async () => {
  const old = await seed();
  const oldToken = jwt.sign({sub:'admin',isAdmin:true},process.env.JWT_SECRET);
  assert.equal((await session(oldToken)).allowed,true);
  const request = await call(forgotPassword,{email:' OWNER@EXAMPLE.COM ',redirect:'https://attacker.invalid'});
  assert.equal(request.statusCode,200); assert.equal(sent.length,1); assert.deepEqual(sent[0].to,[email]);
  const token=mailedToken(); const pending=await AdminCredential.findOne().select('+resetTokenHash');
  assert.equal(pending.passwordHash,old.passwordHash); assert.equal(pending.username,old.username);
  assert.equal(pending.resetTokenHash,digest(token)); assert.notEqual(pending.resetTokenHash,token);
  assert.ok(pending.resetExpiresAt > new Date()); assert.match(sent[0].text,/https:\/\/ddei.online\/admin-recovery#token=/);
  assert.equal(JSON.stringify(request.body).includes(token),false);
  const result=await call(resetPassword,{token,password,username:'attacker',email:'attacker@example.com'});
  assert.equal(result.statusCode,200); assert.equal(result.body.username,email); assert.equal(result.body.token,undefined);
  const updated=await AdminCredential.findOne().select('+resetTokenHash');
  assert.equal(updated.resetTokenHash,null); assert.equal(updated.recoveryEmail,email); assert.ok(updated.recoveryEmailVerifiedAt);
  assert.ok(await bcrypt.compare(password,updated.passwordHash)); assert.equal((await session(oldToken)).allowed,false);
  assert.equal((await call(login,{username:'legacy-admin',password:'Existing administrator passphrase'})).statusCode,401);
  const logged=await call(login,{username:email.toUpperCase(),password}); assert.equal(logged.statusCode,200);
  assert.equal((await session(logged.body.token)).allowed,true);
  assert.equal((await call(resetPassword,{token,password})).body.code,'INVALID_RESET_LINK');
  assert.equal(sent.length,2); assert.equal(sent[1].text.includes(password),false);
});

test('environment-only account migrates without changing login before verification', async () => {
  const existing=await call(login,{username:'legacy-admin',password:'Environment administrator passphrase'});
  assert.equal(existing.statusCode,200);
  await call(forgotPassword,{email});
  assert.equal((await session(existing.body.token)).allowed,true);
  assert.equal((await call(login,{username:'legacy-admin',password:'Environment administrator passphrase'})).statusCode,200);
  assert.equal((await call(resetPassword,{token:mailedToken(),password})).statusCode,200);
  assert.equal((await call(login,{username:'legacy-admin',password:'Environment administrator passphrase'})).statusCode,401);
});

test('concurrent reset consumption permits exactly one winner', async () => {
  await seed(); await call(forgotPassword,{email}); const token=mailedToken();
  const results=await Promise.all([call(resetPassword,{token,password}),call(resetPassword,{token,password:password+' second'})]);
  assert.deepEqual(results.map(r=>r.statusCode).sort(),[200,400]);
});

test('expired, malformed, replaced and wrong-email tokens cannot update credentials', async () => {
  const old=await seed(); await call(forgotPassword,{email}); const token=mailedToken();
  await AdminCredential.updateOne({},{$set:{resetExpiresAt:new Date(Date.now()-1)}});
  assert.equal((await call(resetPassword,{token,password})).body.code,'INVALID_RESET_LINK');
  assert.equal((await call(resetPassword,{token:{$ne:null},password})).statusCode,400);
  await AdminCredential.updateOne({},{$set:{resetRequestedAt:null}}); await call(forgotPassword,{email});
  assert.equal((await call(resetPassword,{token,password})).statusCode,400);
  const latest=mailedToken(); process.env.ADMIN_RECOVERY_EMAIL='new-owner@example.com';
  assert.equal((await call(resetPassword,{token:latest,password})).statusCode,400);
  assert.equal((await AdminCredential.findOne()).passwordHash,old.passwordHash);
});

test('unknown emails get same message; account cooldown allows only one concurrent delivery', async () => {
  await seed(); const unknown=await call(forgotPassword,{email:'unknown@example.com'}); assert.equal(sent.length,0);
  const responses=await Promise.all(Array.from({length:4},()=>call(forgotPassword,{email})));
  assert.equal(sent.length,1); responses.forEach(r=>assert.deepEqual(r.body,unknown.body));
});

test('mail delivery failures clear token and allow retry without changing credentials', async () => {
  const old=await seed(); failMail=true;
  assert.equal((await call(forgotPassword,{email})).statusCode,503);
  const failed=await AdminCredential.findOne().select('+resetTokenHash');
  assert.equal(failed.resetTokenHash,null); assert.equal(failed.resetRequestedAt,null); assert.equal(failed.passwordHash,old.passwordHash);
  failMail=false; assert.equal((await call(forgotPassword,{email})).statusCode,200); assert.equal(sent.length,1);
});

test('notification failure does not undo a successful password reset', async () => {
  await seed(); await call(forgotPassword,{email}); const token=mailedToken(); failMail=true;
  const result=await call(resetPassword,{token,password}); assert.equal(result.statusCode,200); assert.equal(result.body.notificationSent,false);
  assert.ok(await bcrypt.compare(password,(await AdminCredential.findOne()).passwordHash));
});

test('rejects weak, object, and over-72-byte passwords without consuming token', async () => {
  await seed(); await call(forgotPassword,{email}); const token=mailedToken();
  for(const invalid of ['short',{},'x'.repeat(73),'😀'.repeat(20)]) assert.equal((await call(resetPassword,{token,password:invalid})).statusCode,400);
  assert.equal((await call(resetPassword,{token,password})).statusCode,200);
});

test('missing email configuration and insecure link origins fail closed', async () => {
  await seed(); delete process.env.RESEND_API_KEY;
  assert.equal((await call(forgotPassword,{email})).statusCode,503); process.env.RESEND_API_KEY='test';
  process.env.ADMIN_RECOVERY_ORIGIN='http://attacker.invalid';
  assert.equal((await call(forgotPassword,{email})).statusCode,503); assert.equal(sent.length,0);
});

test('persistent rate limit coordinates separate middleware instances and simultaneous requests', async () => {
  const handlers=Array.from({length:12},()=>adminRateLimit('test',5)); let allowed=0;
  const results=await Promise.all(handlers.map(async handler=>{const r=response();await handler({ip:'192.0.2.1'},r,()=>allowed++);return r;}));
  assert.equal(allowed,5); assert.equal(results.filter(r=>r.statusCode===429).length,7);
  assert.ok(results.find(r=>r.statusCode===429).headers['Retry-After']);
});

test('learner tokens cannot enter admin routes and bootstrap cannot overwrite an existing admin', async () => {
  await seed(); const learner=jwt.sign({sub:'learner',isAdmin:true},process.env.JWT_SECRET);
  assert.equal((await session(learner)).res.statusCode,403);
  process.env.ADMIN_RECOVERY_TOKEN_HASH=digest('bootstrap-token');
  assert.equal((await call(recover,{recoveryToken:'bootstrap-token',username:'other-admin',password})).statusCode,409);
});

test('credential changes require current password and invalidate outstanding links and sessions', async () => {
  await seed(); await call(forgotPassword,{email}); const token=mailedToken();
  assert.equal((await call(changeCredentials,{username:email,password})).statusCode,401);
  const result=await call(changeCredentials,{username:email,password,currentPassword:'Existing administrator passphrase'});
  assert.equal(result.statusCode,200); assert.equal((await session(result.body.token)).allowed,true);
  assert.equal((await call(resetPassword,{token,password})).statusCode,400);
});
