import { NextFunction, Request, Response } from "express";

import { ErrorMessages } from "../constants/errors";
import { BadRequest } from "../utils/errors";

export const reqBodyExists = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    next(new BadRequest(ErrorMessages.MISSING_REQ_BODY));

    return;
  }

  next();
};
