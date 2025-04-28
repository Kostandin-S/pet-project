import { Request, Response } from "express";
import { HttpStatusCode } from "axios";

import logger from "../config/logger";

export const setCustomError = (
  req: Request,
  res: Response,
  errorMsg: string
) => {
  logger.error(`Proxy error for ${req.method} ${req.originalUrl}`);

  if (!res.headersSent) {
    res.status(HttpStatusCode.GatewayTimeout).send({
      error: errorMsg,
      message: `The service could not process the request to ${req.method} ${req.originalUrl}`,
    });
  }
};
