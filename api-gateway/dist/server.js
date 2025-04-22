"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_vars_1 = __importDefault(require("./constants/env-vars"));
const errors_1 = __importDefault(require("./constants/errors"));
const routes_1 = __importDefault(require("./constants/routes"));
const http_status_code_1 = require("./enums/http-status-code");
const proxyRouter_1 = __importDefault(require("./proxyRouter"));
const errors_2 = require("./utils/errors");
if (!env_vars_1.default.PORT ||
    !env_vars_1.default.AUTH_SERVICE_URL ||
    !env_vars_1.default.USER_SERVICE_URL ||
    !env_vars_1.default.BOOK_SERVICE_URL) {
    throw new errors_2.InternalServerError(errors_1.default.ENV_VARS_MISSING);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default.BASE_PATH, proxyRouter_1.default);
app.get(routes_1.default.HEALTH, (_req, res) => {
    res.sendStatus(http_status_code_1.HttpStatusCode.OK);
});
const server = app.listen(env_vars_1.default.PORT, () => {
    console.log(`Gateway is listening on Port ${env_vars_1.default.PORT}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);
