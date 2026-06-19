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

module.exports = { sendApplicationNotification };
