import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import envVars from "../constants/env-vars";

const transporter = nodemailer.createTransport({
  host: envVars.MAILTRAP_HOST,
  port: Number(envVars.MAILTRAP_PORT),
  secure: false,
  auth: {
    user: envVars.MAILTRAP_USER,
    pass: envVars.MAILTRAP_PASS,
  },
} as SMTPTransport.Options);

// TODO: Improve this function
// TODO: Make it fancy with HTML and CSS
export const sendBookRecommendationsEmail = async (
  to: string,
  genre: string,
  books: string[]
) => {
  const bookList = books.map((book, idx) => `${idx + 1}. ${book}`).join("\n");

  const mailOptions = {
    from: "hello@demomailtrap.co",
    to,
    subject: `You've just finished a book! Here are more ${genre} recommendations`,
    text: `Hi there!\n\nSince you just finished a ${genre} book, here are a few more you might love:\n\n${bookList}\n\nHappy reading!\n- The BookMate Team`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Recommendation email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending recommendation email:", error);
    throw error;
  }
};
