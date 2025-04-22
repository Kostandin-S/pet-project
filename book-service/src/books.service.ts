import {
  AddBookRequestBody,
  GetBookFilters,
  UpdateBookRequestBody,
} from './books.types';
import {
  validateAddBookRequestBody,
  validateUpdateBookRequestBody,
} from './books.validator';
import errors from './constants/errors';
import { searchBookInGoogleBooks } from './external/google-books-api/requests/search-book-in-google-books';
import {
  addNewBookToCollection,
  checkIfBookExistsById,
  checkIfBookExistsByTitleAndAuthor,
  formatBookGenresObject,
  AddNewBookToCollectionParams,
} from './helpers/books.helpers';
import * as dal from './repositories/books.dal';
import { NotFoundError } from './utils/errors';

export const addBook = async (reqBody: AddBookRequestBody) => {
  validateAddBookRequestBody(reqBody);
  await checkIfBookExistsByTitleAndAuthor(reqBody.title, reqBody.author);

  return await addNewBookToCollection(reqBody);
};

export const getBooks = async (filters: GetBookFilters) => {
  const books = await dal.findManyBooks({ ...filters });

  if (!books.length && filters?.author && filters?.title) {
    const googleBooksResponse = await searchBookInGoogleBooks({
      author: filters.author,
      title: filters.title,
    });

    if (!googleBooksResponse || googleBooksResponse?.totalItems === 0) {
      throw new NotFoundError(errors.BOOK_NOT_FOUND_IN_OUR_LIBRARY);
    }

    const volumeInfo = googleBooksResponse.items[0].volumeInfo;

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

  return books.map((book) => formatBookGenresObject(book));
};

export const getBookById = async (id: string) => {
  const book = await checkIfBookExistsById(id);

  return formatBookGenresObject(book);
};

export const updateBook = async (
  bookId: string,
  reqBody: UpdateBookRequestBody
) => {
  await checkIfBookExistsById(bookId);
  validateUpdateBookRequestBody(reqBody);

  const updatedBook = await dal.updateBook({ id: bookId }, reqBody);

  return formatBookGenresObject(updatedBook);
};

export const deleteBook = async (id: string) => {
  await checkIfBookExistsById(id);

  await dal.deleteBook({ id });
};
