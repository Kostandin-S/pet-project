import logger from "./config/logger";
import envVars from "./constants/env-vars";
import { BookStatus } from "./generated/prisma";
import {
  associateBookWithUser,
  checkIfBookIsPartOfUsersCollection,
  formatUserBooks,
} from "./helpers/user-books.helpers";
import { publishBookRecommendations } from "./queues/publisher";
import * as userBooksDal from "./repositories/user-books.dal";
import {
  getBooks,
  getBookById,
  getBookRecommendations,
} from "./requests/book-service/requests";
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
  logger.info(
    `Adding book for user ${userId} with title: ${requestBody.title}, author: ${requestBody.author}`
  );

  validateAddUserBookRequestBook(requestBody);
  logger.info("Book request validated");

  const { title, author } = requestBody;

  logger.info("Receiving book ID...");
  const books = await getBooks({ title, author });

  await associateBookWithUser(books[0].id, userId, requestBody);
  logger.info(`Book associated with user ${userId}`);

  return books[0];
};

export const getUserBooks = async (userId: string) => {
  logger.info(`Fetching books for user ${userId}`);

  const userBooks = await userBooksDal.getUserBooks({ userId });
  logger.info(`Found ${userBooks.length} books for user ${userId}`);

  return userBooks.map((userBook) => formatUserBooks(userBook));
};

export const getUserBookById = async (bookId: string, userId: string) => {
  logger.info(`Fetching book with ID ${bookId} for user ${userId}`);

  const book = await checkIfBookIsPartOfUsersCollection(userId, bookId);
  logger.info(`Found book with ID ${bookId} for user ${userId}`);

  return formatUserBooks(book);
};

export const updateUserBook = async (
  bookId: string,
  userId: string,
  userEmail: string,
  requestBody: UpdateUserBookRequestBody
) => {
  logger.info(`Updating book with ID ${bookId} for user ${userId}`);

  await checkIfBookIsPartOfUsersCollection(userId, bookId);
  logger.info(`Book with ID ${bookId} is part of user ${userId}'s collection`);

  validateUpdateUserBookRequestBook(requestBody);
  logger.info("Book update request validated");

  const updatedBook = await userBooksDal.updateUserBook(
    { userId_bookId: { userId, bookId } },
    {
      rating: requestBody?.rating,
      description: requestBody?.description,
      status: requestBody?.status,
    }
  );
  logger.info(`Book with ID ${bookId} updated for user ${userId}`);

  if (requestBody?.status && requestBody?.status === BookStatus.Completed) {
    const bookGenres = (await getBookById({ bookId })).genres;
    logger.info(`Fetching book recommendations for genre ${bookGenres[0]}`);

    const booksRecommendations = await getBookRecommendations({
      genre: bookGenres[0],
    });

    if (booksRecommendations?.length) {
      const message = {
        email: userEmail,
        genre: bookGenres[0],
        books: booksRecommendations.map((book) => book.title),
      };

      await publishBookRecommendations(
        envVars.QUEUE_BOOKS_RECOMMENDATIONS!,
        message
      );
      logger.info(
        `Book recommendations sent to ${userEmail} for genre ${bookGenres[0]}`
      );
    }
  }

  return formatUserBooks(updatedBook);
};

export const deleteUserBook = async (bookId: string, userId: string) => {
  logger.info(`Deleting book with ID ${bookId} for user ${userId}`);

  await checkIfBookIsPartOfUsersCollection(userId, bookId);
  logger.info(`Book with ID ${bookId} is part of user ${userId}'s collection`);

  const deletedBook = await userBooksDal.deleteUserBook({
    userId_bookId: { userId, bookId },
  });

  logger.info(`Book with ID ${bookId} deleted for user ${userId}`);
  return formatUserBooks(deletedBook);
};
