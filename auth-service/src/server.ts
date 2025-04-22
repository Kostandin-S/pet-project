import express, { Application } from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';

import errors from './constants/errors';
import { logRoutes } from './helpers/log-routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { internalAuthn } from './middlewares/internal-authn.middleware';
import routes from './routes';
import { InternalServerError } from './utils/errors';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (
  !process.env.SESSION_SECRET ||
  !process.env.PORT ||
  !process.env.DATABASE_URL ||
  !process.env.USER_SERVICE_URL
) {
  throw new InternalServerError(errors.ENV_VARS_MISSING);
}

const app: Application = express();
const pgSession = connectPgSimple(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      tableName: "Session",
      schemaName: "auth_service",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(routes);

app.use(errorMiddleware);

app.use(internalAuthn);

logRoutes(routes.stack);

app.listen(process.env.PORT, () => {
  console.log(`Auth service is up and running on port ${process.env.PORT}`);
});
