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
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  AUTH_SERVICE_URL: getEnvVar("AUTH_SERVICE_URL"),
  USER_SERVICE_URL: getEnvVar("USER_SERVICE_URL"),
  BOOK_SERVICE_URL: getEnvVar("BOOK_SERVICE_URL"),
  USER_BOOKS_SERVICE_URL: getEnvVar("USER_BOOKS_SERVICE_URL"),
} as const;

export default envVars;
