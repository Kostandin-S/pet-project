import express, { Request, Response } from "express";

import envVars from "./constants/env-vars";
import errors from "./constants/errors";
import { HttpStatusCode } from "./enums/http-status-code";
import { connectRabbitMQ, getChannel } from "./messaging/rabbitmq";
import { consumeBookRecommendations } from "./queues/consumer";
import { InternalServerError } from "./utils/errors";

if (
  !envVars.PORT ||
  !envVars.JWT_SECRET ||
  !envVars.QUEUE_BOOKS_RECOMMENDATIONS ||
  !envVars.RABBITMQ_URL
) {
  throw new InternalServerError(errors.ENV_VARS_MISSING);
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  res.sendStatus(HttpStatusCode.OK);
});

const startServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Notification service is up and running on port ${process.env.PORT}`
    );
  });

  await connectRabbitMQ(process.env.RABBITMQ_URL!);
  console.log("RabbitMQ connected and ready to consume");

  await consumeBookRecommendations(envVars.QUEUE_BOOKS_RECOMMENDATIONS!);
};

startServer();

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  const channel = getChannel();
  await channel.close();
  process.exit(0);
});
