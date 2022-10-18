import * as dotenv from "dotenv";
import { join } from "path";

const envPath = join(__dirname, "../..", ".env");
dotenv.config({
  path: envPath,
});

const env = process.env;

const config = {
  port: env.AUTH_PORT,
  mongodb: {
    host: "mongodb://auth-mongo-svc",
    port: env.MONGO_PORT,
    name: env.DB_NAME,
  },
  jwtSecret: process.env.JWT_KEY as string,
};

export { config };
