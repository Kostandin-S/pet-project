"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const axios_1 = __importDefault(require("axios"));
const env_vars_1 = __importDefault(require("../constants/env-vars"));
const errors_1 = __importDefault(require("../constants/errors"));
const http_methods_1 = require("../enums/http-methods");
const jwt_helper_1 = require("../helpers/jwt.helper");
const errors_2 = require("../utils/errors");
const validateSession = async (req, _res, next) => {
    const cookie = req.headers?.cookie;
    if (!cookie) {
        next(new errors_2.NotAuthenticated(errors_1.default.N0_SESSION_FOUND));
        return;
    }
    try {
        const response = await (0, axios_1.default)({
            method: http_methods_1.HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${(0, jwt_helper_1.generateToken)()}`,
                Cookie: cookie,
            },
            url: `${env_vars_1.default.AUTH_SERVICE_URL}/validate-session`,
        });
        req.headers["x-user-id"] = response.data.userId;
        req.headers["x-user-role"] = response.data.isAdmin ? "admin" : "user";
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.validateSession = validateSession;
