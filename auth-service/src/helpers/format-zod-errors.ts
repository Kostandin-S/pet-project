import { ZodIssue } from "zod";

export const formatZodErrors = (errors: ZodIssue[]) =>
  errors.map((error) => {
    if (error.message === "Required") {
      const pathString = error.path.join(".");
      return `${pathString} is required`;
    }

    return error.message;
  });
