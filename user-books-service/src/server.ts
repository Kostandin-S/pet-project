import express, { Application } from 'express';

import envVars from './constants/env-vars';
import { logRoutes } from './helpers/log-routes';
import {
  connectRabbitMQ,
  getChannel,
} from './messaging/rabbitmq';
import errorMiddleware from './middlewares/error.middleware';
import { internalAuthn } from './middlewares/internal-authn.middleware';
import {
  consumeBookDelete,
  consumeBookUpdates,
} from './queues/consumer';
import routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(internalAuthn);

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

const startServer = async () => {
  app.listen(envVars.PORT, () => {
    console.log(`User-Books service is up and running on port ${envVars.PORT}`);
  });

  await connectRabbitMQ(envVars.RABBITMQ_URL!);
  console.log("RabbitMQ connected and ready to consume");

  await consumeBookUpdates(envVars.QUEUE_BOOK_UPDATED);
  await consumeBookDelete(envVars.QUEUE_BOOK_DELETED);
};

startServer();

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  const channel = getChannel();
  await channel.close();
  process.exit(0);
});
