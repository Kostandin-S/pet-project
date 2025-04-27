import dotenv from "dotenv";

import { InternalServerError } from "../utils/errors";
import { ErrorMessages } from "./errors";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new InternalServerError(`${ErrorMessages.ENV_VARS_MISSING}: ${key}`);
  }
  return value;
};

const envVars = {
  PORT: getEnvVar("PORT"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  BOOK_SERVICE_URL: getEnvVar("BOOK_SERVICE_URL"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  RABBITMQ_URL: getEnvVar("RABBITMQ_URL"),
  QUEUE_BOOK_UPDATED: getEnvVar("QUEUE_BOOK_UPDATED"),
  QUEUE_BOOKS_RECOMMENDATIONS: getEnvVar("QUEUE_BOOKS_RECOMMENDATIONS"),
} as const;

export default envVars;
