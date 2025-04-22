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
exports.formatUserBooks = exports.checkIfBookIsPartOfUsersCollection = exports.associateBookWithUser = void 0;
const errors_1 = __importDefault(require("../constants/errors"));
const userBooksDal = __importStar(require("../repositories/user-books.dal"));
const errors_2 = require("../utils/errors");
const associateBookWithUser = async (bookId, userId, reqBody) => {
    const book = await userBooksDal.getUserBookById({
        userId_bookId: { userId, bookId },
    });
    if (book) {
        throw new errors_2.Conflict(errors_1.default.BOOK_ALREADY_ASSIGNED);
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
exports.associateBookWithUser = associateBookWithUser;
const checkIfBookIsPartOfUsersCollection = async (userId, bookId) => {
    const book = await userBooksDal.getUserBookById({
        userId_bookId: { userId, bookId },
    });
    if (!book)
        throw new errors_2.NotFoundError(errors_1.default.BOOK_NOT_FOUND);
    return book;
};
exports.checkIfBookIsPartOfUsersCollection = checkIfBookIsPartOfUsersCollection;
const formatUserBooks = (userBooks) => ({
    id: userBooks.id,
    title: userBooks.bookTitle,
    author: userBooks.bookAuthor,
    description: userBooks?.description,
    rating: userBooks?.rating,
    status: userBooks.status,
});
exports.formatUserBooks = formatUserBooks;
