import jwt from "jsonwebtoken";
import { NextFunction } from "express";

import envVars from "../constants/env-vars";
import { ErrorMessages } from "../constants/errors";
import { InternalServerError, NotAuthorized } from "../utils/errors";

type JwtPayload = {
  iss: string;
  iat: number;
  exp: number;
};

export const generateToken = () => {
  if (!envVars.JWT_SECRET) {
    throw new InternalServerError(ErrorMessages.ENV_VARS_MISSING);
  }

  const payload: JwtPayload = {
    iss: "user-service",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300, // 5 min
  };

  return jwt.sign(payload, envVars.JWT_SECRET);
};

export const decodeToken = (token: string, next: NextFunction) => {
  if (!envVars.JWT_SECRET) {
    next(new InternalServerError(ErrorMessages.ENV_VARS_MISSING));
    return;
  }

  const decodedToken = jwt.verify(token, envVars.JWT_SECRET) as JwtPayload;

  const now = Math.floor(Date.now() / 1000);

  if (decodedToken.exp && decodedToken.exp < now) {
    next(new NotAuthorized(ErrorMessages.TOKEN_HAS_EXPIRED));
    return;
  }
};
