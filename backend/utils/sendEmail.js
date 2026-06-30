import axios from "axios";

const sendEmail = async (to, subject, text) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CampusKart",
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        textContent: text,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("✅ Email Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Brevo API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default sendEmail;