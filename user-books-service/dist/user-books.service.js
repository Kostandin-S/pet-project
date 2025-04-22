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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserBook = exports.updateUserBook = exports.getUserBookById = exports.getUserBooks = exports.addUserBook = void 0;
const user_books_helpers_1 = require("../src/helpers/user-books.helpers");
const userBooksDal = __importStar(require("../src/repositories/user-books.dal"));
const requests_1 = require("./requests/book-service/requests");
const user_books_validator_1 = require("./user-books.validator");
const addUserBook = async (requestBody, userId) => {
    (0, user_books_validator_1.validateAddUserBookRequestBook)(requestBody);
    const { title, author } = requestBody;
    const books = await (0, requests_1.getBooks)({ title, author });
    await (0, user_books_helpers_1.associateBookWithUser)(books[0].id, userId, requestBody);
    return books[0];
};
exports.addUserBook = addUserBook;
const getUserBooks = async (userId) => {
    const userBooks = await userBooksDal.getUserBooks({ userId });
    return userBooks.map((userBook) => (0, user_books_helpers_1.formatUserBooks)(userBook));
};
exports.getUserBooks = getUserBooks;
const getUserBookById = async (bookId, userId) => {
    const book = await (0, user_books_helpers_1.checkIfBookIsPartOfUsersCollection)(userId, bookId);
    return (0, user_books_helpers_1.formatUserBooks)(book);
};
exports.getUserBookById = getUserBookById;
const updateUserBook = async (bookId, userId, requestBody) => {
    await (0, user_books_helpers_1.checkIfBookIsPartOfUsersCollection)(userId, bookId);
    (0, user_books_validator_1.validateUpdateUserBookRequestBook)(requestBody);
    const updatedBook = await userBooksDal.updateUserBook({ userId_bookId: { userId, bookId } }, {
        rating: requestBody?.rating,
        description: requestBody?.description,
        status: requestBody?.status,
    });
    return (0, user_books_helpers_1.formatUserBooks)(updatedBook);
};
exports.updateUserBook = updateUserBook;
const deleteUserBook = async (bookId, userId) => {
    await (0, user_books_helpers_1.checkIfBookIsPartOfUsersCollection)(userId, bookId);
    const deletedBook = await userBooksDal.deleteUserBook({
        userId_bookId: { userId, bookId },
    });
    return (0, user_books_helpers_1.formatUserBooks)(deletedBook);
};
exports.deleteUserBook = deleteUserBook;
