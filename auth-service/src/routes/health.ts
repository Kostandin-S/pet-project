import { HttpStatusCode } from "axios";
import { Request, Response, Router } from "express";

import routes from "../constants/routes";

const router = Router();

router.route(routes.HEALTH).get((_req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json({
    service: "Auth",
    status: HttpStatusCode.Ok,
  });
});

export default router;
