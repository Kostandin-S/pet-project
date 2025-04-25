import express from "express";

import envVars from "./constants/env-vars";
import { ErrorMessages } from "./constants/errors";
import { RouterPaths } from "./constants/routes";
import { proxyRoute } from "./helpers/proxy-route";
import { validateSession } from "./middlewares/validate-session.middleware";

const router = express.Router();

proxyRoute(
  router,
  RouterPaths.AUTH,
  envVars.AUTH_SERVICE_URL,
  ErrorMessages.AUTH_SERVICE_UNAVAILABLE
);
proxyRoute(
  router,
  RouterPaths.USERS,
  envVars.USER_SERVICE_URL,
  ErrorMessages.USER_SERVICE_UNAVAILABLE,
  validateSession
);
proxyRoute(
  router,
  RouterPaths.BOOKS,
  envVars.BOOK_SERVICE_URL,
  ErrorMessages.BOOK_SERVICE_UNAVAILABLE,
  validateSession
);
proxyRoute(
  router,
  RouterPaths.USER_BOOKS,
  envVars.USER_BOOKS_SERVICE_URL,
  ErrorMessages.USER_BOOKS_SERVICE_UNAVAILABLE,
  validateSession
);

export default router;
