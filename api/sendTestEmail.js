import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Block Mind AI" <${process.env.MAIL_USER}>`,
      to: "chadddehler@gmail.com",
      subject: "Test Email from Block Mind AI",
      text: "If you get this, Nodemailer is working!",
    });
    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("Error sending test email:", err);
  }
}

testEmail();
