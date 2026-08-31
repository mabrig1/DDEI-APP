const { cleanText, isValidEmail, normalizeEmail } = require('./validation');

const RECRUITMENT_ROLES = [
  'learning-support',
  'content-marketing',
  'web-development',
  'research-data',
  'community-success',
  'sales-partnerships',
];

const EDUCATION_LEVELS = ['secondary', 'undergraduate', 'graduate', 'postgraduate', 'other'];
const AVAILABILITY_OPTIONS = ['5-hours', '10-hours', '20-hours', 'flexible'];
const WORK_PREFERENCES = ['remote', 'onsite-nsukka', 'hybrid'];

function validHttpsUrl(value) {
  if (!value) return true;
  try {
    return new URL(value).protocol === 'https:';
  } catch (err) {
    return false;
  }
}

function validateRecruitmentPayload(body = {}) {
  const data = {
    fullName: cleanText(body.fullName, 120),
    email: normalizeEmail(body.email),
    phone: cleanText(body.phone, 40),
    location: cleanText(body.location, 120),
    educationLevel: cleanText(body.educationLevel, 32),
    institution: cleanText(body.institution, 180),
    role: cleanText(body.role, 64),
    skills: cleanText(body.skills, 2000),
    availability: cleanText(body.availability, 32),
    workPreference: cleanText(body.workPreference, 32),
    portfolioUrl: cleanText(body.portfolioUrl, 1000),
    motivation: cleanText(body.motivation, 5000),
    consent: body.consent === true,
  };

  if (!data.fullName || !data.email || !data.phone || !data.location || !data.educationLevel
      || !data.institution || !data.role || !data.skills || !data.availability
      || !data.workPreference || !data.motivation) {
    return { error: 'Complete every required field before submitting.' };
  }
  if (!isValidEmail(data.email)) return { error: 'Enter a valid email address.' };
  if (!/^[+\d][\d\s()-]{6,39}$/.test(data.phone)) return { error: 'Enter a valid phone or WhatsApp number.' };
  if (!RECRUITMENT_ROLES.includes(data.role)) return { error: 'Choose a valid opportunity track.' };
  if (!EDUCATION_LEVELS.includes(data.educationLevel)) return { error: 'Choose a valid education level.' };
  if (!AVAILABILITY_OPTIONS.includes(data.availability)) return { error: 'Choose your weekly availability.' };
  if (!WORK_PREFERENCES.includes(data.workPreference)) return { error: 'Choose a valid work preference.' };
  if (data.skills.length < 10) return { error: 'Tell us a little more about your current skills.' };
  if (data.motivation.length < 30) return { error: 'Your motivation should be at least 30 characters.' };
  if (!validHttpsUrl(data.portfolioUrl)) return { error: 'Portfolio link must be a valid https:// URL.' };
  if (!data.consent) return { error: 'Confirm that the information is accurate and may be reviewed for recruitment.' };

  return { data };
}

module.exports = {
  AVAILABILITY_OPTIONS,
  EDUCATION_LEVELS,
  RECRUITMENT_ROLES,
  WORK_PREFERENCES,
  validHttpsUrl,
  validateRecruitmentPayload,
};
