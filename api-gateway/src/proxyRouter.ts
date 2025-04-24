import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

import envVars from "./constants/env-vars";
import routes from "./constants/routes";
import { setHeadersObject } from "./helpers/set-headers-object";
import { validateSession } from "./middlewares/validate-session.middleware";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const router = express.Router();

router.use(
  routes.AUTH,
  createProxyMiddleware({
    target: envVars.AUTH_SERVICE_URL,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq: (proxyReq) => setHeadersObject(proxyReq),
    },
  })
);

router.use(
  routes.USERS,
  validateSession,
  createProxyMiddleware({
    target: envVars.USER_SERVICE_URL,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq: (proxyReq) => setHeadersObject(proxyReq),
    },
  })
);

router.use(
  routes.BOOKS,
  validateSession,
  createProxyMiddleware({
    target: envVars.BOOK_SERVICE_URL,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq: (proxyReq) => setHeadersObject(proxyReq),
    },
  })
);

router.use(
  routes.USER_BOOKS,
  validateSession,
  createProxyMiddleware({
    target: envVars.USER_BOOKS_SERVICE_URL,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq: (proxyReq) => setHeadersObject(proxyReq),
    },
  })
);

export default router;
