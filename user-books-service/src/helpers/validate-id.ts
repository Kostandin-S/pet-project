import errors from "../constants/errors";
import { BadRequest } from "../utils/errors";

export const validateParam = (providedParam: string | string[] | undefined) => {
  if (!providedParam) throw new BadRequest(errors.INVALID_ID);

  return providedParam as string;
};
