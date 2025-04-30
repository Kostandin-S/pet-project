import {
  Request,
  Response,
  Router,
} from 'express';

import { HttpStatusCode } from '../enums/http-status-code';

const router = Router();

router.route("/health").get((_req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    service: "User-books",
    status: HttpStatusCode.OK,
  });
});

export default router;
