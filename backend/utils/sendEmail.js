import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"CampusKart" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Mail sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ MAIL ERROR:", err);
    throw err;
  }
};

export default sendEmail;