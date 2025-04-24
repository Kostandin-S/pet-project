import { BookStatus } from "./generated/prisma/client";

export type AddUserBookRequestBody = {
  title: string;
  author: string;
  rating?: number;
  description?: string;
  status?: BookStatus;
};

export type UpdateUserBookRequestBody = {
  rating?: number;
  description?: string;
  status?: BookStatus;
};

export type BookRecommendationsMessage = {
  email: string;
  genres: string;
  books: string[];
};
