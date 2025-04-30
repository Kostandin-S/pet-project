import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "./enums/http-status-code";
import { validateId } from "./helpers/users.helpers";
import * as service from "./users.services";

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await service.getUsers();

    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = validateId(req.params?.id);
    const user = await service.getUserById(userId);

    res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = await service.createUser(req.body);

    res.status(HttpStatusCode.Created).json(createdUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = validateId(req.params?.id);
    const updatedUser = await service.updateUser(userId, req.body);

    res.status(HttpStatusCode.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = validateId(req.params?.id);
    const deletedUser = await service.deleteUser(userId);

    res.status(HttpStatusCode.OK).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
