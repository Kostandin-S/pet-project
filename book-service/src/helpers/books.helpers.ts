import dayjs from 'dayjs';

import {
  BookWithGenres,
  GetBookFilters,
} from '../books.types';
import { ErrorMessages } from '../constants/errors';
import { searchBookInGoogleBooks } from '../external/google-books-api/requests/search-book-in-google-books';
import { Prisma } from '../generated/prisma';
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
    throw new NotFoundError(ErrorMessages.BOOK_NOT_FOUND);
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
    throw new Conflict(ErrorMessages.BOOK_ALREADY_EXISTS);
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
    throw new InternalServerError(ErrorMessages.BOOK_NOT_ADDED);
  }

  return formatBookGenresObject(book);
};

export const prepareBooksFilters = (
  filters: GetBookFilters
): Prisma.BookWhereInput => {
  const { genres, ...filterWithoutGenre } = filters;

  if (genres) {
    const genreList = genres
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    return {
      ...filters,
      genres: {
        some: {
          genre: {
            name: {
              in: genreList,
            },
          },
        },
      },
    };
  }

  return filterWithoutGenre;
};

export const searchForBookInGoogleBooks = async (params: {
  author?: string;
  title?: string;
  genre?: string;
}) => {
  const googleBooksResponse = await searchBookInGoogleBooks({
    author: params?.author,
    title: params?.title,
    genre: params?.genre,
  });

  if (!googleBooksResponse || googleBooksResponse?.totalItems === 0) {
    throw new NotFoundError(ErrorMessages.BOOK_NOT_FOUND_IN_OUR_LIBRARY);
  }

  return googleBooksResponse.items;
};
