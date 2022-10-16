import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { AuthService } from "../services/auth-service";

const fetchCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

const signInUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const authService = new AuthService(email);
    const existingUser = await authService.fetchUserByEmail();

    if (existingUser) {
      throw new BadRequestError(
        "Entered email already in use. Please use any other email"
      );
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const user = await authService.registerUser(hashedPassword);

    const authToken = authService.generateJWT(user.id, user.email);
    req.session = {
      jwt: authToken,
    };

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

const signOutUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi there");
};

export { fetchCurrentUser, signInUser, signUpUser, signOutUser };
