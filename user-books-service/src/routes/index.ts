import { Router } from "express";

import reqBodyExists from "../middlewares/req-body-exists.middleware";
import * as controller from "../user-books.controller";
import healthRouter from "./health";

const router = Router();

router.use(healthRouter);
router.route("/").post(reqBodyExists, controller.addUserBook);
router.route("/").get(controller.getUserBooks);
router.route("/:id").get(controller.getUserBookById);
router.route("/:id").patch(reqBodyExists, controller.updateUserBook);
router.route("/:id").delete(controller.deleteUserBook);

export default router;
