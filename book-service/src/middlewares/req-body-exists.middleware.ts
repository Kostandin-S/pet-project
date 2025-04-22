import { NextFunction, Request, Response } from "express";

import errors from "../constants/errors";
import { BadRequest } from "../utils/errors";

const reqBodyExists = async (req: Request, _: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    next(new BadRequest(errors.MISSING_REQ_BODY));

    return;
  }

  next();
};

export default reqBodyExists;
