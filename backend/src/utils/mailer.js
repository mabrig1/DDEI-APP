const axios = require('axios');

async function sendApplicationNotification(application) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_NOTIFY_EMAIL) return;

  try {
    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Destiny Skills Bridge <onboarding@resend.dev>',
        to: [process.env.ADMIN_NOTIFY_EMAIL],
        subject: `New application: ${application.fullName} (${application.track})`,
        html: `
          <p><strong>${application.fullName}</strong> just applied to <strong>${application.track}</strong> (${application.tier}).</p>
          <ul>
            <li>Email: ${application.email}</li>
            <li>Phone: ${application.phone}</li>
            <li>Country: ${application.country}</li>
          </ul>
          <p><strong>Why they want to join:</strong><br>${application.motivation}</p>
        `,
      },
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
    );
  } catch (err) {
    console.error('Failed to send application notification email:', err.response?.data || err.message);
  }
}

async function sendRecruitmentNotification(application) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_NOTIFY_EMAIL) return;

  try {
    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Destiny Skills Bridge <onboarding@resend.dev>',
        to: [process.env.ADMIN_NOTIFY_EMAIL],
        subject: `New Work With Us application: ${escapeHtml(application.fullName)}`,
        html: `
          <p><strong>${escapeHtml(application.fullName)}</strong> applied for <strong>${escapeHtml(application.role)}</strong>.</p>
          <ul>
            <li>Email: ${escapeHtml(application.email)}</li>
            <li>Phone: ${escapeHtml(application.phone)}</li>
            <li>Location: ${escapeHtml(application.location)}</li>
            <li>Institution: ${escapeHtml(application.institution)}</li>
            <li>Availability: ${escapeHtml(application.availability)}</li>
            <li>Work preference: ${escapeHtml(application.workPreference)}</li>
          </ul>
          <p><strong>Skills:</strong><br>${escapeHtml(application.skills)}</p>
          <p><strong>Motivation:</strong><br>${escapeHtml(application.motivation)}</p>
          <p>Review this application in the Destiny Skills Bridge admin dashboard.</p>
        `,
      },
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
    );
  } catch (err) {
    console.error('Failed to send recruitment notification email:', err.response?.data || err.message);
  }
}

async function sendScholarshipEmail(application, level, tempPassword) {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const accessLine = level === 'full'
      ? "You've been awarded a <strong>Full Scholarship</strong> — every course plus the AI Advisor and AI Portfolio Builder are now unlocked for you, free."
      : "You've been awarded a <strong>Limited Scholarship</strong> — full access to all courses is now unlocked for you, free.";

    const credentialsBlock = tempPassword
      ? `<p>We created an account for you:</p>
         <ul><li>Email: ${application.email}</li><li>Temporary password: <strong>${tempPassword}</strong></li></ul>
         <p>Log in with these details to get started.</p>`
      : `<p>Log in with your existing Destiny Skills Bridge account (${application.email}) to access it.</p>`;

    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Destiny Skills Bridge <onboarding@resend.dev>',
        to: [application.email],
        subject: 'You have been awarded a Destiny Skills Bridge scholarship',
        html: `<p>Hi ${application.fullName},</p><p>${accessLine}</p>${credentialsBlock}`,
      },
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
    );
  } catch (err) {
    console.error('Failed to send scholarship notification email:', err.response?.data || err.message);
  }
}

async function sendPasswordResetEmail(user, resetUrl) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`RESEND_API_KEY not set — skipping password reset email. Reset URL for ${user.email}: ${resetUrl}`);
    return;
  }

  try {
    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Destiny Skills Bridge <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Reset your Destiny Skills Bridge password',
        html: `
          <p>Hi ${user.name},</p>
          <p>We received a request to reset your Destiny Skills Bridge password. Click below to choose a new one:</p>
          <p><a href="${resetUrl}" style="display:inline-block;background:#0A66C2;color:#fff;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;">Reset my password</a></p>
          <p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password will stay the same.</p>
        `,
      },
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
    );
  } catch (err) {
    console.error('Failed to send password reset email:', err.response?.data || err.message);
  }
}

async function sendCustomEmail(to, subject, message) {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: 'Email sending is not configured (RESEND_API_KEY is unset).' };
  }

  const html = `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  try {
    await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'Destiny Skills Bridge <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      },
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
    );
    return { ok: true };
  } catch (err) {
    console.error('Failed to send custom email:', err.response?.data || err.message);
    return { ok: false, error: err.response?.data?.message || err.message };
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = {
  sendApplicationNotification,
  sendRecruitmentNotification,
  sendScholarshipEmail,
  sendPasswordResetEmail,
  sendCustomEmail,
};
