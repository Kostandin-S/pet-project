import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";

import envVars from "../constants/env-vars";
import errors from "../constants/errors";
import { HttpMethod } from "../enums/http-methods";
import { generateToken } from "../helpers/jwt.helper";
import { NotAuthenticated } from "../utils/errors";

export const validateSession = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const cookie = req.headers?.cookie;

  if (!cookie) {
    next(new NotAuthenticated(errors.N0_SESSION_FOUND));
    return;
  }

  try {
    const response: AxiosResponse<{ userId: string; isAdmin: boolean }> =
      await axios({
        method: HttpMethod.GET,
        headers: {
          Authorization: `Bearer ${generateToken()}`,
          Cookie: cookie,
        },
        url: `${envVars.AUTH_SERVICE_URL}/session-validation`,
      });

    req.headers["x-user-id"] = response.data.userId;
    req.headers["x-user-role"] = response.data.isAdmin ? "admin" : "user";

    next();
  } catch (e) {
    next(e);
  }
};
