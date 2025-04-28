import express, {
  Application,
  Request,
  Response,
} from 'express';
import { Server } from 'http';

import logger from './config/logger';
import envVars from './constants/env-vars';
import { HttpStatusCode } from './enums/http-status-code';
import { connectRabbitMQ } from './messaging/rabbitmq';
import { consumeBookRecommendations } from './queues/consumer';

let server: Server;

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    service: "Notification",
    status: HttpStatusCode.OK,
  });
});

const startServer = async () => {
  try {
    server = app.listen(envVars.PORT, () => {
      logger.info(
        `Notification service is up and running on port ${envVars.PORT}`
      );
    });

    await connectRabbitMQ(envVars.RABBITMQ_URL);
    logger.info("RabbitMQ connected and ready to consume");

    await consumeBookRecommendations(envVars.QUEUE_BOOKS_RECOMMENDATIONS);
    logger.info("Book recommendations queue is connected and ready to consume");
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
