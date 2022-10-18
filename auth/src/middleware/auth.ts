import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { AuthService } from "../services/auth-service";
import { UserPayload } from "../types/userType";

const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.session?.jwt;

    if (!authToken) {
      return next();
    }

    const user = AuthService.validateToken(authToken) as UserPayload;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.session?.jwt;

    if (!authToken) {
      throw new NotAuthorizedError();
    }

    const user = AuthService.validateToken(authToken) as UserPayload;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export { currentUserMiddleware, authMiddleware };
