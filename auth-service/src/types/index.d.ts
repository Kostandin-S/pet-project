import { User } from "@prisma/client";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    isAdmin?: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
