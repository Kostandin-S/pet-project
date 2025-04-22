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
exports.addNewBookToCollection = exports.formatBookGenresObject = exports.getGenreIds = exports.checkIfBookExistsByTitleAndAuthor = exports.checkIfBookExistsById = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const errors_1 = __importDefault(require("../constants/errors"));
const bookGenresDal = __importStar(require("../repositories/book-genres.dal"));
const booksDal = __importStar(require("../repositories/books.dal"));
const genresDal = __importStar(require("../repositories/genres.dal"));
const errors_2 = require("../utils/errors");
const checkIfBookExistsById = async (id) => {
    const book = await booksDal.findUniqueBook({ id });
    if (!book) {
        throw new errors_2.NotFoundError(errors_1.default.BOOK_NOT_FOUND);
    }
    return book;
};
exports.checkIfBookExistsById = checkIfBookExistsById;
const checkIfBookExistsByTitleAndAuthor = async (title, author) => {
    const existingBook = await booksDal.findFirstBook({
        title: { contains: title, mode: "insensitive" },
        author: { contains: author, mode: "insensitive" },
    });
    if (existingBook) {
        throw new errors_2.Conflict(errors_1.default.BOOK_ALREADY_EXISTS);
    }
};
exports.checkIfBookExistsByTitleAndAuthor = checkIfBookExistsByTitleAndAuthor;
const getGenreIds = async (genres) => {
    return Promise.all(genres.map(async (genreName) => {
        const genre = (await genresDal.findFirstGenre({
            name: { contains: genreName, mode: "insensitive" },
        })) ?? (await genresDal.createGenre({ name: genreName }));
        return genre.id;
    }));
};
exports.getGenreIds = getGenreIds;
const formatBookGenresObject = (book) => {
    const genres = book.genres.map(({ genre }) => genre.name);
    return { ...book, genres };
};
exports.formatBookGenresObject = formatBookGenresObject;
const addNewBookToCollection = async (params) => {
    const { genres, title, author } = params;
    const genreIds = await (0, exports.getGenreIds)(genres);
    const newBook = await booksDal.createBook({
        title: title,
        author: author,
        publishedDate: params?.publishedDate
            ? (0, dayjs_1.default)(params.publishedDate).toISOString()
            : null,
        isbn: params?.isbn,
    });
    const bookGenresData = genreIds.map((genreId) => ({
        bookId: newBook.id,
        genreId,
    }));
    await bookGenresDal.createManyBookGenres(bookGenresData);
    const book = await booksDal.findFirstBook({ id: newBook.id });
    if (!book) {
        throw new errors_2.InternalServerError(errors_1.default.BOOK_NOT_ADDED);
    }
    return (0, exports.formatBookGenresObject)(book);
};
exports.addNewBookToCollection = addNewBookToCollection;
