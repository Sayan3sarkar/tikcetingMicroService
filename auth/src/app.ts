import express from "express";
import { config } from "./config/config";
import { errorHandler } from "./middleware/error-handler";

import authRoutes from "./routes/auth-routes";
const app = express();

app.use(express.json());

authRoutes(app);

app.use(errorHandler);

export { app };
