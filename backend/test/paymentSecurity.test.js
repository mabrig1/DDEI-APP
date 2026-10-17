const {test}=require('node:test');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
process.env.PAYSTACK_SECRET_KEY='sk_test_'+crypto.randomBytes(24).toString('hex');
const Subscription=require('../src/models/Subscription');
const User=require('../src/models/User');
const axios=require('axios');
const {settlePayment,grantPaymentBenefits,verifyPayment,initializePayment}=require('../src/controllers/paymentController');
const ref='dsb_0123456789abcdef';
function record(){return {_id:'payment-id',reference:ref,plan:'premium-monthly',amount:2000,currency:'NGN',status:'pending',createdAt:new Date('2026-01-01'),save:async function(){}};}
function response(){return {statusCode:200,status(v){this.statusCode=v;return this;},json(v){this.body=v;return this;}};}
test('settlement rejects underpayment, currency mismatch and unsuccessful provider status',async t=>{
 let grants=0;t.mock.method(User,'updateOne',async()=>{grants++;});
 for(const data of [{amount:1,currency:'NGN',status:'success'},{amount:200000,currency:'USD',status:'success'},{amount:200000,currency:'NGN',status:'failed'}]){
 const payment=record();t.mock.method(Subscription,'findOne',async()=>payment);
 t.mock.method(Subscription,'findOneAndUpdate',async(filter,update)=>{assert.deepEqual(filter.status,{$ne:'success'});Object.assign(payment,update.$set);return payment;});
 const result=await settlePayment({reference:ref,...data});assert.equal(result.status,'failed');}
 assert.equal(grants,0);
});
test('duplicate delivery settles once and course benefit uses atomic nonduplicate predicate',async t=>{
 const payment={...record(),plan:'prompt-engineering-full',amount:12000,user:'user-id'};let transitions=0,grants=0;
 t.mock.method(Subscription,'findOne',async()=>payment);
 t.mock.method(Subscription,'findOneAndUpdate',async(filter,update)=>{transitions++;Object.assign(payment,update.$set);return payment;});
 t.mock.method(Subscription,'updateOne',async(filter,update)=>Object.assign(payment,update.$set));
 t.mock.method(User,'updateOne',async(filter,update)=>{assert.equal(filter['purchasedCourses.courseId'].$ne,'mastering-prompt-engineering');assert(update.$push);grants++;});
 const data={reference:ref,amount:1200000,currency:'NGN',status:'success'};
 await settlePayment(data);await settlePayment(data);assert.equal(transitions,1);assert.equal(grants,1);
});
test('benefit delivery recovers after a post-settlement failure without moving expiry',async t=>{
 const payment={...record(),status:'success',user:'user-id',settledAt:new Date('2026-01-01')};let attempt=0;const expiries=[];
 t.mock.method(Subscription,'findOne',async()=>payment);
 t.mock.method(Subscription,'updateOne',async(filter,update)=>Object.assign(payment,update.$set));
 t.mock.method(User,'updateOne',async(filter,update)=>{expiries.push(update.$max.premiumExpiresAt.toISOString());if(++attempt===1)throw new Error('temporary DB failure');});
 const data={reference:ref,amount:200000,currency:'NGN',status:'success'};
 await assert.rejects(settlePayment(data));await settlePayment(data);await settlePayment(data);
 assert.equal(attempt,2);assert.equal(expiries[0],expiries[1]);assert(payment.benefitsGrantedAt);
});
test('verification returns status and plan without customer or attribution data',async t=>{
 const payment={...record(),status:'success',customerEmail:'private@example.com',growthConversionReportedAt:new Date(),attributionToken:'private-attribution'};
 t.mock.method(Subscription,'findOne',async()=>payment);
 t.mock.method(axios,'create',()=>({get:async()=>({data:{data:{reference:ref,amount:200000,currency:'NGN',status:'success'}}})}));
 const res=response();await verifyPayment({params:{reference:ref}},res);
 assert.deepEqual(res.body,{status:'success',reference:ref,plan:'premium-monthly'});
});
test('payment initialization ignores attacker-supplied prices and external callback URLs',async t=>{
 let stored,provider;
 t.mock.method(Subscription,'create',async value=>{stored=value;return {...value,_id:'payment-id'};});
 t.mock.method(axios,'create',()=>({post:async(path,value)=>{provider=value;return {data:{data:{authorization_url:'https://checkout.paystack.com/test'}}};}}));
 process.env.FRONTEND_URL='https://ddei.online';
 const res=response();await initializePayment({body:{plan:'premium-monthly',email:'test@example.com',amount:1,callbackUrl:'https://evil.example/steal'}},res);
 assert.equal(res.statusCode,201);assert.equal(stored.amount,2000);assert.equal(provider.amount,200000);assert.equal(provider.callback_url,'https://ddei.online');
});
