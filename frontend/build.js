const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL || '';
const outDir = path.join(__dirname, 'dist');
const pages = ['index.html', 'admin.html', 'earn-online.html'];

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

console.log(`Built frontend/dist (${pages.join(', ')}) with API_BASE_URL=${apiBaseUrl || '(unset — defaults to http://localhost:5000)'}`);
