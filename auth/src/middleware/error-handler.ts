import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/custom-error";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err && process.env.NODE_ENV !== "TESTING") {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
  }
}

export { errorHandler };
