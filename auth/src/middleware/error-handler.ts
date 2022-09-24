import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/custom-error";
import { RequestValidationError } from "../errors/request-validation-error";

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

function signUpErrorHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    throw new RequestValidationError(errors.array());
  } catch (err) {
    console.log(`Error in validation while signing up user: ${err}`);
    next(err);
  }
}

export { errorHandler, signUpErrorHandler };
