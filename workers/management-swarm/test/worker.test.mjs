import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { dispatch } from '../src/index.mjs';
const env = { SWARM_WORKER_ENABLED: 'true', SWARM_WORKER_SECRET: 'x'.repeat(32) };
test('disabled and missing secret never call backend', async () => {
  const never = () => { throw Error('unexpected fetch'); };
  assert.deepEqual(await dispatch({}, never), { status:'disabled' });
  assert.deepEqual(await dispatch({SWARM_WORKER_ENABLED:'true'}, never), {status:'missing-secret'});
});
test('only authenticated fixed backend endpoint is contacted', async () => {
  const result = await dispatch(env, async (url, opts) => {
    assert.equal(url, 'https://api.ddei.online/api/management-swarm/cloudflare');
    assert.equal(opts.method, 'POST'); assert.equal(opts.redirect, 'error');
    assert.equal(opts.headers.authorization, 'Bearer ' + env.SWARM_WORKER_SECRET);
    return Response.json({ agents: Array.from({length:5},()=>({status:'completed'})) });
  });
  assert.deepEqual(result, {status:'completed',agentCount:5});
});
test('skip and failure are not reported as completed', async () => {
  assert.deepEqual(await dispatch(env, async()=>Response.json({skipped:true,reason:'already-running'})),{status:'skipped',reason:'already-running'});
  assert.deepEqual(await dispatch(env, async()=>new Response('private body',{status:401})),{status:'backend-error',httpStatus:401});
  assert.deepEqual(await dispatch(env, async()=>Response.json({})),{status:'unexpected-response'});
  assert.deepEqual(await dispatch(env, async()=>{throw Error('fixture');}),{status:'transport-error'});
});
test('health is read-only and no public run endpoint exists',async()=>{
  assert.equal((await worker.fetch(new Request('https://worker.example/health'),env)).status,200);
  assert.equal((await worker.fetch(new Request('https://worker.example/run',{method:'POST'}),env)).status,404);
});
