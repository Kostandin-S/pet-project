import express, { Request, Response } from "express";

import envVars from "./constants/env-vars";
import errors from "./constants/errors";
import routes from "./constants/routes";
import { HttpStatusCode } from "./enums/http-status-code";
import proxyRouter from "./proxyRouter";
import { InternalServerError } from "./utils/errors";

if (
  !envVars.PORT ||
  !envVars.AUTH_SERVICE_URL ||
  !envVars.USER_SERVICE_URL ||
  !envVars.BOOK_SERVICE_URL
) {
  throw new InternalServerError(errors.ENV_VARS_MISSING);
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get(routes.HEALTH, (_req: Request, res: Response) => {
  res.sendStatus(HttpStatusCode.OK);
});

app.use(routes.BASE_PATH, proxyRouter);

const server = app.listen(envVars.PORT, () => {
  console.log(`Gateway is listening on Port ${envVars.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", exitHandler);
process.on("SIGINT", exitHandler);
