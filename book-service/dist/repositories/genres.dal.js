"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.findUniqueGenre = exports.findGenres = exports.findFirstGenre = exports.createGenre = void 0;
const client_1 = require("../generated/prisma/client");
const generate_prisma_error_1 = require("../helpers/generate-prisma-error");
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const createGenre = async (data) => {
    try {
        return await prisma.genre.create({ data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.createGenre = createGenre;
const findFirstGenre = async (where) => {
    try {
        return await prisma.genre.findFirst({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findFirstGenre = findFirstGenre;
const findGenres = async () => {
    try {
        return await prisma.genre.findMany();
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findGenres = findGenres;
const findUniqueGenre = async (where) => {
    try {
        return await prisma.genre.findUnique({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findUniqueGenre = findUniqueGenre;
const updateGenre = async (where, data) => {
    try {
        return await prisma.genre.update({ where, data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.updateGenre = updateGenre;
const deleteGenre = async (where) => {
    try {
        return await prisma.genre.delete({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.deleteGenre = deleteGenre;
