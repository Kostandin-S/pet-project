import { NextFunction, Request, Response } from "express";

import { ErrorMessages } from "../constants/errors";
import { decodeToken } from "../helpers/jwt.helper";
import { NotAuthenticated } from "../utils/errors";

const extractTokenFromHeader = (req: Request): string | undefined => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return undefined;

  const [type, token] = authHeader.split(" ");
  return type.toLowerCase() !== "bearer" ? undefined : token;
};

export const internalAuthn = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token = extractTokenFromHeader(req);

  if (!token) {
    next(new NotAuthenticated(ErrorMessages.NO_TOKEN_PROVIDED));
    return;
  }

  decodeToken(token, next);

  next();
};
