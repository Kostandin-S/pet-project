import {
  Book,
  Genre,
} from './generated/prisma/client';

export type AddBookRequestBody = {
  title: string;
  author: string;
  publishedDate?: string;
  isbn?: string;
  genres: string[];
};

export type UpdateBookRequestBody = {
  title?: string;
  author?: string;
  publishedDate?: string;
  isbn?: string;
};

export type GetBookFilters = Partial<Omit<Book, "createdAt" | "updatedAt">>;

export type BookWithGenres = Book & {
  genres: Array<{
    id: string;
    bookId: string;
    genreId: string;
    createdAt: Date;
    updatedAt: Date;
    genre: Genre;
  }>;
};

export type BookUpdatedMessage = {
  bookId: string;
  author: string;
  title: string;
};
