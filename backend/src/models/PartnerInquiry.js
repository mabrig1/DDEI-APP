const mongoose = require('mongoose');

const partnerInquirySchema = new mongoose.Schema({
  organization: { type: String, required: true, trim: true, maxlength: 180 },
  contactName: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 180 },
  country: { type: String, required: true, trim: true, maxlength: 100 },
  partnershipType: {
    type: String,
    enum: ['grant', 'csr', 'implementation', 'research', 'technology', 'other'],
    required: true,
  },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('PartnerInquiry', partnerInquirySchema);
