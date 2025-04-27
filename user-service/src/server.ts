import express, { Application } from "express";

import envVars from "./constants/env-vars";
import { logRoutes } from "./helpers/log-routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { internalAuthn } from "./middlewares/internal-authn.middleware";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(internalAuthn);

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

app.listen(envVars.PORT, () => {
  console.log(`User service is up and running on port ${envVars.PORT}`);
});
