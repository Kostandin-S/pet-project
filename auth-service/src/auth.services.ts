import { Request } from 'express';

import {
  CreateProfileParams,
  CreateUserParams,
  LoginUserReqBody,
  RegisterUserReqBody,
} from './auth.types';
import {
  validateRegisterUserRequest,
  validateUserLoginRequest,
} from './auth.validator';
import logger from './config/logger';
import { ErrorMessages } from './constants/errors';
import {
  checkIfEmailAlreadyExists,
  checkIfPasswordsMatch,
  checkIfUserExists,
  checkIfUserExistsByEmail,
  hashPassword,
  prepareUserData,
} from './helpers/auth.helpers';
import * as userDal from './repository/users.dal';
import { createProfile } from './requests/user-service/requests';
import { NotAuthenticated } from './utils/errors';

export const registerUser = async (reqBody: RegisterUserReqBody) => {
  validateRegisterUserRequest(reqBody);
  logger.info("Register request successfully validated");

  const { firstName, lastName, email, password } = reqBody;
  logger.info(`Attempting to register user with email=${email}`);

  await checkIfEmailAlreadyExists(email);
  logger.info(`Email check passed: ${email} does not already exist`);

  const hashedPassword = await hashPassword(password);
  logger.info("Password successfully hashed");

  const newUserBody: CreateUserParams = {
    email: email.toLowerCase(),
    password: hashedPassword,
    isAdmin: false,
  };

  const user = await userDal.createUser(newUserBody);
  logger.info(`User created in database: userId=${user.id}`);

  const newProfileBody: CreateProfileParams = {
    userId: user.id,
    firstName,
    lastName,
    nickname: reqBody?.nickname,
    bio: reqBody?.bio,
  };

  const profile = await createProfile(newProfileBody);
  logger.info(`Profile created for userId=${user.id}`);

  logger.info(`User registration completed: userId=${user.id}, email=${email}`);

  return prepareUserData(user, profile);
};

export const loginUser = async (reqBody: LoginUserReqBody) => {
  validateUserLoginRequest(reqBody);
  logger.info("Login request successfully validated");

  logger.info(`Attempting login for email=${reqBody.email}`);

  const userData = await checkIfUserExistsByEmail(reqBody.email);
  logger.info(`User found for email=${reqBody.email}`);

  await checkIfPasswordsMatch(userData.password, reqBody.password);
  logger.info(`Password match successful for userId=${userData.id}`);

  logger.info(`User login successful: userId=${userData.id}`);

  return userData;
};

export const logoutUser = async (req: Request) =>
  new Promise<void>((resolve, reject) => {
    const userId = req.session?.userId;
    req.session.destroy((error) => {
      if (error) {
        logger.error(`Failed to log out userId=${userId}: ${error.message}`);
        return reject(error);
      }
      logger.info(`User successfully logged out: userId=${userId}`);
      resolve();
    });
  });

export const validateSession = async (req: Request) => {
  if (!req.session || !req.session?.userId) {
    logger.warn("Session validation failed: No session or userId");
    throw new NotAuthenticated(ErrorMessages.INVALID_SESSION);
  }

  const user = await checkIfUserExists(req.session.userId);
  logger.info(`Session user found: userId=${user.id}`);

  if (user.isAdmin !== req.session?.isAdmin) {
    logger.warn(`Session role mismatch: userId=${user.id}`);
    throw new NotAuthenticated(ErrorMessages.INVALID_SESSION);
  }

  logger.info(`Session validated successfully: userId=${user.id}`);

  return user;
};
