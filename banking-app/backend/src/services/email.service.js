const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Uses your 16-character app password
  },
});

// Add this verification block below it to test the connection immediately
transporter.verify((error, success) => {
  if (error) {
    console.error("Email server configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});


// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
    console.error(error.response);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Email failed but ignored:", error.message);
    return null; // ✅ IMPORTANT
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = `Welcome to Banking App, ${name}! 🎉`;

  const text = `Hi ${name},\n\nThank you for registering. Your banking account has been successfully created. Welcome aboard!\n\nBest regards,\nBanking App Team`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4CAF50;">Welcome to Banking App, ${name}! 🎉</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for registering. Your banking account has been successfully created. Welcome aboard!</p>
      <br />
      <p>Best regards,<br /><strong>Banking App Team</strong></p>
    </div>
  `;
  await sendEmail(userEmail, subject, text, html);
}
async function sendTransactionEmail(userEmail, name, subject, textMessage) {
  const subjectLine = `${subject}`;

  const text = `Hi ${name},\n\n${textMessage}\n\nBest regards,\nBanking App Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #2196F3;">${subject} 🎉</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>${textMessage}</p>
      <br />
      <p>Best regards,<br /><strong>Banking App Team</strong></p>
    </div>
  `;
  await sendEmail(userEmail, subjectLine, text, html);
}
async function sendTransactionFailureEmail(
  userEmail,
  name,
  subject,
  textMessage,
) {
  const subjectLine = `${subject}`;

  const text = `Hi ${name},\n\n${textMessage}\n\nBest regards,\nBanking App Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #F44336;">${subject} ❌</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>${textMessage}</p>
      <br />
      <p>Best regards,<br /><strong>Banking App Team</strong></p>
    </div>
  `;
  await sendEmail(userEmail, subjectLine, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
