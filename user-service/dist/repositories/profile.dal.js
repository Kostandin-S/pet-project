"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getProfiles = exports.createProfile = exports.findUniqueProfile = exports.findFirstProfile = void 0;
const client_1 = require("../generated/prisma/client");
const generate_prisma_error_1 = require("../helpers/generate-prisma-error");
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const findFirstProfile = async (where) => {
    try {
        return await prisma.profile.findFirst({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findFirstProfile = findFirstProfile;
const findUniqueProfile = async (where) => {
    try {
        return await prisma.profile.findUnique({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.findUniqueProfile = findUniqueProfile;
const createProfile = async (data) => {
    try {
        return await prisma.profile.create({ data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.createProfile = createProfile;
const getProfiles = async (where) => {
    try {
        return await prisma.profile.findMany({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.getProfiles = getProfiles;
const updateProfile = async (where, data) => {
    try {
        return await prisma.profile.update({ where, data });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.updateProfile = updateProfile;
const deleteProfile = async (where) => {
    try {
        return await prisma.profile.delete({ where });
    }
    catch (error) {
        const { httpCode, name, message, details } = (0, generate_prisma_error_1.preparePrismaError)(error);
        throw new errors_1.PrismaError(httpCode, name, message, details);
    }
};
exports.deleteProfile = deleteProfile;
