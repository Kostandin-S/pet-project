import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "./enums/http-status-code";
import { validateId } from "./helpers/validate-id";
import * as service from "./user-books.service";

export const addUserBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = validateId(req.headers["x-user-id"]);
    const addedBook = await service.addUserBook(req.body, userId);

    res.status(HttpStatusCode.Created).json(addedBook);
  } catch (error) {
    next(error);
  }
};

export const getUserBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = validateId(req.headers["x-user-id"]);
    const booksCollection = await service.getUserBooks(userId);

    res.status(HttpStatusCode.OK).json(booksCollection);
  } catch (error) {
    next(error);
  }
};

export const getUserBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = validateId(req.params?.id);
    const userId = validateId(req.headers["x-user-id"]);
    const book = await service.getUserBookById(bookId, userId);

    res.status(HttpStatusCode.OK).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateUserBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = validateId(req.params?.id);
    const userId = validateId(req.headers["x-user-id"]);
    const updatedUserBook = await service.updateUserBook(
      bookId,
      userId,
      req.body
    );

    res.status(HttpStatusCode.OK).json(updatedUserBook);
  } catch (error) {
    next(error);
  }
};

export const deleteUserBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = validateId(req.params?.id);
    const userId = validateId(req.headers["x-user-id"]);
    const deletedUserBook = await service.deleteUserBook(bookId, userId);

    res.status(HttpStatusCode.OK).json(deletedUserBook);
  } catch (error) {
    next(error);
  }
};
