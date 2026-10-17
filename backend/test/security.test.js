const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = crypto.randomBytes(48).toString('hex');
process.env.PAYSTACK_SECRET_KEY = 'sk_test_' + crypto.randomBytes(24).toString('hex');
const jwt = require('jsonwebtoken');
const User = require('../src/models/User');
const AdminCredential = require('../src/models/AdminCredential');
const app = require('../src/app');
const { errorHandler } = require('../src/middleware/errorHandler');
const { rateLimit } = require('../src/middleware/security');
const { passwordError } = require('../src/utils/validation');
const express = require('express');
let server, base;
before(async () => { server = app.listen(0, '127.0.0.1'); await new Promise(r => server.once('listening',r)); base = `http://127.0.0.1:${server.address().port}`; });
after(() => new Promise(r => server.close(r)));
async function request(path, body, headers = {}) {
  return fetch(base+path, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type':'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
}
test('public health is minimal and has browser security headers', async () => {
 const r = await request('/api/health'); assert.equal(r.status,200);
 assert.equal(r.headers.get('x-powered-by'),null); assert.equal(r.headers.get('x-content-type-options'),'nosniff');
 assert.match(r.headers.get('content-security-policy'),/default-src 'none'/);
 assert.deepEqual(await r.json(), {status:'ok',service:'destiny-skills-bridge-backend'});
});
test('unauthenticated user and admin routes deny access before DB reads', async () => {
 assert.equal((await request('/api/auth/me')).status,401);
 assert.equal((await request('/api/admin/users')).status,401);
});
test('valid user JWT cannot authorize admin operations', async () => {
 const token = jwt.sign({sub:'0123456789abcdef01234567'},process.env.JWT_SECRET);
 assert.equal((await request('/api/admin/users',undefined,{Authorization:`Bearer ${token}`})).status,403);
});
test('admin JWT cannot impersonate a learner', async () => {
 const token = jwt.sign({sub:'admin',isAdmin:true},process.env.JWT_SECRET);
 assert.equal((await request('/api/auth/me',undefined,{Authorization:`Bearer ${token}`})).status,401);
});
test('wrong JWT algorithm and expired tokens are rejected', async () => {
 for(const options of [{algorithm:'HS384'},{expiresIn:-1}]) {
 const token=jwt.sign({sub:'0123456789abcdef01234567'},process.env.JWT_SECRET,options);
 assert.equal((await request('/api/auth/me',undefined,{Authorization:`Bearer ${token}`})).status,401);
 }
});
test('changed password version revokes prior user session', async t => {
 t.mock.method(User,'findById',()=>({select:async()=>({authVersion:2})}));
 const { requireAuth }=require('../src/middleware/auth'); let status,called=false;
 const res={status(v){status=v;return this;},json(){}};
 const token=jwt.sign({sub:'0123456789abcdef01234567',ver:1},process.env.JWT_SECRET);
 await requireAuth({headers:{authorization:`Bearer ${token}`}},res,()=>{called=true;});
 assert.equal(status,401);assert.equal(called,false);
});
test('credential rotation revokes old admin sessions', async t => {
 t.mock.method(AdminCredential,'findOne',()=>({select:async()=>({authVersion:3})}));
 const { requireAdmin }=require('../src/middleware/adminAuth'); let status,called=false;
 const res={status(v){status=v;return this;},json(){}};
 const token=jwt.sign({sub:'admin',isAdmin:true,ver:2},process.env.JWT_SECRET);
 await requireAdmin({headers:{authorization:`Bearer ${token}`}},res,()=>{called=true;});
 assert.equal(status,401);assert.equal(called,false);
});
test('prototype/operator injection and non-object bodies are rejected', async () => {
 for(const body of [JSON.parse('{"__proto__":{"polluted":true}}'),{email:{$ne:null}},[],{profile:{'a.b':1}}]) {
 assert.equal((await request('/api/auth/login',body)).status,400);
 }
 assert.equal({}.polluted,undefined);
});
test('malformed credentials and payment prototype keys are rejected', async () => {
 assert.equal((await request('/api/admin/login',{username:'owner',password:{x:1}})).status,400);
 for(const plan of ['constructor','__proto__','toString']) assert.equal((await request('/api/payments/initialize',{plan,email:'test@example.com'})).status,400);
});
test('oversized and malformed JSON return safe errors', async () => {
 let r=await fetch(base+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"password":'});
 assert.equal(r.status,400); assert.equal((await r.json()).message,'Invalid request');
 r=await request('/api/auth/login',{password:'a'.repeat(110000)});assert.equal(r.status,413);
});
test('webhook rejects missing and forged signatures; accepts exact signed raw bytes',async()=>{
 const payload={event:'ignored.event',data:{}};
 assert.equal((await request('/api/payments/webhook',payload)).status,401);
 assert.equal((await request('/api/payments/webhook',payload,{'x-paystack-signature':'a'.repeat(128)})).status,401);
 const signature=crypto.createHmac('sha512',process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(payload)).digest('hex');
 assert.equal((await request('/api/payments/webhook/?delivery=test',payload,{'x-paystack-signature':signature})).status,200);
 assert.equal((await request('/api/payments/webhook',{...payload,event:'tampered'},{'x-paystack-signature':signature})).status,401);
});
test('invalid supplied bearer token does not silently create an anonymous payment',async()=>{
 assert.equal((await request('/api/payments/initialize',{plan:'premium-monthly',email:'test@example.com'},{Authorization:'Bearer invalid'})).status,401);
});
test('proxy default prevents spoofing request limits using X-Forwarded-For',async()=>{
 const a=express();a.set('trust proxy',false);a.use(rateLimit({max:1,namespace:'proxy-test'}));a.get('/',(q,s)=>s.json({ok:true}));
 const s=a.listen(0,'127.0.0.1');await new Promise(r=>s.once('listening',r));
 try { const url=`http://127.0.0.1:${s.address().port}/`;
 assert.equal((await fetch(url,{headers:{'X-Forwarded-For':'192.0.2.1'}})).status,200);
 const response=await fetch(url,{headers:{'X-Forwarded-For':'192.0.2.2'}});assert.equal(response.status,429);assert(response.headers.get('retry-after'));
 } finally {await new Promise(r=>s.close(r));}
});
test('production rate limits use shared atomic store and fail closed',async t=>{
 const Bucket=require('../src/models/RateLimitBucket');let count=0;
 t.mock.method(Bucket,'findOneAndUpdate',async()=>({count:++count}));
 process.env.NODE_ENV='production';
 const req={ip:'192.0.2.9',method:'GET'};let status=200,passed=0;
 const res={setHeader(){},status(v){status=v;return this;},json(){}};
 try {
  await rateLimit({max:1,namespace:'shared'})(req,res,()=>passed++);
  await rateLimit({max:1,namespace:'shared'})(req,res,()=>passed++);
  assert.equal(passed,1);assert.equal(status,429);
  t.mock.method(Bucket,'findOneAndUpdate',async()=>{throw new Error('database private details');});
  await rateLimit({max:1})(req,res,()=>passed++);assert.equal(status,503);
 }finally{process.env.NODE_ENV='test';}
});
test('generic errors never disclose secrets or internals',()=>{
 let body,status;errorHandler(new Error('private database connection details'),{method:'GET',ip:'127.0.0.1'},{status(v){status=v;return this;},json(v){body=v;}},()=>{});
 assert.equal(status,500);assert.deepEqual(body,{message:'Internal server error'});
});
test('bcrypt byte-limit rejects truncation collisions',()=>{
 assert.match(passwordError('A1'+'a'.repeat(71)),/72 bytes/);
 assert.match(passwordError('A1'+'😀'.repeat(18)),/72 bytes/);
 assert.equal(passwordError('SafePassword123'),null);
});
test('CORS production allowlist excludes foreign origins and permits provider requests',()=>{
 const {isOriginAllowed}=require('../src/config/cors');process.env.NODE_ENV='production';
 try {assert.equal(isOriginAllowed('https://evil.example'),false);assert.equal(isOriginAllowed('https://ddei.online'),true);assert.equal(isOriginAllowed(undefined),true);}finally{process.env.NODE_ENV='test';}
});
test('async route rejection reaches safe error handler',async()=>{
 const a=express(),router=require('../src/utils/safeRouter')();router.get('/',async()=>{throw new Error('private database failure');});a.use(router);a.use(errorHandler);
 const s=a.listen(0,'127.0.0.1');await new Promise(r=>s.once('listening',r));
 try{const r=await fetch(`http://127.0.0.1:${s.address().port}/`);assert.equal(r.status,500);assert.deepEqual(await r.json(),{message:'Internal server error'});}finally{await new Promise(r=>s.close(r));}
});
