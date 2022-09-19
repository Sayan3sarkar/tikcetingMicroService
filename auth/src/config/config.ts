import * as dotenv from "dotenv";
import { join } from "path";

const envPath = join(__dirname, "../..", ".env");
dotenv.config({
  path: envPath,
});

const env = process.env;

const config = {
  port: env.AUTH_PORT,
};

export { config };
