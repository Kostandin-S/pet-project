import {
  NextFunction,
  Request,
  Response,
} from 'express';

import errors from '../constants/errors';
import { NotAuthenticated } from '../utils/errors';

enum Role {
  User = "user",
  Admin = "admin",
}

export const authzMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.headers["x-user-role"] === Role.User) {
    next(new NotAuthenticated(errors.MISSING_ROLE));
    return;
  }

  next();
};
