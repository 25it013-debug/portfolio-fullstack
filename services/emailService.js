const nodemailer = require('nodemailer');

// Initialize transporter using SMTP environment variables or fallback test account
const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_USER !== 'mock_user@ethereal.email') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Generate test SMTP service on Ethereal or return mock logger transporter
    console.log('[Email Service] Using Ethereal / Development mock mail transport.');
    return {
      sendMail: async (mailOptions) => {
        console.log('--------------------------------------------------');
        console.log('[Mock Email Sent Successfully]');
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body:\n${mailOptions.text}`);
        console.log('--------------------------------------------------');
        return { messageId: `mock-${Date.now()}` };
      }
    };
  }
};

const sendContactNotification = async ({ name, email, subject, message }) => {
  try {
    const transporter = await createTransporter();
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'portfolio_owner@example.com';

    const mailOptions = {
      from: `"Portfolio Contact Form" <noreply@portfolio.com>`,
      to: receiver,
      replyTo: email,
      subject: `New Portfolio Inquiry: ${subject}`,
      text: `You have received a new contact message from your portfolio website:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f8;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e1e4e8;">
            <h2 style="color: #4f46e5; margin-top: 0;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Notification processed. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Service Error]', error.message);
    // Return graceful status without crashing request
    return { success: false, error: error.message };
  }
};

module.exports = { sendContactNotification };
