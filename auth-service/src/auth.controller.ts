import { NextFunction, Request, Response } from "express";

import * as service from "./auth.services";
import { HttpStatusCode } from "./enums/http-status-code";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.registerUser(req.body);
    res.sendStatus(HttpStatusCode.Created);
  } catch (e) {
    next(e);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await service.loginUser(req.body);

    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin;

    console.log(req.session);

    res.sendStatus(HttpStatusCode.OK);
  } catch (e) {
    next(e);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.logoutUser(req);

    res.clearCookie("connect.sid");
    res.sendStatus(HttpStatusCode.OK);
  } catch (e) {
    next(e);
  }
};

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await service.validateSession(req);

    res
      .status(HttpStatusCode.OK)
      .send({ userId: user.id, isAdmin: user.isAdmin, email: user.email });
  } catch (e) {
    next(e);
  }
};
