"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserBookRequestBook = exports.validateAddUserBookRequestBook = void 0;
const zod_1 = require("zod");
const client_1 = require("../src/generated/prisma/client");
const errors_1 = __importDefault(require("./constants/errors"));
const format_zod_errors_1 = require("./helpers/format-zod-errors");
const errors_2 = require("./utils/errors");
const validateAddUserBookRequestBook = (requestBody) => {
    const schema = zod_1.z.object({
        title: zod_1.z.string().min(2, { message: errors_1.default.TITLE_REQUIRED }),
        author: zod_1.z.string().min(3, { message: errors_1.default.AUTHOR_REQUIRED }),
        rating: zod_1.z
            .number()
            .min(1, { message: errors_1.default.MIN_RATING })
            .max(5, { message: errors_1.default.MAX_RATING })
            .optional(),
        description: zod_1.z
            .string()
            .min(10, { message: errors_1.default.DESC_TOO_SHORT })
            .optional(),
        status: zod_1.z
            .enum([
            client_1.BookStatus.NotStarted,
            client_1.BookStatus.InProgress,
            client_1.BookStatus.Completed,
        ])
            .optional(),
    });
    const result = schema.safeParse(requestBody);
    if (!result.success) {
        const errorMessages = (0, format_zod_errors_1.formatZodErrors)(result.error.errors);
        throw new errors_2.BadRequest(errorMessages);
    }
    return result.data;
};
exports.validateAddUserBookRequestBook = validateAddUserBookRequestBook;
const validateUpdateUserBookRequestBook = (requestBody) => {
    const schema = zod_1.z.object({
        rating: zod_1.z
            .number()
            .min(1, { message: errors_1.default.MIN_RATING })
            .max(5, { message: errors_1.default.MAX_RATING })
            .optional(),
        description: zod_1.z
            .string()
            .min(10, { message: errors_1.default.DESC_TOO_SHORT })
            .optional(),
        status: zod_1.z
            .enum([
            client_1.BookStatus.NotStarted,
            client_1.BookStatus.InProgress,
            client_1.BookStatus.Completed,
        ])
            .optional(),
    });
    const result = schema.safeParse(requestBody);
    if (!result.success) {
        const errorMessages = (0, format_zod_errors_1.formatZodErrors)(result.error.errors);
        throw new errors_2.BadRequest(errorMessages);
    }
    return result.data;
};
exports.validateUpdateUserBookRequestBook = validateUpdateUserBookRequestBook;
