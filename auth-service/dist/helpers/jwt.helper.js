"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = __importDefault(require("../constants/errors"));
const errors_2 = require("../utils/errors");
const generateToken = () => {
    if (!process.env.JWT_SECRET) {
        throw new errors_2.InternalServerError(errors_1.default.ENV_VARS_MISSING);
    }
    const payload = {
        iss: "auth-service",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 300, // 5 min
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
const decodeToken = (token, next) => {
    if (!process.env.JWT_SECRET) {
        next(new errors_2.InternalServerError(errors_1.default.ENV_VARS_MISSING));
        return;
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const now = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < now) {
        next(new errors_2.NotAuthorized(errors_1.default.TOKEN_HAS_EXPIRED));
        return;
    }
};
exports.decodeToken = decodeToken;
