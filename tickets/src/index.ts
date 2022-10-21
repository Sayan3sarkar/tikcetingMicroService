import { createServer } from "http";

import { app } from "./app";
import { config } from "./config/config";
import { dbConnect } from "./database/mongoDB/db-connection";

const port = config.port;

const server = createServer(app);

const start = async () => {
  try {
    await dbConnect();
    server.listen(port, () => {
      console.log(`Tickets Service running on port ${port}!!`);
    });
  } catch (err) {
    console.log(`Error while running tickets service on port ${port}: ${err}`);
  }
};

start();
