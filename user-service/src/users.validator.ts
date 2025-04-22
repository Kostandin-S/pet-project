import { z } from "zod";

import errors from "./constants/errors";
import { formatZodErrors } from "./helpers/format-zod-errors";
import { RegisterUserReqBody, UpdateUserRequestBody } from "./users.types";
import { BadRequest } from "./utils/errors";

export const validateUpdateUserRequestBody = (
  requestBody: UpdateUserRequestBody
) => {
  const schema = z.object({
    firstName: z
      .string()
      .min(3, { message: errors.FIRST_NAME_MIN_LENGTH })
      .optional(),
    lastName: z
      .string()
      .min(3, { message: errors.LAST_NAME_MIN_LENGTH })
      .optional(),
    nickname: z
      .string()
      .min(3, { message: errors.NICKNAME_MIN_LENGTH })
      .optional(),
    bio: z.string().min(3, { message: errors.BIO_MIN_LENGTH }).optional(),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};

export const validateCreateUserRequestBody = (
  requestBody: RegisterUserReqBody
) => {
  const schema = z.object({
    userId: z.string(),
    firstName: z.string().min(3, { message: errors.FIRST_NAME_REQUIRED }),
    lastName: z.string().min(3, { message: errors.LAST_NAME_REQUIRED }),
    nickname: z
      .string()
      .min(3, { message: errors.NICKNAME_MIN_LENGTH })
      .optional(),
    bio: z.string().min(3, { message: errors.BIO_MIN_LENGTH }).optional(),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};

export const validateId = (providedId?: string) => {
  if (!providedId) throw new BadRequest(errors.INVALID_ID);

  return providedId;
};
