import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { HttpStatusCode } from "axios";

import { PrismaErrorCode } from "../enums/prisma-error-code";

export function preparePrismaError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.UniqueConstraintViolation:
        return {
          httpCode: HttpStatusCode.BadRequest,
          name: "UniqueConstraintViolation",
          message: `Unique constraint violation: ${error.meta?.target}`,
          details: error.message,
        };
      case PrismaErrorCode.ForeignKeyConstraintViolation:
        return {
          httpCode: HttpStatusCode.BadRequest,
          name: "ForeignKeyViolation",
          message: `Foreign key constraint violation: ${error.meta?.target}`,
          details: error.message,
        };
      case PrismaErrorCode.InvalidFieldValue:
        return {
          httpCode: HttpStatusCode.BadRequest,
          name: "InvalidFieldValue",
          message: `Invalid value for field: ${error.meta?.target}`,
          details: error.message,
        };
      default:
        return {
          httpCode: HttpStatusCode.InternalServerError,
          name: "PrismaError",
          message: `A Prisma error occurred: ${error.message}`,
          details: error.message,
        };
    }
  } else if (error instanceof PrismaClientInitializationError) {
    return {
      httpCode: HttpStatusCode.InternalServerError,
      name: "PrismaInitializationError",
      message:
        "Error initializing Prisma Client: Could not connect to the database.",
      details: error.message,
    };
  } else if (error instanceof PrismaClientRustPanicError) {
    return {
      httpCode: HttpStatusCode.InternalServerError,
      name: "PrismaRustPanicError",
      message: "Prisma Client Rust engine encountered a panic.",
      details: error.message,
    };
  } else if (error instanceof PrismaClientUnknownRequestError) {
    return {
      httpCode: HttpStatusCode.InternalServerError,
      name: "PrismaUnknownRequestError",
      message:
        "An unknown error occurred while processing the request with Prisma.",
      details: error.message,
    };
  }

  return {
    httpCode: HttpStatusCode.InternalServerError,
    name: "UnknownError",
    message: "An unknown error occurred.",
    details: "",
  };
}
