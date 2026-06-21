const Content = require('../models/Content');

async function uniqueSlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let suffix = 1;
  let existing = await Content.findOne(excludeId ? { slug, _id: { $ne: excludeId } } : { slug });
  while (existing) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
    existing = await Content.findOne(excludeId ? { slug, _id: { $ne: excludeId } } : { slug });
  }
  return slug;
}

async function listPublic(req, res) {
  const { type } = req.query;
  const filter = { status: 'published' };
  if (type) filter.type = type;

  const content = await Content.find(filter)
    .select('title slug type excerpt featuredImageUrl publishedAt')
    .sort({ publishedAt: -1 });

  res.json({ content });
}

async function getPublicBySlug(req, res) {
  const content = await Content.findOne({ slug: req.params.slug, status: 'published' });
  if (!content) {
    return res.status(404).json({ message: 'Page or post not found' });
  }
  res.json({ content });
}

async function listAdmin(req, res) {
  const { type } = req.query;
  const filter = {};
  if (type) filter.type = type;

  const content = await Content.find(filter).sort({ updatedAt: -1 });
  res.json({ content });
}

async function getAdminById(req, res) {
  const content = await Content.findById(req.params.id);
  if (!content) {
    return res.status(404).json({ message: 'Page or post not found' });
  }
  res.json({ content });
}

async function createContent(req, res) {
  const { title, type, status, body, excerpt, featuredImageUrl, slug } = req.body;

  if (!title || !type || !body) {
    return res.status(400).json({ message: 'title, type, and body are required' });
  }
  if (!['page', 'post'].includes(type)) {
    return res.status(400).json({ message: 'type must be "page" or "post"' });
  }

  const baseSlug = Content.slugify(slug || title);
  if (!baseSlug) {
    return res.status(400).json({ message: 'Could not derive a valid slug from the title' });
  }
  const finalSlug = await uniqueSlug(baseSlug);
  const isPublished = status === 'published';

  const content = await Content.create({
    title,
    slug: finalSlug,
    type,
    status: isPublished ? 'published' : 'draft',
    body,
    excerpt: excerpt || '',
    featuredImageUrl: featuredImageUrl || '',
    publishedAt: isPublished ? new Date() : null,
  });

  res.status(201).json({ content });
}

async function updateContent(req, res) {
  const content = await Content.findById(req.params.id);
  if (!content) {
    return res.status(404).json({ message: 'Page or post not found' });
  }

  const { title, type, status, body, excerpt, featuredImageUrl, slug } = req.body;

  if (type !== undefined) {
    if (!['page', 'post'].includes(type)) {
      return res.status(400).json({ message: 'type must be "page" or "post"' });
    }
    content.type = type;
  }
  if (title !== undefined) content.title = title;
  if (body !== undefined) content.body = body;
  if (excerpt !== undefined) content.excerpt = excerpt;
  if (featuredImageUrl !== undefined) content.featuredImageUrl = featuredImageUrl;

  if (slug !== undefined && slug.trim()) {
    const baseSlug = Content.slugify(slug);
    if (baseSlug && baseSlug !== content.slug) {
      content.slug = await uniqueSlug(baseSlug, content._id);
    }
  }

  if (status !== undefined && ['draft', 'published'].includes(status)) {
    if (status === 'published' && content.status !== 'published') {
      content.publishedAt = new Date();
    }
    content.status = status;
  }

  await content.save();
  res.json({ content });
}

async function deleteContent(req, res) {
  const content = await Content.findByIdAndDelete(req.params.id);
  if (!content) {
    return res.status(404).json({ message: 'Page or post not found' });
  }
  res.json({ message: 'Deleted' });
}

module.exports = {
  listPublic,
  getPublicBySlug,
  listAdmin,
  getAdminById,
  createContent,
  updateContent,
  deleteContent,
};
