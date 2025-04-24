import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  QUEUE_BOOKS_RECOMMENDATIONS: process.env.QUEUE_BOOKS_RECOMMENDATIONS,
  MAILTRAP_HOST: process.env.MAILTRAP_HOST,
  MAILTRAP_PORT: process.env.MAILTRAP_PORT,
  MAILTRAP_USER: process.env.MAILTRAP_USER,
  MAILTRAP_PASS: process.env.MAILTRAP_PASS,
};
