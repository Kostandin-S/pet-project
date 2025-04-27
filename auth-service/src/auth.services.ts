import { Request } from "express";

import {
  CreateProfileParams,
  CreateUserParams,
  LoginUserReqBody,
  RegisterUserReqBody,
} from "./auth.types";
import {
  validateRegisterUserRequest,
  validateUserLoginRequest,
} from "./auth.validator";
import { ErrorMessages } from "./constants/errors";
import {
  checkIfEmailAlreadyExists,
  checkIfPasswordsMatch,
  checkIfUserExists,
  checkIfUserExistsByEmail,
  hashPassword,
  prepareUserData,
} from "./helpers/auth.helpers";
import * as userDal from "./repository/users.dal";
import { createProfile } from "./requests/user-service/requests";
import { NotAuthenticated } from "./utils/errors";

export const registerUser = async (reqBody: RegisterUserReqBody) => {
  validateRegisterUserRequest(reqBody);

  const { firstName, lastName, email, password } = reqBody;

  await checkIfEmailAlreadyExists(email);

  const hashedPassword = await hashPassword(password);
  const newUserBody: CreateUserParams = {
    email: email.toLowerCase(),
    password: hashedPassword,
    isAdmin: false,
  };

  const user = await userDal.createUser({ ...newUserBody });

  const newProfileBody: CreateProfileParams = {
    userId: user.id,
    firstName,
    lastName,
    nickname: reqBody?.nickname,
    bio: reqBody?.bio,
  };

  const profile = await createProfile(newProfileBody);

  return prepareUserData(user, profile);
};

export const loginUser = async (reqBody: LoginUserReqBody) => {
  validateUserLoginRequest(reqBody);
  const userData = await checkIfUserExistsByEmail(reqBody.email);

  await checkIfPasswordsMatch(userData.password, reqBody.password);

  return userData;
};

export const logoutUser = async (req: Request) =>
  new Promise<void>((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) return reject(error);
      resolve();
    });
  });

export const validateSession = async (req: Request) => {
  if (!req.session || !req.session?.userId) {
    throw new NotAuthenticated(ErrorMessages.INVALID_SESSION);
  }

  const user = await checkIfUserExists(req.session.userId);

  if (user.isAdmin !== req.session?.isAdmin) {
    throw new NotAuthenticated(ErrorMessages.INVALID_SESSION);
  }

  return user;
};
