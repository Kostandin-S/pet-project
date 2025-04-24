import express, { Application } from "express";
import dotenv from "dotenv";

import errors from "./constants/errors";
import { logRoutes } from "./helpers/log-routes";
import { connectRabbitMQ, getChannel } from "./messaging/rabbitmq";
import errorMiddleware from "./middlewares/error.middleware";
import { internalAuthn } from "./middlewares/internal-authn.middleware";
import { consumeBookUpdates } from "./queues/consumer";
import routes from "./routes";
import { InternalServerError } from "./utils/errors";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (
  !process.env.PORT ||
  !process.env.DATABASE_URL ||
  !process.env.JWT_SECRET ||
  !process.env.RABBITMQ_URL ||
  !process.env.QUEUE_BOOK_UPDATED ||
  !process.env.QUEUE_BOOKS_RECOMMENDATIONS
) {
  throw new InternalServerError(errors.ENV_VARS_MISSING);
}

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(internalAuthn);

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

const startServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(
      `User-Books service is up and running on port ${process.env.PORT}`
    );
  });

  await connectRabbitMQ(process.env.RABBITMQ_URL!);
  console.log("RabbitMQ connected and ready to consume");

  await consumeBookUpdates(process.env.QUEUE_BOOK_UPDATED!);
};

startServer();

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  const channel = getChannel();
  await channel.close();
  process.exit(0);
});
