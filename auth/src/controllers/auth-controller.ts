import { NextFunction, Request, Response } from "express";

const fetchCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

const signInUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

const signUpUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  res.send("Hi there");
};

const signOutUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

export { fetchCurrentUser, signInUser, signUpUser, signOutUser };
