require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  try {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;

    if (!host || !port || !user || !pass) {
      console.error('Missing SMTP env vars. Check .env');
      process.exit(1);
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

    const info = await transporter.sendMail({
      from: `Test <${user}>`,
      to,
      subject: 'DBS – Test Email',
      text: 'This is a test email sent from the Diamond Bidding System test script.',
    });

    console.log('Message sent:', info.messageId);
    console.log('Response:', info.response || info);
    process.exit(0);
  } catch (err) {
    console.error('Email test failed:', err);
    process.exit(2);
  }
})();
