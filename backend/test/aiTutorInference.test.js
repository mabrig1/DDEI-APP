'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { generateTutorReply } = require('../src/utils/aiTutorInference');
const env = { DDEI_AI_PROVIDER:'openrouter', OPENROUTER_TUTOR_MODEL:'test/model', OPENROUTER_API_KEY:'test-secret' };
test('calls hosted inference without exposing credentials in output', async () => {
  let request;
  const fetchImpl = async (url, options) => {
    request = {url, options};
    return {ok:true,json:async()=>({choices:[{message:{content:'Use a code cell.'}}]})};
  };
  const result = await generateTutorReply({question:'Teach Python',env,fetchImpl});
  assert.deepEqual(result,{answer:'Use a code cell.',provider:'openrouter'});
  assert.equal(JSON.parse(request.options.body).model,'test/model');
  assert.equal(request.options.headers.Authorization,'Bearer test-secret');
  assert.ok(!JSON.stringify(result).includes('test-secret'));
});
test('rejects invalid input before calling provider', async () => {
  await assert.rejects(generateTutorReply({question:' '.repeat(5),env}),/Question/);
  await assert.rejects(generateTutorReply({question:'x'.repeat(2001),env}),/Question/);
});
test('fails closed on provider errors', async () => {
  await assert.rejects(generateTutorReply({question:'Hi',env,fetchImpl:async()=>({ok:false,status:429})}),/429/);
});
