import express, {
  Application,
  Request,
  Response,
} from 'express';
import { HttpStatusCode } from 'axios';

import logger from './config/logger';
import envVars from './constants/env-vars';
import { RouterPaths } from './constants/routes';
import { errorMiddleware } from './middlewares/error.middleware';
import proxyRouter from './proxyRouter';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.get(RouterPaths.HEALTH, (_req: Request, res: Response) => {
  res.sendStatus(HttpStatusCode.Ok);
});

app.use(RouterPaths.BASE_PATH, proxyRouter);

app.use(errorMiddleware);

const server = app.listen(envVars.PORT, () => {
  logger.info(`Gateway is listening on Port ${envVars.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
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
