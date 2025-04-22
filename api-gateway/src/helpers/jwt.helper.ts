import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

import errors from '../constants/errors';
import {
  InternalServerError,
  NotAuthorized,
} from '../utils/errors';

type JwtPayload = {
  iss: string;
  iat: number;
  exp: number;
};

export const generateToken = () => {
  if (!process.env.JWT_SECRET) {
    throw new InternalServerError(errors.ENV_VARS_MISSING);
  }

  const payload: JwtPayload = {
    iss: "user-service",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 300, // 5 min
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const decodeToken = (token: string, next: NextFunction) => {
  if (!process.env.JWT_SECRET) {
    next(new InternalServerError(errors.ENV_VARS_MISSING));
    return;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

  const now = Math.floor(Date.now() / 1000);

  if (decodedToken.exp && decodedToken.exp < now) {
    next(new NotAuthorized(errors.TOKEN_HAS_EXPIRED));
    return;
  }
};
