const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  _id: String,
  leaseUntil: Date,
  leaseToken: String,
  lastRun: mongoose.Schema.Types.Mixed,
}, { versionKey: false, minimize: false });
module.exports = mongoose.model('ManagementSwarmState', schema);
