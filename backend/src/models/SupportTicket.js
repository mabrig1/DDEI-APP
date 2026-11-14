const mongoose = require('mongoose');

// Support conversations are private. They are deliberately excluded from
// the public/read-only Appwrite mirror used for catalog failover.
const replySchema = new mongoose.Schema({
  author: { type: String, enum: ['learner', 'support'], required: true },
  body: { type: String, required: true, maxlength: 3000 },
  sentAt: { type: Date, default: Date.now },
}, { _id: false });

const supportTicketSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  category: { type: String, enum: ['payment', 'account', 'course', 'certificate', 'other'], required: true },
  subject: { type: String, required: true, maxlength: 120 },
  description: { type: String, required: true, maxlength: 3000 },
  paymentReference: { type: String, default: null },
  status: { type: String, enum: ['open', 'awaiting_user', 'resolved'], default: 'open', index: true },
  replies: { type: [replySchema], default: [] },
  resolvedAt: { type: Date, default: null },
}, { timestamps: true });

supportTicketSchema.index({ requester: 1, createdAt: -1 });
supportTicketSchema.index({ status: 1, updatedAt: -1 });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
