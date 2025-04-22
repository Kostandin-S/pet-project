"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = __importDefault(require("./constants/errors"));
const log_routes_1 = require("./helpers/log-routes");
const rabbitmq_1 = require("./messaging/rabbitmq");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const internal_authn_middleware_1 = require("./middlewares/internal-authn.middleware");
const consumer_1 = require("./queues/consumer");
const routes_1 = __importDefault(require("./routes"));
const errors_2 = require("./utils/errors");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
if (!process.env.PORT ||
    !process.env.DATABASE_URL ||
    !process.env.JWT_SECRET ||
    !process.env.RABBITMQ_URL ||
    !process.env.QUEUE_BOOK_UPDATED) {
    throw new errors_2.InternalServerError(errors_1.default.ENV_VARS_MISSING);
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(internal_authn_middleware_1.internalAuthn);
app.use(routes_1.default);
app.use(error_middleware_1.default);
(0, log_routes_1.logRoutes)(routes_1.default.stack);
const startServer = async () => {
    app.listen(process.env.PORT, () => {
        console.log(`User-Books service is up and running on port ${process.env.PORT}`);
    });
    await (0, rabbitmq_1.connectRabbitMQ)(process.env.RABBITMQ_URL);
    console.log("RabbitMQ connected and ready to consume");
    await (0, consumer_1.consumeBookUpdates)(process.env.QUEUE_BOOK_UPDATED);
};
startServer();
process.on("SIGINT", async () => {
    console.log("Shutting down...");
    const channel = (0, rabbitmq_1.getChannel)();
    await channel.close();
    process.exit(0);
});
