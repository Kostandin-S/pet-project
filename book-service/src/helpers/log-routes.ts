import { IRouter } from 'express';

import logger from '../config/logger';

export const logRoutes = (routes: IRouter["stack"]) => {
  console.log("\n=== Book Service Routes ===");

  routes.forEach((route) => {
    const method = route?.route?.stack[0].method.toUpperCase();
    const path = route?.route?.path;

    if (path && method) {
      logger.info(`${method} - ${path}`);
    }
  });
};
