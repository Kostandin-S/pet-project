"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBookInGoogleBooks = void 0;
const axios_1 = __importDefault(require("axios"));
const http_methods_1 = require("../../../enums/http-methods");
const errors_1 = require("../../../utils/errors");
const searchBookInGoogleBooks = async (params) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${params.title}+inauthor:${params.author}`;
    try {
        const response = await (0, axios_1.default)({
            method: http_methods_1.HttpMethod.GET,
            url,
        });
        return response.data;
    }
    catch (error) {
        throw new errors_1.InternalServerError(error);
    }
};
exports.searchBookInGoogleBooks = searchBookInGoogleBooks;
