import errors from "../constants/errors";
import { BadRequest } from "../utils/errors";

export const validateId = (providedId: string | string[] | undefined) => {
  if (!providedId) throw new BadRequest(errors.INVALID_ID);

  return providedId as string;
};
