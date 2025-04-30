import dotenv from 'dotenv';

import { InternalServerError } from '../utils/errors';
import { ErrorMessages } from './errors';

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
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  RABBITMQ_URL: getEnvVar("RABBITMQ_URL"),
  QUEUE_USER_DELETED: getEnvVar("QUEUE_USER_DELETED"),
} as const;

export default envVars;
