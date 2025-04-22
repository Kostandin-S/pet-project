import { Router } from 'express';

import { authzMiddleware } from '../middlewares/authz.middleware';
import { reqBodyExists } from '../middlewares/req-body-exists.middleware';
import * as controller from '../users.controller';
import healthRouter from './health';

const router = Router();

router.use(healthRouter);

router.route("/").get(authzMiddleware, controller.getUsers);
router.route("/").post(reqBodyExists, controller.createUser);
router.route("/:id").get(authzMiddleware, controller.getUserById);
router
  .route("/:id")
  .patch(authzMiddleware, reqBodyExists, controller.updateUser);
router.route("/:id").delete(authzMiddleware, controller.deleteUser);

export default router;
