const mongoose = require('mongoose');
const { attachAppwriteMirror } = require('../utils/appwriteMirrorHooks');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, enum: ['page', 'post'], required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    excerpt: { type: String, default: '', trim: true },
    body: { type: String, required: true },
    featuredImageUrl: { type: String, default: '', trim: true },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

contentSchema.statics.slugify = slugify;

// Mirror every write to the Appwrite backup backend (no-op unless configured).
attachAppwriteMirror(contentSchema, 'Content');

module.exports = mongoose.model('Content', contentSchema);
