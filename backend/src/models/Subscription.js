const mongoose = require('mongoose');
const { attachAppwriteMirror } = require('../utils/appwriteMirrorHooks');

const subscriptionSchema = new mongoose.Schema(
  {
    // user is optional: /api/payments/initialize uses optionalAuth, so
    // anonymous visitors can pay with just an email address.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    // Plan names are validated against PLANS in paymentController — an enum
    // here silently breaks payments every time a new plan is added.
    plan: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    referralCode: { type: String, default: null, index: true, maxlength: 64 },
    customerEmail: { type: String, default: null, lowercase: true, trim: true, maxlength: 254 },
    attributionToken: { type: String, default: null, maxlength: 2048 },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'NGN' },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paystackData: { type: mongoose.Schema.Types.Mixed, default: null },
    // A paid record is not the same as delivered access. Keep a separate
    // durable fulfillment marker so webhook redelivery and callback checks
    // can safely recover temporary database failures.
    benefitsAppliedAt: { type: Date, default: null },
    accessEmailSentAt: { type: Date, default: null },
    promoterConversionReportedAt: { type: Date, default: null },
    growthConversionReportedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Mirror every write to the Appwrite backup backend (no-op unless configured).
attachAppwriteMirror(subscriptionSchema, 'Subscription');

module.exports = mongoose.model('Subscription', subscriptionSchema);
