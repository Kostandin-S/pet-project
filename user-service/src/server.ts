import express, { Application } from 'express';
import dotenv from 'dotenv';

import errors from './constants/errors';
import { logRoutes } from './helpers/log-routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { internalAuthn } from './middlewares/internal-authn.middleware';
import routes from './routes';
import { InternalServerError } from './utils/errors';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (!process.env.PORT || !process.env.DATABASE_URL) {
  throw new InternalServerError(errors.ENV_VARS_MISSING);
}

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(internalAuthn);

app.use(routes);

app.use(errorMiddleware);

logRoutes(routes.stack);

app.listen(process.env.PORT, () => {
  console.log(`User service is up and running on port ${process.env.PORT}`);
});
