import { z } from "zod";

import { ErrorMessages } from "./constants/errors";
import { BookStatus } from "./generated/prisma/client";
import { formatZodErrors } from "./helpers/format-zod-errors";
import {
  AddUserBookRequestBody,
  UpdateUserBookRequestBody,
} from "./user-books.types";
import { BadRequest } from "./utils/errors";

export const validateAddUserBookRequestBook = (
  requestBody: AddUserBookRequestBody
) => {
  const schema = z.object({
    title: z.string().min(2, { message: ErrorMessages.TITLE_REQUIRED }),
    author: z.string().min(3, { message: ErrorMessages.AUTHOR_REQUIRED }),
    rating: z
      .number()
      .min(1, { message: ErrorMessages.MIN_RATING })
      .max(5, { message: ErrorMessages.MAX_RATING })
      .optional(),
    description: z
      .string()
      .min(10, { message: ErrorMessages.DESC_TOO_SHORT })
      .optional(),
    status: z
      .enum([
        BookStatus.NotStarted,
        BookStatus.InProgress,
        BookStatus.Completed,
      ])
      .optional(),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};

export const validateUpdateUserBookRequestBook = (
  requestBody: UpdateUserBookRequestBody
) => {
  const schema = z.object({
    rating: z
      .number()
      .min(1, { message: ErrorMessages.MIN_RATING })
      .max(5, { message: ErrorMessages.MAX_RATING })
      .optional(),
    description: z
      .string()
      .min(10, { message: ErrorMessages.DESC_TOO_SHORT })
      .optional(),
    status: z
      .enum([
        BookStatus.NotStarted,
        BookStatus.InProgress,
        BookStatus.Completed,
      ])
      .optional(),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};
