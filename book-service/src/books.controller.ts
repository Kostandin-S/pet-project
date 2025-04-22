import {
  NextFunction,
  Request,
  Response,
} from 'express';

import * as service from './books.service';
import { HttpStatusCode } from './enums/http-status-code';
import { validateId } from './helpers/validate-id';
import { publishBookUpdate } from './queues/publisher';

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

    res.status(HttpStatusCode.OK).json(books);
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

    res.status(HttpStatusCode.OK).json(book);
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
      await publishBookUpdate(process.env.QUEUE_BOOK_UPDATED!, {
        bookId: updatedBook.id,
        title: updatedBook.title,
        author: updatedBook.author,
      });
    }

    res.status(HttpStatusCode.OK).json(updatedBook);
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

    res.status(HttpStatusCode.OK).json(deletedBook);
  } catch (error) {
    next(error);
  }
};
