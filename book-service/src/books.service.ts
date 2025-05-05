import {
  AddBookRequestBody,
  GetBookFilters,
  UpdateBookRequestBody,
} from "./books.types";
import {
  validateAddBookRequestBody,
  validateUpdateBookRequestBody,
} from "./books.validator";
import logger from "./config/logger";
import {
  addNewBookToCollection,
  checkIfBookExistsById,
  checkIfBookExistsByTitleAndAuthor,
  formatBookGenresObject,
  prepareBooksFilters,
  searchForBookInGoogleBooks,
  AddNewBookToCollectionParams,
} from "./helpers/books.helpers";
import * as dal from "./repositories/books.dal";

export const addBook = async (reqBody: AddBookRequestBody) => {
  logger.info("Received request to add a new book", {
    title: reqBody.title,
    author: reqBody.author,
  });

  validateAddBookRequestBody(reqBody);
  logger.info("Book request body successfully validated", {
    title: reqBody.title,
    author: reqBody.author,
  });

  await checkIfBookExistsByTitleAndAuthor(reqBody.title, reqBody.author);
  logger.info(
    `Book not found in collection: ${reqBody.title} by ${reqBody.author}`
  );

  const newBook = await addNewBookToCollection(reqBody);
  logger.info("Book successfully added to collection", {
    bookId: newBook.id,
    title: newBook.title,
  });

  return newBook;
};

export const getBooks = async (filters: GetBookFilters) => {
  logger.info("Fetching books with filters", { filters });

  const books = await dal.findManyBooks({ ...prepareBooksFilters(filters) });
  logger.info(`Found ${books.length} books in the database`, { filters });

  if (!books.length && filters?.author && filters?.title) {
    logger.warn(
      "No books found with the given filters, attempting external search",
      { filters }
    );
    const foundBooks = await searchForBookInGoogleBooks({
      author: filters.author,
      title: filters.title,
    });

    const volumeInfo = foundBooks[0].volumeInfo;

    const params: AddNewBookToCollectionParams = {
      author: volumeInfo.authors[0],
      title: volumeInfo.title,
      isbn: volumeInfo?.industryIdentifiers[0]?.identifier,
      publishedDate: volumeInfo?.publishedDate,
      genres: volumeInfo?.categories,
    };

    const book = await addNewBookToCollection(params);

    return [book];
  }

  return books.map((book) => {
    logger.info(`Returning formatted book: ${book.id} - ${book.title}`);
    return formatBookGenresObject(book);
  });
};

export const getBookById = async (id: string) => {
  logger.info(`Fetching book by ID: ${id}`);

  const book = await checkIfBookExistsById(id);
  logger.info(`Book found: ${id}`, { bookId: book.id, title: book.title });

  return formatBookGenresObject(book);
};

export const updateBook = async (
  bookId: string,
  reqBody: UpdateBookRequestBody
) => {
  logger.info(`Request to update book with ID: ${bookId}`);

  await checkIfBookExistsById(bookId);
  logger.info(`Book found for update: ${bookId}`);

  validateUpdateBookRequestBody(reqBody);
  logger.info("Request body validated for updating book", {
    bookId,
    updateFields: reqBody,
  });

  const updatedBook = await dal.updateBook({ id: bookId }, reqBody);
  logger.info(`Book successfully updated: ${bookId}`, {
    updatedBookId: updatedBook.id,
    title: updatedBook.title,
  });

  return formatBookGenresObject(updatedBook);
};

export const deleteBook = async (id: string) => {
  logger.info(`Request to delete book with ID: ${id}`);

  await checkIfBookExistsById(id);
  logger.info(`Book found for deletion: ${id}`);

  const deletedBook = await dal.deleteBook({ id });
  logger.info(`Book successfully deleted: ${id}`, { bookId: deletedBook.id });

  return deletedBook;
};

export const recommendBooks = async (genre: string) => {
  logger.info(`Starting book recommendation based on genre: ${genre}`);

  const foundBooks = await searchForBookInGoogleBooks({ genre });

  if (!foundBooks.length) {
    logger.warn(`No books found for genre: ${genre}`);
    return [];
  }

  logger.info(`Found ${foundBooks.length} books for genre: ${genre}`);

  const recommendations = foundBooks.map(({ volumeInfo }) => ({
    title: volumeInfo.title,
    author: volumeInfo.authors,
  }));

  logger.info(
    `Prepared ${recommendations.length} book recommendations for genre: ${genre}`
  );

  return recommendations;
};
