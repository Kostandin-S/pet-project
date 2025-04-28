import express, { Application } from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Server } from 'http';

import logger from './config/logger';
import envVars from './constants/env-vars';
import { logRoutes } from './helpers/log-routes';
import { connectRabbitMQ } from './messaging/rabbitmq';
import { errorMiddleware } from './middlewares/error.middleware';
import { interServiceAuthn } from './middlewares/inter-service-authn.middleware';
import { consumeUserDelete } from './queues/consumer';
import routes from './routes';

let server: Server;

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

app.use(interServiceAuthn);

logRoutes(routes.stack);

const startServer = async () => {
  try {
    server = app.listen(envVars.PORT, () => {
      console.log(`Auth service is up and running on port ${envVars.PORT}`);
    });

    await connectRabbitMQ(envVars.RABBITMQ_URL);
    logger.info("RabbitMQ connected and ready to consume");

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
