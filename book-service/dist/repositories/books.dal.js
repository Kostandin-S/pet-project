"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.findManyBooks = exports.createBook = exports.findUniqueBook = exports.findFirstBook = void 0;
const client_1 = require("../generated/prisma/client");
const generate_prisma_error_1 = require("../helpers/generate-prisma-error");
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const findFirstBook = async (where) => {
    try {
        return await prisma.book.findFirst({
            where,
            include: { genres: { include: { genre: true } } },
        });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findFirstBook = findFirstBook;
const findUniqueBook = async (where) => {
    try {
        return await prisma.book.findFirst({
            where,
            include: { genres: { include: { genre: true } } },
        });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findUniqueBook = findUniqueBook;
const createBook = async (data) => {
    try {
        return await prisma.book.create({ data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.createBook = createBook;
const findManyBooks = async (where) => {
    try {
        return await prisma.book.findMany({
            where,
            include: { genres: { include: { genre: true } } },
        });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findManyBooks = findManyBooks;
const updateBook = async (where, data) => {
    try {
        return await prisma.book.update({
            where,
            data,
            include: { genres: { include: { genre: true } } },
        });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (where) => {
    try {
        return await prisma.book.delete({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.deleteBook = deleteBook;
