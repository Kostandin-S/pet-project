import { checkIfUserExistsById } from "./helpers/users.helpers";
import * as dal from "./repositories/profile.dal";
import { RegisterUserReqBody, UpdateUserRequestBody } from "./users.types";
import { validateUpdateUserRequestBody } from "./users.validator";

export const getUsers = async () => {
  return await dal.getProfiles({});
};

export const getUserById = async (id: string) => {
  return await checkIfUserExistsById(id);
};

export const createUser = async (reqBody: RegisterUserReqBody) => {
  return await dal.createProfile({ ...reqBody });
};

export const updateUser = async (
  id: string,
  reqBody: UpdateUserRequestBody
) => {
  const user = await checkIfUserExistsById(id);

  validateUpdateUserRequestBody(reqBody);

  return await dal.updateProfile(
    { id: user.id },
    {
      firstName: reqBody?.firstName,
      lastName: reqBody?.lastName,
      nickname: reqBody?.nickname,
      bio: reqBody?.bio,
    }
  );
};

export const deleteUser = async (id: string) => {
  const user = await checkIfUserExistsById(id);
  return await dal.deleteProfile({ id: user.id });
};
