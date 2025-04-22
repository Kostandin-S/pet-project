import { z } from "zod";

import { LoginUserReqBody, RegisterUserReqBody } from "./auth.types";
import errors from "./constants/errors";
import { formatZodErrors } from "./helpers/format-zod-errors";
import { BadRequest } from "./utils/errors";

export const validateRegisterUserRequest = (
  requestBody: RegisterUserReqBody
) => {
  const schema = z.object({
    firstName: z.string().min(3, { message: errors.FIRST_NAME_REQUIRED }),
    lastName: z.string().min(3, { message: errors.LAST_NAME_REQUIRED }),
    email: z.string().email({ message: errors.INVALID_EMAIL }),
    password: z
      .string()
      .min(8, { message: errors.PASSWORD_MIN_LENGTH })
      .regex(/[A-Z]/, { message: errors.PASSWORD_UPPERCASE })
      .regex(/[a-z]/, { message: errors.PASSWORD_LOWERCASE })
      .regex(/[0-9]/, { message: errors.PASSWORD_NUMBER })
      .regex(/[\W_]/, { message: errors.PASSWORD_SPECIAL_CHAR }),
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

export const validateUserLoginRequest = (requestBody: LoginUserReqBody) => {
  const schema = z.object({
    email: z.string().email({ message: errors.INVALID_EMAIL }),
    password: z.string().min(8, errors.PASSWORD_MIN_LENGTH),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};
