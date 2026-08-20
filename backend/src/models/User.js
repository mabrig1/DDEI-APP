const mongoose = require('mongoose');
const { attachAppwriteMirror } = require('../utils/appwriteMirrorHooks');
const bcrypt = require('bcryptjs');

const { GRANDFATHER_CUTOFF } = require('../config/pricing');

const portfolioSchema = new mongoose.Schema(
  {
    headline: String,
    summary: String,
    skills: [String],
    highlights: [String],
    generatedAt: Date,
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    lessonId: String,
    score: Number,
    total: Number,
    attemptedAt: Date,
  },
  { _id: false }
);

const courseProgressSchema = new mongoose.Schema(
  {
    courseId: String,
    completedLessons: [String],
    quizAttempts: [quizAttemptSchema],
    updatedAt: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, default: null, trim: true },
    track: { type: String, default: null },
    activeCourseId: { type: String, default: null },
    isPremium: { type: Boolean, default: false },
    premiumExpiresAt: { type: Date, default: null },
    trialExpiresAt: { type: Date, default: null },
    scholarship: { type: String, enum: ['none', 'limited', 'full'], default: 'none' },
    portfolio: { type: portfolioSchema, default: null },
    courseProgress: { type: [courseProgressSchema], default: [] },
    purchasedCourses: {
      type: [
        {
          courseId: { type: String, required: true },
          purchasedAt: { type: Date, default: Date.now },
          learningMode: { type: String, enum: ['online', 'human-assisted', 'legacy'], default: 'online' },
          purchaseType: { type: String, enum: ['course', 'certificate'], default: 'course' },
          certificateId: { type: String, default: null },
        },
      ],
      default: [],
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    visitCount: { type: Number, default: 0 },
    totalMinutes: { type: Number, default: 0 },
    lastSeenAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.hasGrandfatheredAccess = function hasGrandfatheredAccess() {
  return Boolean(this.createdAt && this.createdAt < GRANDFATHER_CUTOFF);
};

userSchema.methods.hasPremiumAccess = function hasPremiumAccess() {
  if (this.scholarship === 'full') return true;
  if ((this.purchasedCourses || []).some((purchase) => purchase.purchaseType !== 'certificate')) return true;
  const now = new Date();
  return this.isPremium && (!this.premiumExpiresAt || this.premiumExpiresAt > now);
};

userSchema.methods.hasActiveAccess = function hasActiveAccess() {
  if (this.scholarship === 'limited' || this.scholarship === 'full') return true;
  // Preserve legacy Premium memberships without letting one new course
  // purchase unlock every separately priced course.
  if (this.isPremium && (!this.premiumExpiresAt || this.premiumExpiresAt > new Date())) return true;
  return this.hasGrandfatheredAccess();
};

userSchema.methods.toJSON = function toSafeJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpires;
  obj.grandfatheredAccess = this.hasGrandfatheredAccess();
  obj.paidStudentAccess = (this.purchasedCourses || []).some((purchase) => purchase.purchaseType !== 'certificate');
  return obj;
};

// Mirror every write to the Appwrite backup backend (no-op unless configured).
attachAppwriteMirror(userSchema, 'User');

module.exports = mongoose.model('User', userSchema);
