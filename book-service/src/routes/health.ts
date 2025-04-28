import { HttpStatusCode } from "axios";
import { Request, Response, Router } from "express";

const router = Router();

router.route("/health").get((_req: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json({
    service: "Book",
    status: HttpStatusCode.Ok,
  });
});

export default router;
