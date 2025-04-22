import { NextFunction, Request, Response } from "express";

import logger from "../config/logger";
import { BaseError, InternalServerError } from "../utils/errors";

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(error);

  if (error instanceof BaseError) {
    res.status(error.code).json(error.generateHttpResponse());
    return;
  }

  const fallbackError = new InternalServerError(error);

  res.status(fallbackError.code).json(fallbackError.generateHttpResponse());
};

export default errorMiddleware;
