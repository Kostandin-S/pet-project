import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  PORT: process.env.PORT,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  BOOK_SERVICE_URL: process.env.BOOK_SERVICE_URL,
  USER_BOOKS_SERVICE_URL: process.env.USER_BOOKS_SERVICE_URL,
};
