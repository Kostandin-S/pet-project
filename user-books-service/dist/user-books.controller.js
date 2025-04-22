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
const http_status_code_1 = require("./enums/http-status-code");
const validate_id_1 = require("./helpers/validate-id");
const service = __importStar(require("./user-books.service"));
const addUserBook = async (req, res, next) => {
    try {
        const userId = (0, validate_id_1.validateId)(req.headers["x-user-id"]);
        const addedBook = await service.addUserBook(req.body, userId);
        res.status(http_status_code_1.HttpStatusCode.Created).json(addedBook);
    }
    catch (error) {
        next(error);
    }
};
exports.addUserBook = addUserBook;
const getUserBooks = async (req, res, next) => {
    try {
        const userId = (0, validate_id_1.validateId)(req.headers["x-user-id"]);
        const booksCollection = await service.getUserBooks(userId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(booksCollection);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserBooks = getUserBooks;
const getUserBookById = async (req, res, next) => {
    try {
        const bookId = (0, validate_id_1.validateId)(req.params?.id);
        const userId = (0, validate_id_1.validateId)(req.headers["x-user-id"]);
        const book = await service.getUserBookById(bookId, userId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(book);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserBookById = getUserBookById;
const updateUserBook = async (req, res, next) => {
    try {
        const bookId = (0, validate_id_1.validateId)(req.params?.id);
        const userId = (0, validate_id_1.validateId)(req.headers["x-user-id"]);
        const updatedUserBook = await service.updateUserBook(bookId, userId, req.body);
        res.status(http_status_code_1.HttpStatusCode.OK).json(updatedUserBook);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserBook = updateUserBook;
const deleteUserBook = async (req, res, next) => {
    try {
        const bookId = (0, validate_id_1.validateId)(req.params?.id);
        const userId = (0, validate_id_1.validateId)(req.headers["x-user-id"]);
        const deletedUserBook = await service.deleteUserBook(bookId, userId);
        res.status(http_status_code_1.HttpStatusCode.OK).json(deletedUserBook);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserBook = deleteUserBook;
