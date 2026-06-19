const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    track: { type: String, required: true },
    tier: { type: String, enum: ['tier1', 'tier2'], required: true },
    motivation: { type: String, required: true },
    status: { type: String, enum: ['pending', 'reviewing', 'accepted', 'rejected'], default: 'pending' },
    scholarship: { type: String, enum: ['none', 'limited', 'full'], default: 'none' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
