import express, { Application } from 'express';
import { Server } from 'http';

import logger from './config/logger';
import envVars from './constants/env-vars';
import { logRoutes } from './helpers/log-routes';
import { connectRabbitMQ } from './messaging/rabbitmq';
import errorMiddleware from './middlewares/error.middleware';
import { internalAuthn } from './middlewares/internal-authn.middleware';
import {
  consumeBookDelete,
  consumeBookUpdates,
  consumeUserDelete,
} from './queues/consumer';
import routes from './routes';

let server: Server;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(internalAuthn);

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

const startServer = async () => {
  try {
    server = app.listen(envVars.PORT, () => {
      logger.info(
        `User-Books service is up and running on port ${envVars.PORT}`
      );
    });

    await connectRabbitMQ(envVars.RABBITMQ_URL);
    logger.info("RabbitMQ connected and ready to consume");

    await consumeBookUpdates(envVars.QUEUE_BOOK_UPDATED);
    logger.info("RabbitMQ connected and ready to act upon book update event");

    await consumeBookDelete(envVars.QUEUE_BOOK_DELETED);
    logger.info("RabbitMQ connected and ready to act upon book delete event");

    await consumeUserDelete(envVars.QUEUE_USER_DELETED);
    logger.info("RabbitMQ connected and ready to act upon user delete event");
  } catch (error) {
    logger.error("Error starting server or connecting to RabbitMQ:", error);
    process.exit(1);
  }
};

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error("Unexpected error:", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);

startServer();
