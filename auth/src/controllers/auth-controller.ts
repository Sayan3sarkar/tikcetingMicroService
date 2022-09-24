import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from "../errors/db-conn-error";

const fetchCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

const signInUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    throw new DatabaseConnectionError();
    // res.send("Hi there");
  } catch (err) {
    next(err);
  }
};

const signOutUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

export { fetchCurrentUser, signInUser, signUpUser, signOutUser };
