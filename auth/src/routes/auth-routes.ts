import { Application } from "express";
import { body } from "express-validator";
import {
  fetchCurrentUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../controllers/auth-controller";
import { signUpErrorHandler } from "../middleware/error-handler";

export default (app: Application) => {
  app.get("/api/users/currentUser", fetchCurrentUser);
  app.post("/api/users/signIn", signInUser);
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
    signUpErrorHandler,
    signUpUser
  );
  app.post("/api/users/signOut", signOutUser);
};
