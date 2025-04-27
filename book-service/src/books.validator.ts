import { z } from "zod";

import { AddBookRequestBody, UpdateBookRequestBody } from "./books.types";
import { ErrorMessages } from "./constants/errors";
import { formatZodErrors } from "./helpers/format-zod-errors";
import { BadRequest } from "./utils/errors";

const isbn10Regex = /^\d{9}[\dX]$/;
const isbn13Regex = /^\d{13}$/;

export const validateAddBookRequestBody = (requestBody: AddBookRequestBody) => {
  const schema = z.object({
    title: z.string().min(3, { message: ErrorMessages.TITLE_REQUIRED }),
    author: z.string().min(3, { message: ErrorMessages.AUTHOR_REQUIRED }),
    publishedDate: z.string().optional(),
    isbn: z
      .string()
      .refine((value) => isbn10Regex.test(value) || isbn13Regex.test(value), {
        message: ErrorMessages.INVALID_ISBN_FORMAT,
      })
      .optional(),
    genres: z.array(z.string()),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};

export const validateUpdateBookRequestBody = (
  requestBody: UpdateBookRequestBody
) => {
  const schema = z.object({
    title: z
      .string()
      .min(3, { message: ErrorMessages.TITLE_REQUIRED })
      .optional(),
    author: z
      .string()
      .min(3, { message: ErrorMessages.AUTHOR_REQUIRED })
      .optional(),
    publishedDate: z.string().optional(),
    isbn: z
      .string()
      .refine((value) => isbn10Regex.test(value) || isbn13Regex.test(value), {
        message: ErrorMessages.INVALID_ISBN_FORMAT,
      })
      .optional(),
  });

  const result = schema.safeParse(requestBody);

  if (!result.success) {
    const errorMessages = formatZodErrors(result.error.errors);
    throw new BadRequest(errorMessages);
  }

  return result.data;
};
