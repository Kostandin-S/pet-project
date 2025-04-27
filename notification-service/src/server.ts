import express, { Application, Request, Response } from "express";

import envVars from "./constants/env-vars";
import { HttpStatusCode } from "./enums/http-status-code";
import { connectRabbitMQ, getChannel } from "./messaging/rabbitmq";
import { consumeBookRecommendations } from "./queues/consumer";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    service: "Notification",
    status: HttpStatusCode.OK,
  });
});

const startServer = async () => {
  app.listen(envVars.PORT, () => {
    console.log(
      `Notification service is up and running on port ${envVars.PORT}`
    );
  });

  await connectRabbitMQ(envVars.RABBITMQ_URL!);
  console.log("RabbitMQ connected and ready to consume");

  await consumeBookRecommendations(envVars.QUEUE_BOOKS_RECOMMENDATIONS!);
};

startServer();

// TODO: Improve server.ts
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  const channel = getChannel();
  await channel.close();
  process.exit(0);
});
