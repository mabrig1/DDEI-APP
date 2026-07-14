const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL || '';
const outDir = path.join(__dirname, 'dist');
const pages = ['index.html', 'admin.html', 'earn-online.html', 'tools-vault.html', 'links.html'];

fs.mkdirSync(outDir, { recursive: true });

for (const page of pages) {
  const srcPath = path.join(__dirname, page);
  let html = fs.readFileSync(srcPath, 'utf8');

  if (apiBaseUrl) {
    const inject = `<script>window.DSB_API_BASE_URL = ${JSON.stringify(apiBaseUrl)};</script>\n    `;
    html = html.replace('<script>\n        const API_BASE_URL', `${inject}<script>\n        const API_BASE_URL`);
  }

  fs.writeFileSync(path.join(outDir, page), html);
}

// ── Direct course links ──
// Generate a real static stub for every /course/<slug> URL. With cleanUrls,
// dist/course/<slug>.html serves at /course/<slug>; each stub redirects to
// /?course=<courseId> (preserving extra params like enroll=1), which the
// homepage resolves to scroll/highlight/enroll. Real files beat rewrite
// edge-cases on every static host.
const COURSE_LINK_ALIASES = {
  'ai-video': 'ai-cinematic-special-edition',
  'ai-video-mastery': 'ai-cinematic-special-edition',
  'prompt-engineering': 'mastering-prompt-engineering',
  'web3': 'web3-master-class',
  'entrepreneurship': 'entrepreneurship-mastery',
  'ai-tools': 'ai-tools-automation-mastery',
};

let courseLinkCount = 0;
{
  const courseDir = path.join(outDir, 'course');
  fs.mkdirSync(courseDir, { recursive: true });

  const links = { ...COURSE_LINK_ALIASES };
  try {
    const { COURSES } = require('../backend/src/data/courses.js');
    for (const course of COURSES) {
      links[course.slug || course.id] = course.id;
    }
  } catch (err) {
    console.warn('Full course list unavailable at build time; generating alias links only:', err.message);
  }

  for (const [slug, courseId] of Object.entries(links)) {
    const stub = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Destiny Skills Bridge — Course</title>
    <script>
        var extra = window.location.search.replace(/^\\?/, '');
        window.location.replace('/?course=${courseId}' + (extra ? '&' + extra : ''));
    </script>
    <meta http-equiv="refresh" content="0;url=/?course=${courseId}">
</head>
<body>Taking you to the course…</body>
</html>
`;
    fs.writeFileSync(path.join(courseDir, `${slug}.html`), stub);
    courseLinkCount += 1;
  }
}

console.log(`Built frontend/dist (${pages.join(', ')} + ${courseLinkCount} course links) with API_BASE_URL=${apiBaseUrl || '(unset — defaults to http://localhost:5000)'}`);
