const { COURSES: CORE_COURSES } = require('./courses');
const { AI_MONETIZATION_COURSES } = require('./aiMonetizationCourses');

const { CYBERSECURITY_FUTURE_COURSE } = require('./cybersecurityFutureCourse');

// Keep the newest flagship cybersecurity programme first in discovery results.
// Existing course IDs and access rules remain unchanged.
const COURSES = [CYBERSECURITY_FUTURE_COURSE, ...CORE_COURSES, ...AI_MONETIZATION_COURSES];

module.exports = { COURSES };
