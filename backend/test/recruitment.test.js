const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validHttpsUrl,
  validateRecruitmentPayload,
} = require('../src/utils/recruitment');

const validPayload = {
  fullName: 'Ada Okafor',
  email: 'ADA@example.com',
  phone: '+234 801 234 5678',
  location: 'Nsukka, Enugu',
  educationLevel: 'undergraduate',
  institution: 'University of Nigeria, Nsukka',
  role: 'web-development',
  skills: 'HTML, CSS, JavaScript and GitHub collaboration',
  availability: '10-hours',
  workPreference: 'hybrid',
  portfolioUrl: 'https://github.com/ada-example',
  motivation: 'I want to build practical products while developing professional teamwork experience.',
  consent: true,
};

test('accepts and normalizes a complete recruitment application', () => {
  const result = validateRecruitmentPayload(validPayload);
  assert.equal(result.error, undefined);
  assert.equal(result.data.email, 'ada@example.com');
  assert.equal(result.data.role, 'web-development');
});

test('rejects unknown roles and work options', () => {
  assert.match(validateRecruitmentPayload({ ...validPayload, role: 'chief-executive' }).error, /valid opportunity/);
  assert.match(validateRecruitmentPayload({ ...validPayload, workPreference: 'anywhere' }).error, /work preference/);
});

test('requires meaningful skills, motivation, and consent', () => {
  assert.match(validateRecruitmentPayload({ ...validPayload, skills: 'HTML' }).error, /current skills/);
  assert.match(validateRecruitmentPayload({ ...validPayload, motivation: 'I need work.' }).error, /30 characters/);
  assert.match(validateRecruitmentPayload({ ...validPayload, consent: false }).error, /Confirm/);
});

test('allows only secure portfolio links', () => {
  assert.equal(validHttpsUrl('https://example.com/work'), true);
  assert.equal(validHttpsUrl('javascript:alert(1)'), false);
  assert.equal(validHttpsUrl('http://example.com/work'), false);
  assert.equal(validHttpsUrl(''), true);
});
