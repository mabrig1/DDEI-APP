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

module.exports = { sendApplicationNotification, sendScholarshipEmail };
