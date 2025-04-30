import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import envVars from '../constants/env-vars';

const transporter = nodemailer.createTransport({
  host: envVars.MAILTRAP_HOST,
  port: Number(envVars.MAILTRAP_PORT),
  secure: false,
  auth: {
    user: envVars.MAILTRAP_USER,
    pass: envVars.MAILTRAP_PASS,
  },
} as SMTPTransport.Options);

export const sendBookRecommendationsEmail = async (
  to: string,
  genre: string,
  books: string[]
) => {
  const bookListText = books
    .map((book, idx) => `${idx + 1}. ${book}`)
    .join("\n");

  const bookListHTML = books
    .map((book, idx) => `<li><strong>${idx + 1}.</strong> ${book}</li>`)
    .join("");

  const mailOptions = {
    from: '"BookMate" <hello@demomailtrap.co>',
    to,
    subject: `You've just finished a book! Here are more ${genre} recommendations`,
    text: `Hi there!\n\nSince you just finished a ${genre} book, here are a few more you might love:\n\n${bookListText}\n\nHappy reading!\n- The BookMate Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hi there!</h2>
        <p>Since you just finished a <strong>${genre}</strong> book, here are a few more you might love:</p>
        <ul>
          ${bookListHTML}
        </ul>
        <p>Happy reading! 📚<br><strong>- The BookMate Team</strong></p>
      </div>
    `,
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
