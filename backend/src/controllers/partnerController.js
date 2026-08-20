const PartnerInquiry = require('../models/PartnerInquiry');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { normalizeEmail, isValidEmail, cleanText } = require('../utils/validation');

let impactCache = { expiresAt: 0, payload: null };

async function publicImpact(req, res) {
  if (impactCache.payload && impactCache.expiresAt > Date.now()) return res.json(impactCache.payload);

  const [learners, scholars, sponsorships, learning] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ scholarship: { $in: ['limited', 'full'] } }),
    Subscription.aggregate([
      { $match: { status: 'success', plan: { $regex: '^sponsor-' } } },
      { $group: { _id: null, amountNGN: { $sum: '$amount' }, contributions: { $sum: 1 } } },
    ]),
    User.aggregate([
      {
        $project: {
          progress: { $ifNull: ['$courseProgress', []] },
        },
      },
      {
        $project: {
          lessonsCompleted: {
            $sum: {
              $map: {
                input: '$progress', as: 'item',
                in: { $size: { $ifNull: ['$$item.completedLessons', []] } },
              },
            },
          },
          activeCourseEnrollments: {
            $size: {
              $filter: {
                input: '$progress', as: 'item',
                cond: { $gt: [{ $size: { $ifNull: ['$$item.completedLessons', []] } }, 0] },
              },
            },
          },
        },
      },
      { $group: { _id: null, lessonsCompleted: { $sum: '$lessonsCompleted' }, activeCourseEnrollments: { $sum: '$activeCourseEnrollments' } } },
    ]),
  ]);
  const payload = {
    generatedAt: new Date().toISOString(),
    metrics: {
      registeredLearners: learners,
      scholarshipLearners: scholars,
      lessonsCompleted: learning[0]?.lessonsCompleted || 0,
      activeCourseEnrollments: learning[0]?.activeCourseEnrollments || 0,
      sponsorshipContributions: sponsorships[0]?.contributions || 0,
      sponsorshipNGN: sponsorships[0]?.amountNGN || 0,
    },
    note: 'Platform-generated operational metrics; subject to funder verification and cohort-level reporting.',
  };
  impactCache = { payload, expiresAt: Date.now() + 60 * 1000 };
  res.json(payload);
}

async function createInquiry(req, res) {
  const partnershipType = cleanText(req.body.partnershipType, 32);
  const email = normalizeEmail(req.body.email);
  const payload = {
    organization: cleanText(req.body.organization, 180),
    contactName: cleanText(req.body.contactName, 120),
    email,
    country: cleanText(req.body.country, 100),
    partnershipType,
    message: cleanText(req.body.message, 3000),
  };
  if (Object.values(payload).some((value) => !value)) {
    return res.status(400).json({ message: 'Please complete every partnership field.' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ message: 'Enter a valid work email address.' });
  if (!['grant', 'csr', 'implementation', 'research', 'technology', 'other'].includes(partnershipType)) {
    return res.status(400).json({ message: 'Invalid partnership type.' });
  }
  const inquiry = await PartnerInquiry.create(payload);
  res.status(201).json({ message: 'Partnership inquiry received.', inquiryId: inquiry._id });
}

async function listInquiries(req, res) {
  const page = Math.max(1, Math.min(10000, Number(req.query.page) || 1));
  const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 50));
  const [inquiries, total] = await Promise.all([
    PartnerInquiry.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    PartnerInquiry.countDocuments(),
  ]);
  res.json({ inquiries, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

async function updateInquiry(req, res) {
  const allowed = ['new', 'contacted', 'qualified', 'closed'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status.' });
  const inquiry = await PartnerInquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
  res.json({ inquiry });
}

module.exports = { publicImpact, createInquiry, listInquiries, updateInquiry };
