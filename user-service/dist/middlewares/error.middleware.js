"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const errors_1 = require("../utils/errors");
const errorMiddleware = (error, _req, res, _next) => {
    logger_1.default.error(error);
    if (error instanceof errors_1.BaseError) {
        res.status(error.code).json(error.generateHttpResponse());
        return;
    }
    const fallbackError = new errors_1.InternalServerError(error);
    res.status(fallbackError.code).json(fallbackError.generateHttpResponse());
};
exports.errorMiddleware = errorMiddleware;
