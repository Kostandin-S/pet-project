"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const dotenv_1 = __importDefault(require("dotenv"));
const env_vars_1 = __importDefault(require("./constants/env-vars"));
const routes_1 = __importDefault(require("./constants/routes"));
const validate_session_middleware_1 = require("./middlewares/validate-session.middleware");
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(routes_1.default.AUTH, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: env_vars_1.default.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { [`^${routes_1.default.BASE_PATH}${routes_1.default.AUTH}`]: "" },
}));
router.use(routes_1.default.USERS, validate_session_middleware_1.validateSession, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: env_vars_1.default.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { [`^${routes_1.default.BASE_PATH}${routes_1.default.USERS}`]: "" },
}));
router.use(routes_1.default.BOOKS, validate_session_middleware_1.validateSession, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: env_vars_1.default.BOOK_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { [`^${routes_1.default.BASE_PATH}${routes_1.default.BOOKS}`]: "" },
}));
exports.default = router;
