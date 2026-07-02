const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
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
      from: `"Banking App" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
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
