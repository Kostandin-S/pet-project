"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.addBook = void 0;
const books_validator_1 = require("./books.validator");
const errors_1 = __importDefault(require("./constants/errors"));
const search_book_in_google_books_1 = require("./external/google-books-api/requests/search-book-in-google-books");
const books_helpers_1 = require("./helpers/books.helpers");
const dal = __importStar(require("./repositories/books.dal"));
const errors_2 = require("./utils/errors");
const addBook = async (reqBody) => {
    (0, books_validator_1.validateAddBookRequestBody)(reqBody);
    await (0, books_helpers_1.checkIfBookExistsByTitleAndAuthor)(reqBody.title, reqBody.author);
    return await (0, books_helpers_1.addNewBookToCollection)(reqBody);
};
exports.addBook = addBook;
const getBooks = async (filters) => {
    const books = await dal.findManyBooks({ ...filters });
    if (!books.length && filters?.author && filters?.title) {
        const googleBooksResponse = await (0, search_book_in_google_books_1.searchBookInGoogleBooks)({
            author: filters.author,
            title: filters.title,
        });
        if (!googleBooksResponse || googleBooksResponse?.totalItems === 0) {
            throw new errors_2.NotFoundError(errors_1.default.BOOK_NOT_FOUND_IN_OUR_LIBRARY);
        }
        const volumeInfo = googleBooksResponse.items[0].volumeInfo;
        const params = {
            author: volumeInfo.authors[0],
            title: volumeInfo.title,
            isbn: volumeInfo?.industryIdentifiers[0]?.identifier,
            publishedDate: volumeInfo?.publishedDate,
            genres: volumeInfo?.categories,
        };
        const book = await (0, books_helpers_1.addNewBookToCollection)(params);
        return [book];
    }
    return books.map((book) => (0, books_helpers_1.formatBookGenresObject)(book));
};
exports.getBooks = getBooks;
const getBookById = async (id) => {
    const book = await (0, books_helpers_1.checkIfBookExistsById)(id);
    return (0, books_helpers_1.formatBookGenresObject)(book);
};
exports.getBookById = getBookById;
const updateBook = async (bookId, reqBody) => {
    await (0, books_helpers_1.checkIfBookExistsById)(bookId);
    (0, books_validator_1.validateUpdateBookRequestBody)(reqBody);
    const updatedBook = await dal.updateBook({ id: bookId }, reqBody);
    return (0, books_helpers_1.formatBookGenresObject)(updatedBook);
};
exports.updateBook = updateBook;
const deleteBook = async (id) => {
    await (0, books_helpers_1.checkIfBookExistsById)(id);
    await dal.deleteBook({ id });
};
exports.deleteBook = deleteBook;
