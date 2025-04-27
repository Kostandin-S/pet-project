import express, { Application } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import logger from "./config/logger";
import envVars from "./constants/env-vars";
import { logRoutes } from "./helpers/log-routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { internalAuthn } from "./middlewares/internal-authn.middleware";
import routes from "./routes";

const app: Application = express();
const pgSession = connectPgSimple(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      conString: envVars.DATABASE_URL,
      tableName: "Session",
      schemaName: "auth_service",
    }),
    secret: envVars.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // TODO: Make true when in prod
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(routes);

app.use(errorMiddleware);

app.use(internalAuthn);

logRoutes(routes.stack);

const server = app.listen(envVars.PORT, () => {
  console.log(`Auth service is up and running on port ${envVars.PORT}`);
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
