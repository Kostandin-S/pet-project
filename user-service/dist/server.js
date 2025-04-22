"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = __importDefault(require("./constants/errors"));
const log_routes_1 = require("./helpers/log-routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const internal_authn_middleware_1 = require("./middlewares/internal-authn.middleware");
const routes_1 = __importDefault(require("./routes"));
const errors_2 = require("./utils/errors");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
if (!process.env.PORT || !process.env.DATABASE_URL) {
    throw new errors_2.InternalServerError(errors_1.default.ENV_VARS_MISSING);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(internal_authn_middleware_1.internalAuthn);
app.use(routes_1.default);
app.use(error_middleware_1.errorMiddleware);
(0, log_routes_1.logRoutes)(routes_1.default.stack);
app.listen(process.env.PORT, () => {
    console.log(`User service is up and running on port ${process.env.PORT}`);
});
