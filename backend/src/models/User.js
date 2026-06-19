const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    track: { type: String, default: null },
    activeCourseId: { type: String, default: null },
    isPremium: { type: Boolean, default: false },
    premiumExpiresAt: { type: Date, default: null },
    portfolio: { type: portfolioSchema, default: null },
    courseProgress: { type: [courseProgressSchema], default: [] },
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

userSchema.methods.toJSON = function toSafeJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
