const RecruitmentApplication = require('../models/RecruitmentApplication');
const { sendRecruitmentNotification } = require('../utils/mailer');
const { validateRecruitmentPayload } = require('../utils/recruitment');

const DUPLICATE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

async function createRecruitmentApplication(req, res) {
  try {
    const validated = validateRecruitmentPayload(req.body);
    if (validated.error) return res.status(400).json({ message: validated.error });

    const { consent, ...data } = validated.data;
    const duplicate = await RecruitmentApplication.findOne({
      email: data.email,
      role: data.role,
      status: { $in: ['submitted', 'reviewing', 'shortlisted', 'interview'] },
      createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    });
    if (duplicate) {
      return res.status(409).json({
        message: 'You already have an active application for this opportunity. We will contact you after review.',
      });
    }

    const application = await RecruitmentApplication.create({
      ...data,
      applicant: req.userId || null,
      consentAt: new Date(),
    });

    await sendRecruitmentNotification(application);
    res.status(201).json({
      application: {
        id: application._id,
        status: application.status,
        role: application.role,
        submittedAt: application.createdAt,
      },
      message: 'Your Work With Us application has been received.',
    });
  } catch (err) {
    console.error('Create recruitment application failed:', err);
    res.status(500).json({ message: 'Could not submit your application right now. Please try again.' });
  }
}

async function listMyRecruitmentApplications(req, res) {
  const applications = await RecruitmentApplication.find({ applicant: req.userId })
    .select('-adminNotes')
    .sort({ createdAt: -1 });
  res.json({ applications });
}

module.exports = { createRecruitmentApplication, listMyRecruitmentApplications };
