import { ErrorMessages } from "../constants/errors";
import { BadRequest } from "../utils/errors";

export const validateId = (providedId?: string) => {
  if (!providedId) throw new BadRequest(ErrorMessages.INVALID_ID);

  return providedId;
};
