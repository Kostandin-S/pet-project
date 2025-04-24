import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  QUEUE_BOOKS_RECOMMENDATIONS: process.env.QUEUE_BOOKS_RECOMMENDATIONS,
};
