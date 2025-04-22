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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.addBook = void 0;
const service = __importStar(require("./books.service"));
const http_status_code_1 = require("./enums/http-status-code");
const validate_id_1 = require("./helpers/validate-id");
const publisher_1 = require("./queues/publisher");
const addBook = async (req, res, next) => {
    try {
        const addedBook = await service.addBook(req.body);
        res.status(http_status_code_1.HttpStatusCode.Created).json(addedBook);
    }
    catch (error) {
        next(error);
    }
};
exports.addBook = addBook;
const getBooks = async (req, res, next) => {
    try {
        const books = await service.getBooks(req.query);
        res.status(http_status_code_1.HttpStatusCode.OK).json(books);
    }
    catch (error) {
        next(error);
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res, next) => {
    try {
        const bookId = (0, validate_id_1.validateId)(req.params?.id);
        const book = await service.getBookById(bookId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(book);
    }
    catch (error) {
        next(error);
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res, next) => {
    try {
        const bookId = (0, validate_id_1.validateId)(req.params?.id);
        const updatedBook = await service.updateBook(bookId, req.body);
        if (req.body?.title || req.body?.author) {
            await (0, publisher_1.publishBookUpdate)(process.env.QUEUE_BOOK_UPDATED, {
                bookId: updatedBook.id,
                title: updatedBook.title,
                author: updatedBook.author,
            });
        }
        res.status(http_status_code_1.HttpStatusCode.OK).json(updatedBook);
    }
    catch (error) {
        next(error);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        const bookId = (0, validate_id_1.validateId)(req.params?.id);
        const deletedBook = await service.deleteBook(bookId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(deletedBook);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBook = deleteBook;
