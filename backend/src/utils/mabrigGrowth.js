const crypto = require('crypto');

function endpoint() {
  const base = String(process.env.MABRIG_GROWTH_BASE_URL || '').trim().replace(/\/$/, '');
  return base ? `${base}/api/conversions/generic` : '';
}

function configured() {
  return Boolean(endpoint() && process.env.MABRIG_GROWTH_SHARED_SECRET);
}

async function reportMabrigConversion(payload) {
  const url = endpoint();
  const secret = String(process.env.MABRIG_GROWTH_SHARED_SECRET || '').trim();
  if (!url || !secret) return { reported: false, reason: 'not-configured' };

  const body = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-mabrig-signature': signature,
      },
      body,
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.warn('MABRIG Growth conversion report rejected:', response.status, detail.slice(0, 300));
      return { reported: false, reason: 'remote-rejected' };
    }

    return { reported: true };
  } catch (err) {
    console.warn('MABRIG Growth conversion report failed:', err.message);
    return { reported: false, reason: 'network-error' };
  }
}

module.exports = { configured, reportMabrigConversion };
