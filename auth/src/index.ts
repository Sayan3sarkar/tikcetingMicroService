import { createServer } from "http";

import { app } from "./app";
import { config } from "./config/config";

const port = config.port;

const server = createServer(app);

try {
  server.listen(port, () => {
    console.log(`Auth Service running on port ${port}!!`);
  });
} catch (err) {
  console.log(`Error while running auth service on port ${port}: ${err}`);
}
