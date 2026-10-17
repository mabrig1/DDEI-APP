// Explicit local-database integration target, separate from the unit test directory.
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const mongoose=require('mongoose');
const User=require('../src/models/User');
const Subscription=require('../src/models/Subscription');
const Bucket=require('../src/models/RateLimitBucket');
const {settlePayment}=require('../src/controllers/paymentController');
const {resetPassword}=require('../src/controllers/authController');
const {rateLimit}=require('../src/middleware/security');
const response=()=>({statusCode:200,setHeader(){},status(n){this.statusCode=n;return this;},json(v){this.body=v;return this;}});
(async()=>{
 const uri=process.env.TEST_MONGODB_URI;
 if(!uri || !uri.startsWith('mongodb://127.0.0.1:'))throw new Error('Explicit local TEST_MONGODB_URI required');
 process.env.JWT_SECRET=crypto.randomBytes(48).toString('hex');
 process.env.APPWRITE_BACKUP_ENABLED='false';
 await mongoose.connect(uri,{serverSelectionTimeoutMS:10000});
 try{
 await Promise.all([User.init(),Subscription.init(),Bucket.init()]);
 const id=crypto.randomUUID();
 const user=await User.create({name:'Security Test',email:`${id}@example.com`,password:'InitialPassword123'});
 const payment=await Subscription.create({user:user._id,reference:'dsb_'+crypto.randomBytes(8).toString('hex'),plan:'prompt-engineering-full',amount:12000,currency:'NGN',status:'pending'});
 const data={reference:payment.reference,status:'success',amount:1200000,currency:'NGN'};
 await Promise.all(Array.from({length:8},()=>settlePayment(data)));
 let saved=await User.findById(user._id);assert.equal(saved.purchasedCourses.filter(p=>p.courseId==='mastering-prompt-engineering').length,1);
 await settlePayment({...data,status:'failed'});assert.equal((await Subscription.findById(payment._id)).status,'success');
 const token=crypto.randomBytes(32).toString('hex');saved.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');saved.resetPasswordExpires=new Date(Date.now()+60000);await saved.save();
 const results=await Promise.all(Array.from({length:3},async()=>{const res=response();await resetPassword({body:{token,password:'ReplacementPass123'}},res);return res;}));
 assert.equal(results.filter(r=>r.statusCode===200).length,1);saved=await User.findById(user._id);assert.equal(saved.authVersion,1);assert(await saved.comparePassword('ReplacementPass123'));
 // Legacy credential rows have no version field; rotation must still revoke tokens.
 const AdminCredential=require('../src/models/AdminCredential');
 const bcrypt=require('bcryptjs');
 const adminController=require('../src/controllers/adminCredentialController');
 const {requireAdmin}=require('../src/middleware/adminAuth');
 await AdminCredential.collection.insertOne({key:'primary',username:'test-owner',passwordHash:await bcrypt.hash('OriginalAdmin123',12)});
 const loginResponse=response();await adminController.login({body:{username:'test-owner',password:'OriginalAdmin123'}},loginResponse);
 assert.equal(loginResponse.statusCode,200);assert(loginResponse.body.token);
 const changed=response();await adminController.changeCredentials({body:{username:'test-owner',password:'ReplacedAdmin123'}},changed);assert.equal(changed.statusCode,200);
 const oldSession=response();let accepted=false;await requireAdmin({headers:{authorization:'Bearer '+loginResponse.body.token}},oldSession,()=>{accepted=true;});assert.equal(oldSession.statusCode,401);assert.equal(accepted,false);
 process.env.NODE_ENV='production';let passed=0;
 const statuses=await Promise.all(Array.from({length:10},async()=>{const res=response();await rateLimit({max:3,namespace:'integration-'+id})({method:'POST',ip:'192.0.2.10'},res,()=>passed++);return res.statusCode;}));
 assert.equal(passed,3);assert.equal(statuses.filter(s=>s===429).length,7);
 assert((await Bucket.collection.indexes()).some(i=>i.expireAfterSeconds===0));
 console.log('MongoDB integration passed: concurrent payment replay, non-downgrade, single-use reset, token version, legacy admin rotation, shared limit across middleware instances, TTL index.');
 // No database deletion: this local CI database disappears with its service container.
 }finally{await mongoose.disconnect();}
})().catch(e=>{console.error(e);process.exitCode=1;});
