"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBookRequestBody = exports.validateAddBookRequestBody = void 0;
const zod_1 = require("zod");
const errors_1 = __importDefault(require("./constants/errors"));
const format_zod_errors_1 = require("./helpers/format-zod-errors");
const errors_2 = require("./utils/errors");
const isbn10Regex = /^\d{9}[\dX]$/;
const isbn13Regex = /^\d{13}$/;
const validateAddBookRequestBody = (requestBody) => {
    const schema = zod_1.z.object({
        title: zod_1.z.string().min(3, { message: errors_1.default.TITLE_REQUIRED }),
        author: zod_1.z.string().min(3, { message: errors_1.default.AUTHOR_REQUIRED }),
        publishedDate: zod_1.z.string().optional(),
        isbn: zod_1.z
            .string()
            .refine((value) => isbn10Regex.test(value) || isbn13Regex.test(value), {
            message: errors_1.default.INVALID_ISBN_FORMAT,
        })
            .optional(),
        genres: zod_1.z.array(zod_1.z.string()),
    });
    const result = schema.safeParse(requestBody);
    if (!result.success) {
        const errorMessages = (0, format_zod_errors_1.formatZodErrors)(result.error.errors);
        throw new errors_2.BadRequest(errorMessages);
    }
    return result.data;
};
exports.validateAddBookRequestBody = validateAddBookRequestBody;
const validateUpdateBookRequestBody = (requestBody) => {
    const schema = zod_1.z.object({
        title: zod_1.z.string().min(3, { message: errors_1.default.TITLE_REQUIRED }).optional(),
        author: zod_1.z.string().min(3, { message: errors_1.default.AUTHOR_REQUIRED }).optional(),
        publishedDate: zod_1.z.string().optional(),
        isbn: zod_1.z
            .string()
            .refine((value) => isbn10Regex.test(value) || isbn13Regex.test(value), {
            message: errors_1.default.INVALID_ISBN_FORMAT,
        })
            .optional(),
    });
    const result = schema.safeParse(requestBody);
    if (!result.success) {
        const errorMessages = (0, format_zod_errors_1.formatZodErrors)(result.error.errors);
        throw new errors_2.BadRequest(errorMessages);
    }
    return result.data;
};
exports.validateUpdateBookRequestBody = validateUpdateBookRequestBody;
