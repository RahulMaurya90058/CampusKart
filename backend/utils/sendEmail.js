import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4, // Force IPv4

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    // SMTP verify
    await transporter.verify();
    console.log("SMTP Connected");

    // Send mail
    const info = await transporter.sendMail({
      from: `"CampusKart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email Error:", error);

    // Error ko signup controller tak bhejo
    throw error;
  }
};

export default sendEmail;