const PartnerInquiry = require('../models/PartnerInquiry');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

async function publicImpact(req, res) {
  const [learners, scholars, sponsorships] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ scholarship: { $in: ['limited', 'full'] } }),
    Subscription.aggregate([
      { $match: { status: 'success', plan: { $regex: '^sponsor-' } } },
      { $group: { _id: null, amountNGN: { $sum: '$amount' }, contributions: { $sum: 1 } } },
    ]),
  ]);

  const users = await User.find({}, 'courseProgress').lean();
  let lessonsCompleted = 0;
  let courseCompletions = 0;
  users.forEach((user) => (user.courseProgress || []).forEach((progress) => {
    lessonsCompleted += (progress.completedLessons || []).length;
    if ((progress.completedLessons || []).length > 0) courseCompletions += 1;
  }));

  res.json({
    generatedAt: new Date().toISOString(),
    metrics: {
      registeredLearners: learners,
      scholarshipLearners: scholars,
      lessonsCompleted,
      activeCourseEnrollments: courseCompletions,
      sponsorshipContributions: sponsorships[0]?.contributions || 0,
      sponsorshipNGN: sponsorships[0]?.amountNGN || 0,
    },
    note: 'Platform-generated operational metrics; subject to funder verification and cohort-level reporting.',
  });
}

async function createInquiry(req, res) {
  const required = ['organization', 'contactName', 'email', 'country', 'partnershipType', 'message'];
  if (required.some((key) => !String(req.body[key] || '').trim())) {
    return res.status(400).json({ message: 'Please complete every partnership field.' });
  }
  const inquiry = await PartnerInquiry.create({
    organization: req.body.organization,
    contactName: req.body.contactName,
    email: req.body.email,
    country: req.body.country,
    partnershipType: req.body.partnershipType,
    message: req.body.message,
  });
  res.status(201).json({ message: 'Partnership inquiry received.', inquiryId: inquiry._id });
}

async function listInquiries(req, res) {
  const inquiries = await PartnerInquiry.find().sort({ createdAt: -1 });
  res.json({ inquiries });
}

async function updateInquiry(req, res) {
  const allowed = ['new', 'contacted', 'qualified', 'closed'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status.' });
  const inquiry = await PartnerInquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
  res.json({ inquiry });
}

module.exports = { publicImpact, createInquiry, listInquiries, updateInquiry };
