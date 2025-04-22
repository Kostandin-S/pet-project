"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyUserBooks = exports.deleteUserBook = exports.updateUserBook = exports.getUserBookById = exports.getUserBooks = exports.addBookToUser = void 0;
const client_1 = require("../generated/prisma/client");
const generate_prisma_error_1 = require("../helpers/generate-prisma-error");
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const addBookToUser = async (data) => {
    try {
        return await prisma.userBooks.create({ data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.addBookToUser = addBookToUser;
const getUserBooks = async (where) => {
    try {
        return await prisma.userBooks.findMany({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.getUserBooks = getUserBooks;
const getUserBookById = async (where) => {
    try {
        return await prisma.userBooks.findUnique({
            where,
        });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.getUserBookById = getUserBookById;
const updateUserBook = async (where, data) => {
    try {
        return await prisma.userBooks.update({
            where,
            data,
        });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.updateUserBook = updateUserBook;
const deleteUserBook = async (where) => {
    try {
        return await prisma.userBooks.delete({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.deleteUserBook = deleteUserBook;
const updateManyUserBooks = async (where, data) => {
    try {
        return await prisma.userBooks.updateMany({ where, data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.updateManyUserBooks = updateManyUserBooks;
