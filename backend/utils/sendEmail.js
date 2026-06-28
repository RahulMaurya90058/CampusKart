import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // await transporter.verify();

  return await transporter.sendMail({
    from: `"CampusKart" <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;