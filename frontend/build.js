const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL || '';
const outDir = path.join(__dirname, 'dist');
const pages = ['index.html', 'admin.html', 'earn-online.html', 'tools-vault.html', 'grants.html', 'links.html'];

// ── Appwrite backup backend ──
// Read-only failover for the public pages when the primary API is unreachable.
// Console: https://cloud.appwrite.io/console/project-fra-6a686f78003e74fe1826
// (path is project-<region>-<projectId>; the ID is Appwrite-generated —
// "destiny-skills-bridge" is just the display name and the API rejects it)
// Only public identifiers are baked in here — the Appwrite API key stays on the
// server. Set APPWRITE_BACKUP_ENABLED=false at build time to ship the pages with
// failover switched off.
const appwriteConfig = {
  endpoint: process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  projectId: process.env.APPWRITE_PROJECT_ID || '6a686f78003e74fe1826',
  databaseId: process.env.APPWRITE_DATABASE_ID || 'dsb-backup',
  enabled: process.env.APPWRITE_BACKUP_ENABLED !== 'false',
};

// Replaces the <!-- DSB_RUNTIME_CONFIG --> marker in each page. The marker sits
// above the backup script tag so the config is defined before it runs.
const RUNTIME_CONFIG_MARKER = '<!-- DSB_RUNTIME_CONFIG -->';

fs.mkdirSync(outDir, { recursive: true });

// A missing API_BASE_URL used to sail through silently and leave every page
// resolving to its localhost default — a deployed site quietly calling the
// developer's own machine. Say so loudly in the build log instead.
if (!apiBaseUrl) {
  console.warn('');
  console.warn('  ⚠  API_BASE_URL is not set for this build.');
  console.warn('     Pages will fall back to their built-in default API URL.');
  console.warn('     On Vercel: Settings -> Environment Variables. Note that a variable');
  console.warn('     marked "Sensitive" is withheld from the build, so this one must be');
  console.warn('     a plain (non-sensitive) variable to take effect.');
  console.warn('');
}

const runtimeConfig = [
  '<script>',
  apiBaseUrl ? `        window.DSB_API_BASE_URL = ${JSON.stringify(apiBaseUrl)};` : null,
  `        window.DSB_APPWRITE = ${JSON.stringify(appwriteConfig)};`,
  '    </script>',
].filter(Boolean).join('\n    ');

for (const page of pages) {
  const srcPath = path.join(__dirname, page);
  let html = fs.readFileSync(srcPath, 'utf8');

  if (html.includes(RUNTIME_CONFIG_MARKER)) {
    html = html.replace(RUNTIME_CONFIG_MARKER, runtimeConfig);
  } else if (apiBaseUrl) {
    // links.html has no API layer, so it carries no marker — nothing to inject.
    console.warn(`${page}: no ${RUNTIME_CONFIG_MARKER} marker found, skipping runtime config injection.`);
  }

  fs.writeFileSync(path.join(outDir, page), html);
}

// The failover client is loaded by <script src="/dsb-backup.js"> on the public
// pages, so it has to land in dist alongside them.
fs.copyFileSync(path.join(__dirname, 'dsb-backup.js'), path.join(outDir, 'dsb-backup.js'));

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

console.log(`Built frontend/dist (${pages.join(', ')} + dsb-backup.js + ${courseLinkCount} course links) with API_BASE_URL=${apiBaseUrl || '(unset — defaults to http://localhost:5000)'}`);
console.log(`Appwrite backup failover: ${appwriteConfig.enabled ? 'enabled' : 'disabled'} (project ${appwriteConfig.projectId}, ${appwriteConfig.endpoint})`);
