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
  RABBITMQ_URL: getEnvVar("RABBITMQ_URL"),
  QUEUE_BOOKS_RECOMMENDATIONS: getEnvVar("QUEUE_BOOKS_RECOMMENDATIONS"),
  MAILTRAP_HOST: getEnvVar("MAILTRAP_HOST"),
  MAILTRAP_PORT: getEnvVar("MAILTRAP_PORT"),
  MAILTRAP_USER: getEnvVar("MAILTRAP_USER"),
  MAILTRAP_PASS: getEnvVar("MAILTRAP_PASS"),
} as const;

export default envVars;
