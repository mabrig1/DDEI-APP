const mongoose = require('mongoose');
const { attachAppwriteMirror } = require('../utils/appwriteMirrorHooks');
const {
  AVAILABILITY_OPTIONS,
  EDUCATION_LEVELS,
  RECRUITMENT_ROLES,
  WORK_PREFERENCES,
} = require('../utils/recruitment');

const recruitmentApplicationSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 320 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    location: { type: String, required: true, trim: true, maxlength: 120 },
    educationLevel: { type: String, enum: EDUCATION_LEVELS, required: true },
    institution: { type: String, required: true, trim: true, maxlength: 180 },
    role: { type: String, enum: RECRUITMENT_ROLES, required: true },
    skills: { type: String, required: true, trim: true, maxlength: 2000 },
    availability: { type: String, enum: AVAILABILITY_OPTIONS, required: true },
    workPreference: { type: String, enum: WORK_PREFERENCES, required: true },
    portfolioUrl: { type: String, default: '', trim: true, maxlength: 1000 },
    motivation: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ['submitted', 'reviewing', 'shortlisted', 'interview', 'hired', 'not-selected'],
      default: 'submitted',
    },
    adminNotes: { type: String, default: '', trim: true, maxlength: 5000 },
    consentAt: { type: Date, required: true },
  },
  { timestamps: true }
);

recruitmentApplicationSchema.index({ email: 1, createdAt: -1 });
recruitmentApplicationSchema.index({ status: 1, createdAt: -1 });

attachAppwriteMirror(recruitmentApplicationSchema, 'RecruitmentApplication');

module.exports = mongoose.model('RecruitmentApplication', recruitmentApplicationSchema);
