const mongoose = require('mongoose');

// Shared by all serverless instances. _id includes a time window, so TTL cleanup
// is only housekeeping and never determines whether a request is allowed.
const schema = new mongoose.Schema({
  _id: String,
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, expires: 0 },
});
module.exports = mongoose.model('AdminAuthAttempt', schema);
