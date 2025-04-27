import express, { Application } from "express";

import envVars from "./constants/env-vars";
import { logRoutes } from "./helpers/log-routes";
import { connectRabbitMQ } from "./messaging/rabbitmq";
import errorMiddleware from "./middlewares/error.middleware";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

// TODO: Improve server.ts
const startServer = async () => {
  app.listen(envVars.PORT, () => {
    console.log(`Book service is up and running on port ${envVars.PORT}`);
  });

  await connectRabbitMQ(envVars.RABBITMQ_URL!);
  console.log("RabbitMQ connected and ready to publish");
};

startServer();
