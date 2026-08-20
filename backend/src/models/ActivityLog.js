const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    userName: { type: String, default: null },
    action: {
      type: String,
      required: true,
      // signup, login, visit, lesson_completed, quiz_attempt,
      // certificate_issued, payment, course_selected
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ user: 1, createdAt: -1 });
// Analytics only uses recent activity. Automatic expiry limits personal-data
// retention and prevents this write-heavy collection from growing forever.
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 * 24 * 60 * 60 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
