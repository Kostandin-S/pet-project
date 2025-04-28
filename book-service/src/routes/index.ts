import { Router } from 'express';

import * as controller from '../books.controller';
import { authzMiddleware } from '../middlewares/authz.middleware';
import reqBodyExists from '../middlewares/req-body-exists.middleware';
import healthRouter from './health';

const router = Router();

router.use(healthRouter);

router.route("/").post(authzMiddleware, reqBodyExists, controller.addBook);
router.route("/").get(controller.getBooks);
router.route("/:id").get(controller.getBookById);
router
  .route("/:id")
  .patch(authzMiddleware, reqBodyExists, controller.updateBook);
router.route("/:id").delete(authzMiddleware, controller.deleteBook);
router.route("/recommendations").get(controller.recommendBooks);

export default router;
