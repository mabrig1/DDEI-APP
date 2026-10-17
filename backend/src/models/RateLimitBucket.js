const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  _id: String,
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, expires: 0 },
}, { versionKey: false });
// Shared across serverless instances. TTL deletion is cleanup, never the enforcement clock.
module.exports = mongoose.model('RateLimitBucket', schema);
