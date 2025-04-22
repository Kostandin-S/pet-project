"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    BOOK_SERVICE_URL: process.env.BOOK_SERVICE_URL,
};
