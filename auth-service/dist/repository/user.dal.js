"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = exports.findUniqueUser = exports.findFirstUser = void 0;
const client_1 = require("../generated/prisma/client");
const generate_prisma_error_1 = require("../helpers/generate-prisma-error");
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const findFirstUser = async (where) => {
    try {
        return await prisma.user.findFirst({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findFirstUser = findFirstUser;
const findUniqueUser = async (where) => {
    try {
        return await prisma.user.findUnique({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findUniqueUser = findUniqueUser;
const createUser = async (data) => {
    try {
        return await prisma.user.create({ data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.createUser = createUser;
const getUsers = async (where) => {
    try {
        return await prisma.user.findMany({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.getUsers = getUsers;
const updateUser = async (where, data) => {
    try {
        return await prisma.user.update({ where, data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (where) => {
    try {
        return await prisma.user.delete({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.deleteUser = deleteUser;
