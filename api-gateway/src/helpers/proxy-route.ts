import { Request, RequestHandler, Response, Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import logger from "../config/logger";
import { setCustomError } from "./set-custom-error";
import { setHeadersObject } from "./set-headers-object";

export function proxyRoute(
  router: Router,
  path: string,
  target: string,
  errorMsg: string,
  ...middleware: RequestHandler[]
) {
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    timeout: 30000,
    proxyTimeout: 30000,
    on: {
      proxyReq: (proxyReq, req) => {
        logger.info(
          `Proxying request to ${target}${(req as Request).originalUrl}`
        );
        logger.debug(`Request headers: ${JSON.stringify(req.headers)}`);

        setHeadersObject(proxyReq);
      },
      error: (_error, req, res) =>
        setCustomError(req as Request, res as Response, errorMsg),
      proxyRes: (proxyRes, req, _res) => {
        logger.info(
          `Proxy response status: ${proxyRes.statusCode} for ${
            (req as Request).originalUrl
          }`
        );
        logger.debug(`Response headers: ${JSON.stringify(proxyRes.headers)}`);
      },
    },
  });

  router.use(path, ...middleware, proxy);
}
