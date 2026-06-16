const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL || '';
const srcPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const outPath = path.join(outDir, 'index.html');

let html = fs.readFileSync(srcPath, 'utf8');

if (apiBaseUrl) {
  const inject = `<script>window.DSB_API_BASE_URL = ${JSON.stringify(apiBaseUrl)};</script>\n    `;
  html = html.replace('<script>\n        const API_BASE_URL', `${inject}<script>\n        const API_BASE_URL`);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);
console.log(`Built frontend/dist/index.html with API_BASE_URL=${apiBaseUrl || '(unset — defaults to http://localhost:5000)'}`);
