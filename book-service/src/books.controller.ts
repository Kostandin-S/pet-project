import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { HttpStatusCode } from 'axios';

import * as service from './books.service';
import { validateBookRecommendationsQueryParams } from './books.validator';
import envVars from './constants/env-vars';
import { validateId } from './helpers/validate-id';
import {
  publishBookDelete,
  publishBookUpdate,
} from './queues/publisher';

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const addedBook = await service.addBook(req.body);

    res.status(HttpStatusCode.Created).json(addedBook);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await service.getBooks(req.query);

    res.status(HttpStatusCode.Ok).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = validateId(req.params?.id);
    const book = await service.getBookById(bookId);

    res.status(HttpStatusCode.Ok).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = validateId(req.params?.id);
    const updatedBook = await service.updateBook(bookId, req.body);

    if (req.body?.title || req.body?.author) {
      await publishBookUpdate(envVars.QUEUE_BOOK_UPDATED, {
        bookId: updatedBook.id,
        title: updatedBook.title,
        author: updatedBook.author,
      });
    }

    res.status(HttpStatusCode.Ok).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = validateId(req.params?.id);
    const deletedBook = await service.deleteBook(bookId);

    await publishBookDelete(envVars.QUEUE_BOOK_DELETED, {
      bookId: deletedBook.id,
    });

    res.status(HttpStatusCode.Ok).json(deletedBook);
  } catch (error) {
    next(error);
  }
};

export const recommendBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedQueryParams = validateBookRecommendationsQueryParams(req.query);

    const recommendations = await service.recommendBooks(
      parsedQueryParams.genre
    );

    res.status(HttpStatusCode.Ok).json(recommendations);
  } catch (error) {
    next(error);
  }
};
