"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = exports.validateCreateUserRequestBody = exports.validateUpdateUserRequestBody = void 0;
const zod_1 = require("zod");
const errors_1 = __importDefault(require("./constants/errors"));
const format_zod_errors_1 = require("./helpers/format-zod-errors");
const errors_2 = require("./utils/errors");
const validateUpdateUserRequestBody = (requestBody) => {
    const schema = zod_1.z.object({
        firstName: zod_1.z
            .string()
            .min(3, { message: errors_1.default.FIRST_NAME_MIN_LENGTH })
            .optional(),
        lastName: zod_1.z
            .string()
            .min(3, { message: errors_1.default.LAST_NAME_MIN_LENGTH })
            .optional(),
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
exports.validateUpdateUserRequestBody = validateUpdateUserRequestBody;
const validateCreateUserRequestBody = (requestBody) => {
    const schema = zod_1.z.object({
        userId: zod_1.z.string(),
        firstName: zod_1.z.string().min(3, { message: errors_1.default.FIRST_NAME_REQUIRED }),
        lastName: zod_1.z.string().min(3, { message: errors_1.default.LAST_NAME_REQUIRED }),
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
exports.validateCreateUserRequestBody = validateCreateUserRequestBody;
const validateId = (providedId) => {
    if (!providedId)
        throw new errors_2.BadRequest(errors_1.default.INVALID_ID);
    return providedId;
};
exports.validateId = validateId;
