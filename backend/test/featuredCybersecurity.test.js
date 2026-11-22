const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { COURSES } = require('../src/data/courseCatalog');
const CYBER = 'cyber-security-of-the-future';
const site = fs.readFileSync(path.join(__dirname, '../../frontend/index.html'), 'utf8');
const lab = fs.readFileSync(path.join(__dirname, '../../frontend/cybersecurity-future.html'), 'utf8');

test('Cyber Security of the Future is first in DDEI public course catalogue', () => {
  assert.equal(COURSES[0]?.id, CYBER);
  assert.equal(COURSES.filter(course => course.id === CYBER).length, 1);
  assert.equal(COURSES[0].modules.length, 9);
  assert.ok(COURSES[0].modules.every(module => module.lessons.length >= 3));
});

test('the featured course is the first DDEI homepage promotion on mobile and desktop', () => {
  const featureIndex = site.indexOf('id="cybersecurity-featured"');
  assert.ok(featureIndex > 0);
  assert.ok(featureIndex < site.indexOf('<!-- Hero -->'), 'Featured cybersecurity course must precede general hero');
  assert.ok(featureIndex < site.indexOf('<!-- Interactive Courses -->'), 'Promotion must precede general course listings');
  assert.match(site, /data-featured-course="cyber-security-of-the-future"/);
  assert.match(site, /#1 Featured Course/);
  assert.match(site, /href="#cybersecurity-featured"/);
  assert.match(site, /class="flex flex-col lg:flex-row/);
});

test('links distinguish free DDEI demonstrations from independent AI University purchase', () => {
  assert.match(site, /href="\/cybersecurity-future"/);
  assert.match(site, /href="\/cybersecurity-labs"/);
  assert.match(site, /href="https:\/\/aiuniversity\.mabrigkorie\.org\/cybersecurity\/"/);
  assert.match(site, /Purchase and paid access are managed by AI University, not DDEI/);
  assert.match(site, /Enrol for ₦30,000/);
  assert.match(site, /One-time payment/);
  assert.ok(!/href="https:\/\/checkout\.paystack\.com\//.test(site),'Never embed a static Paystack payment URL in DDEI');
});

test('DDEI still permits course-list pinning without altering account entitlements', () => {
  assert.match(site, /cachedCourses = Array\.isArray\(data\.courses\)/);
  assert.match(site, /b\.id === 'cyber-security-of-the-future'/);
  assert.match(site, /a\.id === 'cyber-security-of-the-future'/);
  assert.match(lab, /FREE PRACTICE LAB · NO ACCOUNT NEEDED/);
});
