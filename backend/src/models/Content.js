const mongoose = require('mongoose');

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

module.exports = mongoose.model('Content', contentSchema);
