import { authMiddleware, validateRequest } from "@sayan3sarkar-tickets/common";
import { Application, NextFunction, Request, Response } from "express";
import { body } from "express-validator";

export default (app: Application) => {
  app.post(
    "/api/tickets",
    authMiddleware,
    [
      body("title")
        .not()
        .isEmpty()
        .withMessage("Title must be a non empty value"),

      body("price")
        .isFloat({
          gt: 0,
        })
        .withMessage("Price must be a decimal greater than zero"),
    ],
    validateRequest,
    (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    }
  );
};
