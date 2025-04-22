"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
const axios_1 = __importDefault(require("axios"));
const http_methods_1 = require("../../enums/http-methods");
const internal_errors_handler_1 = require("../../helpers/internal-errors-handler");
const jwt_helper_1 = require("../../helpers/jwt.helper");
const getBooks = async (params) => {
    try {
        const response = await (0, axios_1.default)({
            method: http_methods_1.HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${(0, jwt_helper_1.generateToken)()}`,
            },
            url: process.env.BOOK_SERVICE_URL,
            params,
        });
        return response.data;
    }
    catch (error) {
        const errorData = error;
        const errorResponse = errorData.response;
        throw (0, internal_errors_handler_1.internalErrorHandlers)(errorResponse);
    }
};
exports.getBooks = getBooks;
