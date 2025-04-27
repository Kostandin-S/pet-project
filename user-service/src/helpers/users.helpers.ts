import { ErrorMessages } from "../constants/errors";
import * as dal from "../repositories/profile.dal";
import { BadRequest, NotFoundError } from "../utils/errors";

export const checkIfUserExistsById = async (id: string) => {
  const user = await dal.findUniqueProfile({ userId: id });

  if (!user) {
    throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);
  }

  return user;
};

export const validateId = (providedId?: string) => {
  if (!providedId) throw new BadRequest(ErrorMessages.INVALID_ID);

  return providedId;
};
