import { Application } from "express";
import { body } from "express-validator";
import {
  fetchCurrentUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../controllers/auth-controller";
import {
  // authMiddleware,
  currentUserMiddleware,
  validateRequest,
} from "@sayan3sarkar-tickets/common";

export default (app: Application) => {
  app.get(
    "/api/users/currentUser",
    currentUserMiddleware,
    // authMiddleware,
    fetchCurrentUser
  );

  app.post(
    "/api/users/signUp",
    [
      body("email").isEmail().withMessage("Please Enter a valid email"),
      body("password")
        .trim()
        .isLength({
          min: 8,
          max: 64,
        })
        .withMessage("Password must be within 8 and 64 characters"),
    ],
    validateRequest,
    signUpUser
  );

  app.post(
    "/api/users/signIn",
    [
      body("email").isEmail().withMessage("Please Enter a valid email"),
      body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password"),
    ],
    validateRequest,
    signInUser
  );

  app.post("/api/users/signOut", signOutUser);
};
