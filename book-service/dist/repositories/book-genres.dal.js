"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManyBookGenres = void 0;
const client_1 = require("../generated/prisma/client");
const generate_prisma_error_1 = require("../helpers/generate-prisma-error");
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const createManyBookGenres = async (data) => {
    try {
        return await prisma.bookGenres.createMany({ data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.createManyBookGenres = createManyBookGenres;
