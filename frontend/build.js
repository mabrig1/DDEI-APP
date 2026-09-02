const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL || '';
const outDir = path.join(__dirname, 'dist');
const pages = ['index.html', 'admin.html', 'admin-recovery.html', 'earn-online.html', 'tools-vault.html', 'links.html', 'partners.html'];

const appwriteConfig = {
  endpoint: process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  projectId: process.env.APPWRITE_PROJECT_ID || '6a686f78003e74fe1826',
  databaseId: process.env.APPWRITE_DATABASE_ID || 'dsb-backup',
  enabled: process.env.APPWRITE_BACKUP_ENABLED !== 'false',
};

const RUNTIME_CONFIG_MARKER = '<!-- DSB_RUNTIME_CONFIG -->';
fs.mkdirSync(outDir, { recursive: true });

if (!apiBaseUrl) {
  console.warn('');
  console.warn('  ⚠  API_BASE_URL is not set for this build.');
  console.warn('     Pages will fall back to their built-in default API URL.');
  console.warn('');
}

const runtimeConfig = [
  '<script>',
  apiBaseUrl ? `        window.DSB_API_BASE_URL = ${JSON.stringify(apiBaseUrl)};` : null,
  `        window.DSB_APPWRITE = ${JSON.stringify(appwriteConfig)};`,
  '    </script>',
].filter(Boolean).join('\n    ');

function improveHomepage(html) {
  const sponsorPattern = /\n\s*<!-- Fund impact \/ international partnerships -->[\s\S]*?<\/section>\s*/;
  const sponsorMatch = html.match(sponsorPattern);
  const sponsorship = sponsorMatch ? sponsorMatch[0].trim() : '';
  if (sponsorship) html = html.replace(sponsorPattern, '\n');

  html = html.replace(/\n\s*<!-- Earn Online Now teaser[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- Opportunity Matching -->)/, '\n\n    ');

  html = html
    .replace('Global Platform • Built for African Youth', '100% FREE DIGITAL SKILLS TRAINING • BUILT FOR AFRICAN YOUTH')
    .replace('Global Skills.<br>\n                    <span class="text-[#60A5FA]">Dollar Opportunities.</span><br>\n                    African Futures.', 'Learn a Digital Skill.<br>\n                    <span class="text-[#60A5FA]">Build Real Projects.</span><br>\n                    Create Your Future.')
    .replace(/We bridge the gap between African youth and global economic opportunity — learn in-demand digital\s*skills, build an AI-powered international portfolio, and get matched to freelance gigs and remote\s*jobs that pay in dollars\./, 'Start from beginner level and learn practical digital skills at your own pace. Complete real lessons, build projects, track your progress, and prepare for freelance, remote-work and entrepreneurial opportunities.')
    .replace('Start Learning Free <i class="fa-solid fa-arrow-right ml-2"></i>', 'Start Free Training <i class="fa-solid fa-arrow-right ml-2"></i>');

  html = html.replace(
    '    <!-- Skills Section -->',
    `    <section class="bg-white border-b">\n        <div class="max-w-screen-xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-semibold text-slate-700">\n            <div>✓ Beginner Friendly</div><div>✓ Learn at Your Pace</div><div>✓ Practical Projects</div><div>✓ Progress Tracking</div>\n        </div>\n    </section>\n\n    <!-- Skills Section -->`
  );

  if (sponsorship) html = html.replace('    <!-- Footer -->', `    ${sponsorship}\n\n    <!-- Footer -->`);

  html = html.replace(
    '<p class="mt-2 text-xs text-slate-400">Developed and operated by <strong class="font-semibold text-slate-500">Mabrig Technologies LTD</strong></p>',
    '<p class="mt-2 text-xs text-slate-400">App powered by <strong class="font-semibold text-slate-600">MABRIG Technologies</strong></p>'
  );

  html = html.replace('</style>', `        html, body { max-width: 100%; overflow-x: hidden; }\n        img, video, iframe { max-width: 100%; }\n        @media (max-width: 767px) {\n            h1 { font-size: 2.65rem !important; line-height: 1.05 !important; }\n            h2 { font-size: 2rem !important; line-height: 1.15 !important; }\n            nav > div { padding-left: 1rem !important; padding-right: 1rem !important; }\n            nav .font-display { font-size: 1.15rem !important; }\n            nav .gap-x-3 { gap: .45rem !important; }\n            #navAuthBtn { padding: .6rem .8rem !important; }\n            nav button:last-child { padding: .6rem .8rem !important; }\n            #partners { padding-top: 3rem !important; padding-bottom: 3rem !important; }\n        }\n    </style>`);

  return html;
}

function injectPromoterTracking(html) {
  if (html.includes('promoter-referral.js')) return html;
  const script = '    <script src="/promoter-referral.js" defer></script>\n';
  return html.includes('</head>') ? html.replace('</head>', `${script}</head>`) : `${script}${html}`;
}

for (const page of pages) {
  const srcPath = path.join(__dirname, page);
  let html = fs.readFileSync(srcPath, 'utf8');

  if (page === 'index.html') html = improveHomepage(html);
  html = injectPromoterTracking(html);

  if (html.includes(RUNTIME_CONFIG_MARKER)) {
    html = html.replace(RUNTIME_CONFIG_MARKER, runtimeConfig);
  } else if (apiBaseUrl) {
    console.warn(`${page}: no ${RUNTIME_CONFIG_MARKER} marker found, skipping runtime config injection.`);
  }

  fs.writeFileSync(path.join(outDir, page), html);
}

fs.copyFileSync(path.join(__dirname, 'dsb-backup.js'), path.join(outDir, 'dsb-backup.js'));
fs.copyFileSync(path.join(__dirname, 'promoter-referral.js'), path.join(outDir, 'promoter-referral.js'));

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
    const { COURSES } = require('../backend/src/data/courseCatalog.js');
    for (const course of COURSES) links[course.slug || course.id] = course.id;
  } catch (err) {
    console.warn('Full course list unavailable at build time; generating alias links only:', err.message);
  }

  for (const [slug, courseId] of Object.entries(links)) {
    const stub = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Destiny Skills Bridge — Course</title>\n    <script>\n        var extra = window.location.search.replace(/^\\?/, '');\n        window.location.replace('/?course=${courseId}' + (extra ? '&' + extra : ''));\n    <\/script>\n    <meta http-equiv="refresh" content="0;url=/?course=${courseId}">\n</head>\n<body>Taking you to the course…</body>\n</html>\n`;
    fs.writeFileSync(path.join(courseDir, `${slug}.html`), stub);
    courseLinkCount += 1;
  }
}

console.log(`Built frontend/dist (${pages.join(', ')} + dsb-backup.js + promoter-referral.js + ${courseLinkCount} course links) with API_BASE_URL=${apiBaseUrl || '(unset — built-in production fallback)'}`);
console.log(`Appwrite backup failover: ${appwriteConfig.enabled ? 'enabled' : 'disabled'} (project ${appwriteConfig.projectId}, ${appwriteConfig.endpoint})`);
