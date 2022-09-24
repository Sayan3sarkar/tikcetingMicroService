import express from "express";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";

import authRoutes from "./routes/auth-routes";
const app = express();

app.use(express.json());

authRoutes(app);

//Wild card route for wrong routes
app.all("*", async (req, res, next) => {
  try {
    throw new NotFoundError();
  } catch (err) {
    next(err);
  }
});
app.use(errorHandler);

export { app };
