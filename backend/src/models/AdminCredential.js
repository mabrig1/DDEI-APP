const mongoose = require('mongoose');

const adminCredentialSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'primary' },
    username: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    recoveryUsedAt: { type: Date, default: null },
    updatedBy: { type: String, default: 'recovery' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminCredential', adminCredentialSchema);
