#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');

const API_BASE_URL = process.env.DSB_API_BASE_URL;
const API_KEY = process.env.CONTENT_API_KEY;

function usageAndExit() {
  console.error('Usage: node src/scripts/publishContent.js <path-to-content.json>');
  console.error('Requires env vars DSB_API_BASE_URL and CONTENT_API_KEY.');
  process.exit(1);
}

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, Object.assign({}, options, {
    headers: Object.assign({ 'Content-Type': 'application/json', 'X-Content-Api-Key': API_KEY }, options.headers || {}),
  }));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${res.status} ${data.message || 'Request failed'}`);
  }
  return data;
}

async function findBySlug(slug) {
  const { content } = await apiRequest('/api/content/admin/all');
  return (content || []).find((item) => item.slug === slug);
}

async function run() {
  const filePath = process.argv[2];
  if (!filePath) usageAndExit();
  if (!API_BASE_URL || !API_KEY) usageAndExit();

  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!payload.title || !payload.type || !payload.body) {
    console.error('Content JSON must include at least: title, type, body');
    process.exit(1);
  }

  const existing = payload.slug ? await findBySlug(payload.slug) : null;

  if (existing) {
    const { content } = await apiRequest(`/api/content/admin/${existing._id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    console.log(`Updated existing ${content.type} "${content.title}" (slug: ${content.slug}, status: ${content.status})`);
  } else {
    const { content } = await apiRequest('/api/content/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    console.log(`Created ${content.type} "${content.title}" (slug: ${content.slug}, status: ${content.status})`);
  }
}

run().catch((err) => {
  console.error('Publish failed:', err.message);
  process.exit(1);
});
