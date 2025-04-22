import express, { Application } from 'express';
import dotenv from 'dotenv';

import errors from './constants/errors';
import { logRoutes } from './helpers/log-routes';
import { connectRabbitMQ } from './messaging/rabbitmq';
import errorMiddleware from './middlewares/error.middleware';
import routes from './routes';
import { InternalServerError } from './utils/errors';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (
  !process.env.PORT ||
  !process.env.DATABASE_URL ||
  !process.env.RABBITMQ_URL ||
  !process.env.QUEUE_BOOK_UPDATED
) {
  throw new InternalServerError(errors.ENV_VARS_MISSING);
}

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

const startServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Book service is up and running on port ${process.env.PORT}`);
  });

  await connectRabbitMQ(process.env.RABBITMQ_URL!);
  console.log("RabbitMQ connected and ready to publish");
};

startServer();
