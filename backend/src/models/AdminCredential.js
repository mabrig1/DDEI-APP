const mongoose = require('mongoose');

const adminCredentialSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'primary' },
    username: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    sessionVersion: { type: String, default: null },
    resetTokenHash: { type: String, default: null, select: false },
    resetExpiresAt: { type: Date, default: null },
    resetRequestedAt: { type: Date, default: null },
    resetEmail: { type: String, default: null },
    recoveryEmailVerifiedAt: { type: Date, default: null },
    recoveryEmail: { type: String, default: null },
    recoveryUsedAt: { type: Date, default: null },
    updatedBy: { type: String, default: 'recovery' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminCredential', adminCredentialSchema);
