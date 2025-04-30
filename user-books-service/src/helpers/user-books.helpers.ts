import { ErrorMessages } from "../constants/errors";
import { UserBooks } from "../generated/prisma";
import * as userBooksDal from "../repositories/user-books.dal";
import { AddUserBookRequestBody } from "../user-books.types";
import { Conflict, NotFoundError } from "../utils/errors";

export const associateBookWithUser = async (
  bookId: string,
  userId: string,
  reqBody: AddUserBookRequestBody
): Promise<void> => {
  const book = await userBooksDal.getUserBookById({
    userId_bookId: { userId, bookId },
  });

  if (book) {
    throw new Conflict(ErrorMessages.BOOK_ALREADY_ASSIGNED);
  }

  await userBooksDal.addBookToUser({
    userId,
    bookId,
    description: reqBody?.description,
    rating: reqBody?.rating,
    status: reqBody?.status,
    bookTitle: reqBody.title,
    bookAuthor: reqBody.author,
  });
};

export const checkIfBookIsPartOfUsersCollection = async (
  userId: string,
  bookId: string
) => {
  const book = await userBooksDal.getUserBookById({
    userId_bookId: { userId, bookId },
  });

  if (!book) throw new NotFoundError(ErrorMessages.BOOK_NOT_FOUND);

  return book;
};

export const formatUserBooks = (userBook: UserBooks) => ({
  id: userBook.id,
  bookId: userBook.bookId,
  title: userBook.bookTitle,
  author: userBook.bookAuthor,
  description: userBook?.description,
  rating: userBook?.rating,
  status: userBook.status,
});
