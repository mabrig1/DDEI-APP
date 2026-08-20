const INTRODUCTORY_COURSE_ID = 'digital-skills-foundations';
const ONLINE_COURSE_PRICE_NGN = 10000;
const HUMAN_ASSISTED_PRICE_NGN = 50000;
// Accounts created before the pricing rollout retain their existing access.
// Override only if the production rollout time changes before deployment.
const GRANDFATHER_CUTOFF = new Date(process.env.GRANDFATHER_CUTOFF || '2026-08-20T12:00:00.000Z');

function isIntroductoryCourse(courseId) {
  return courseId === INTRODUCTORY_COURSE_ID;
}

module.exports = {
  INTRODUCTORY_COURSE_ID,
  ONLINE_COURSE_PRICE_NGN,
  HUMAN_ASSISTED_PRICE_NGN,
  GRANDFATHER_CUTOFF,
  isIntroductoryCourse,
};
