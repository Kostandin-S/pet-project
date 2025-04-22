import dayjs from 'dayjs';

import { BookWithGenres } from '../books.types';
import errors from '../constants/errors';
import * as bookGenresDal from '../repositories/book-genres.dal';
import * as booksDal from '../repositories/books.dal';
import * as genresDal from '../repositories/genres.dal';
import {
  Conflict,
  InternalServerError,
  NotFoundError,
} from '../utils/errors';

export const checkIfBookExistsById = async (id: string) => {
  const book = await booksDal.findUniqueBook({ id });

  if (!book) {
    throw new NotFoundError(errors.BOOK_NOT_FOUND);
  }

  return book;
};

export const checkIfBookExistsByTitleAndAuthor = async (
  title: string,
  author: string
) => {
  const existingBook = await booksDal.findFirstBook({
    title: { contains: title, mode: "insensitive" },
    author: { contains: author, mode: "insensitive" },
  });

  if (existingBook) {
    throw new Conflict(errors.BOOK_ALREADY_EXISTS);
  }
};

export type AddNewBookToCollectionParams = {
  title: string;
  author: string;
  publishedDate?: string;
  isbn?: string;
  genres: string[];
};

export const getGenreIds = async (genres: string[]): Promise<string[]> => {
  return Promise.all(
    genres.map(async (genreName) => {
      const genre =
        (await genresDal.findFirstGenre({
          name: { contains: genreName, mode: "insensitive" },
        })) ?? (await genresDal.createGenre({ name: genreName }));
      return genre.id;
    })
  );
};

export const formatBookGenresObject = (book: BookWithGenres) => {
  const genres = book.genres.map(({ genre }) => genre.name);
  return { ...book, genres };
};

export const addNewBookToCollection = async (
  params: AddNewBookToCollectionParams
) => {
  const { genres, title, author } = params;

  const genreIds = await getGenreIds(genres);

  const newBook = await booksDal.createBook({
    title: title,
    author: author,
    publishedDate: params?.publishedDate
      ? dayjs(params.publishedDate).toISOString()
      : null,
    isbn: params?.isbn,
  });

  const bookGenresData = genreIds.map((genreId) => ({
    bookId: newBook.id,
    genreId,
  }));

  await bookGenresDal.createManyBookGenres(bookGenresData);

  const book = await booksDal.findFirstBook({ id: newBook.id });

  if (!book) {
    throw new InternalServerError(errors.BOOK_NOT_ADDED);
  }

  return formatBookGenresObject(book);
};
