import { Router } from "express";

import * as controller from "../auth.controller";
import routes from "../constants/routes";
import { reqBodyExists } from "../middlewares/req-body-exists.middleware";
import healthRouter from "./health";

const router = Router();

router.use(healthRouter);
router.route(routes.REGISTER).post(reqBodyExists, controller.registerUser);
router.route(routes.LOGIN).post(reqBodyExists, controller.loginUser);
router.route(routes.LOGOUT).delete(controller.logoutUser);
router.route(routes.SESSION_VALIDATION).get(controller.validateSession);

export default router;
