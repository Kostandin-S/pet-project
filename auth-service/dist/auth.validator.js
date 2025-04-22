"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLoginRequest = exports.validateRegisterUserRequest = void 0;
const zod_1 = require("zod");
const errors_1 = __importDefault(require("./constants/errors"));
const format_zod_errors_1 = require("./helpers/format-zod-errors");
const errors_2 = require("./utils/errors");
const validateRegisterUserRequest = (requestBody) => {
    const schema = zod_1.z.object({
        firstName: zod_1.z.string().min(3, { message: errors_1.default.FIRST_NAME_REQUIRED }),
        lastName: zod_1.z.string().min(3, { message: errors_1.default.LAST_NAME_REQUIRED }),
        email: zod_1.z.string().email({ message: errors_1.default.INVALID_EMAIL }),
        password: zod_1.z
            .string()
            .min(8, { message: errors_1.default.PASSWORD_MIN_LENGTH })
            .regex(/[A-Z]/, { message: errors_1.default.PASSWORD_UPPERCASE })
            .regex(/[a-z]/, { message: errors_1.default.PASSWORD_LOWERCASE })
            .regex(/[0-9]/, { message: errors_1.default.PASSWORD_NUMBER })
            .regex(/[\W_]/, { message: errors_1.default.PASSWORD_SPECIAL_CHAR }),
        nickname: zod_1.z
            .string()
            .min(3, { message: errors_1.default.NICKNAME_MIN_LENGTH })
            .optional(),
        bio: zod_1.z.string().min(3, { message: errors_1.default.BIO_MIN_LENGTH }).optional(),
    });
    const result = schema.safeParse(requestBody);
    if (!result.success) {
        const errorMessages = (0, format_zod_errors_1.formatZodErrors)(result.error.errors);
        throw new errors_2.BadRequest(errorMessages);
    }
    return result.data;
};
exports.validateRegisterUserRequest = validateRegisterUserRequest;
const validateUserLoginRequest = (requestBody) => {
    const schema = zod_1.z.object({
        email: zod_1.z.string().email({ message: errors_1.default.INVALID_EMAIL }),
        password: zod_1.z.string().min(8, errors_1.default.PASSWORD_MIN_LENGTH),
    });
    const result = schema.safeParse(requestBody);
    if (!result.success) {
        const errorMessages = (0, format_zod_errors_1.formatZodErrors)(result.error.errors);
        throw new errors_2.BadRequest(errorMessages);
    }
    return result.data;
};
exports.validateUserLoginRequest = validateUserLoginRequest;
