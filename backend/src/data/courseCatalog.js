const { COURSES: CORE_COURSES } = require('./courses');
const { AI_MONETIZATION_COURSES } = require('./aiMonetizationCourses');

const COURSES = [...CORE_COURSES, ...AI_MONETIZATION_COURSES];

module.exports = { COURSES };
