import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err && process.env.NODE_ENV !== "TESTING") {
    console.log(err);

    return res.status(500).send(err);
  }
}

function signUpErrorHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      console.log("No Errors");
      return next();
    }
    return res.status(400).send(errors);
  } catch (err) {
    console.log(`Error in validation while signing up user: ${err}`);
    next(err);
  }
}

export { errorHandler, signUpErrorHandler };
