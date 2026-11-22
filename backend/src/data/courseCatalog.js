const { COURSES: CORE_COURSES } = require('./courses');
const { AI_MONETIZATION_COURSES } = require('./aiMonetizationCourses');

const { CYBERSECURITY_FUTURE_COURSE } = require('./cybersecurityFutureCourse');

const COURSES = [...CORE_COURSES, ...AI_MONETIZATION_COURSES, CYBERSECURITY_FUTURE_COURSE];

module.exports = { COURSES };
