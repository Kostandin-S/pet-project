"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalAuthn = void 0;
const errors_1 = __importDefault(require("../constants/errors"));
const jwt_helper_1 = require("../helpers/jwt.helper");
const errors_2 = require("../utils/errors");
const extractTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return undefined;
    const [type, token] = authHeader.split(" ");
    return type.toLowerCase() !== "bearer" ? undefined : token;
};
const internalAuthn = async (req, _, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) {
        next(new errors_2.NotAuthenticated(errors_1.default.NO_TOKEN_PROVIDED));
        return;
    }
    (0, jwt_helper_1.decodeToken)(token, next);
    next();
};
exports.internalAuthn = internalAuthn;
