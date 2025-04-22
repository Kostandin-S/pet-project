import errors from "../constants/errors";
import * as dal from "../repositories/profile.dal";
import { NotFoundError } from "../utils/errors";

export const checkIfUserExistsById = async (id: string) => {
  const user = await dal.findUniqueProfile({ userId: id });

  if (!user) {
    throw new NotFoundError(errors.USER_NOT_FOUND);
  }

  return user;
};
