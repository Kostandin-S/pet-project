import logger from './config/logger';
import envVars from './constants/env-vars';
import { checkIfUserExistsById } from './helpers/users.helpers';
import { publishUserDeleted } from './queues/publisher';
import * as dal from './repositories/profile.dal';
import {
  RegisterUserReqBody,
  UpdateUserRequestBody,
} from './users.types';
import { validateUpdateUserRequestBody } from './users.validator';

export const getUsers = async () => {
  logger.info("Fetching all user profiles");

  const users = await dal.getProfiles({});
  logger.info(`Found ${users.length} user profiles`);

  return users;
};

export const getUserById = async (id: string) => {
  logger.info(`Fetching user profile with ID: ${id}`);

  const user = await checkIfUserExistsById(id);
  logger.info(`Found user profile with ID: ${id}`);

  return user;
};

export const createUser = async (reqBody: RegisterUserReqBody) => {
  logger.info(`Creating user with the following body: ${reqBody}`);

  const newUser = await dal.createProfile({ ...reqBody });
  logger.info(`User created with ID: ${newUser.id}`);

  return newUser;
};

export const updateUser = async (
  id: string,
  reqBody: UpdateUserRequestBody
) => {
  logger.info(`Updating user profile with ID: ${id}`);

  const user = await checkIfUserExistsById(id);
  logger.info(`User profile with ID: ${id} found`);

  validateUpdateUserRequestBody(reqBody);
  logger.info("User profile update request validated");

  const updatedUser = await dal.updateProfile(
    { id: user.id },
    {
      firstName: reqBody?.firstName,
      lastName: reqBody?.lastName,
      nickname: reqBody?.nickname,
      bio: reqBody?.bio,
    }
  );
  logger.info(`User profile with ID: ${id} updated`);

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  logger.info(`Deleting user profile with ID: ${id}`);

  const user = await checkIfUserExistsById(id);
  logger.info(`User profile with ID: ${id} found`);

  const deletedUser = await dal.deleteProfile({ id: user.id });
  logger.info(`User profile with ID: ${id} deleted`);

  publishUserDeleted(envVars.QUEUE_USER_DELETED, {
    userId: deletedUser.userId,
  });

  return deletedUser;
};
