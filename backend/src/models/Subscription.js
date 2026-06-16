const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['premium-monthly', 'premium-yearly'], required: true },
    reference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'NGN' },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paystackData: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
