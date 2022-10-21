import { authMiddleware } from "@sayan3sarkar-tickets/common";
import { Application, NextFunction, Request, Response } from "express";

export default (app: Application) => {
  app.post(
    "/api/tickets",
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    }
  );
};
