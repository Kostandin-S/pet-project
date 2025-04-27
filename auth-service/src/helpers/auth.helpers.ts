import bcryptjs from "bcryptjs";

import { ErrorMessages } from "../constants/errors";
import { User } from "../generated/prisma";
import * as userDal from "../repository/users.dal";
import { Profile } from "../requests/user-service/types";
import { NotAuthenticated, UnprocessableEntity } from "../utils/errors";

export const checkIfUserExistsByEmail = async (email: string) => {
  const user = await userDal.findUniqueUser({ email });

  if (!user) {
    throw new NotAuthenticated(ErrorMessages.INVALID_CREDENTIALS);
  }

  return user;
};

export const checkIfEmailAlreadyExists = async (email: string) => {
  const emailExists = await userDal.findUniqueUser({
    email: email.toLowerCase(),
  });

  if (emailExists) {
    throw new UnprocessableEntity(ErrorMessages.DUPLICATE_EMAIL);
  }
};

export const hashPassword = async (password: string) => {
  const salt: string = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

export const checkIfPasswordsMatch = async (
  userPassword: string,
  providedPassword: string
) => {
  const passwordsMatch = await bcryptjs.compare(providedPassword, userPassword);

  if (!passwordsMatch) {
    throw new NotAuthenticated(ErrorMessages.INVALID_CREDENTIALS);
  }
};

export const prepareUserData = (user: User, profile: Profile) => {
  const { id, email, isAdmin } = user;
  const { firstName, lastName } = profile;

  return {
    id,
    firstName,
    lastName,
    email,
    isAdmin,
    nickname: profile?.nickname,
    bio: profile?.bio,
  };
};

export const checkIfUserExists = async (id: string) => {
  const user = await userDal.findUniqueUser({ id });

  if (!user) {
    throw new NotAuthenticated(ErrorMessages.INVALID_SESSION);
  }

  return user;
};
