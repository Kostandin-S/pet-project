import envVars from "./constants/env-vars";
import { BookStatus } from "./generated/prisma";
import {
  associateBookWithUser,
  checkIfBookIsPartOfUsersCollection,
  formatUserBooks,
} from "./helpers/user-books.helpers";
import { publishBookRecommendations } from "./queues/publisher";
import * as userBooksDal from "./repositories/user-books.dal";
import { getBooks, getBookById } from "./requests/book-service/requests";
import {
  AddUserBookRequestBody,
  UpdateUserBookRequestBody,
} from "./user-books.types";
import {
  validateAddUserBookRequestBook,
  validateUpdateUserBookRequestBook,
} from "./user-books.validator";

export const addUserBook = async (
  requestBody: AddUserBookRequestBody,
  userId: string
) => {
  validateAddUserBookRequestBook(requestBody);

  const { title, author } = requestBody;

  const books = await getBooks({ title, author });

  await associateBookWithUser(books[0].id, userId, requestBody);

  return books[0];
};

export const getUserBooks = async (userId: string) => {
  const userBooks = await userBooksDal.getUserBooks({ userId });

  return userBooks.map((userBook) => formatUserBooks(userBook));
};

export const getUserBookById = async (bookId: string, userId: string) => {
  const book = await checkIfBookIsPartOfUsersCollection(userId, bookId);

  return formatUserBooks(book);
};

export const updateUserBook = async (
  bookId: string,
  userId: string,
  userEmail: string,
  requestBody: UpdateUserBookRequestBody
) => {
  await checkIfBookIsPartOfUsersCollection(userId, bookId);
  validateUpdateUserBookRequestBook(requestBody);

  const updatedBook = await userBooksDal.updateUserBook(
    { userId_bookId: { userId, bookId } },
    {
      rating: requestBody?.rating,
      description: requestBody?.description,
      status: requestBody?.status,
    }
  );

  if (requestBody?.status && requestBody?.status === BookStatus.Completed) {
    const bookGenres = (await getBookById({ bookId })).genres;
    const booksRecommendations = await getBooks({ genres: bookGenres });

    const message = {
      email: userEmail,
      genres: bookGenres.join(", "),
      books: booksRecommendations.map((book) => book.title),
    };

    await publishBookRecommendations(
      envVars.QUEUE_BOOKS_RECOMMENDATIONS!,
      message
    );
  }

  return formatUserBooks(updatedBook);
};

export const deleteUserBook = async (bookId: string, userId: string) => {
  await checkIfBookIsPartOfUsersCollection(userId, bookId);
  const deletedBook = await userBooksDal.deleteUserBook({
    userId_bookId: { userId, bookId },
  });

  return formatUserBooks(deletedBook);
};
