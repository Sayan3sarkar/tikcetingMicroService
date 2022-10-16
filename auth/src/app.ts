import cookieSession from "cookie-session";
import express from "express";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middleware/error-handler";

import authRoutes from "./routes/auth-routes";
const app = express();

app.set("trust proxy", true); // Traffic is proxied into our service through ingress-nginx.
// Express realises that stuff is a proxy and may not be able to trust the https connection.
// Thus enabling this to true helps express to allow the request

app.use(express.json());
app.use(
  cookieSession({
    signed: false, // no need to encrypt data as any way we are storing JWT inside cookie. JWT's are tamper resistant
    secure: true, // only accept https connectiion
  })
);

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
