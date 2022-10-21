import mongoose from "mongoose";
import { config } from "../../config/config";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      `${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.name}`
    );
    console.log(`Connected to ${config.mongodb.name} DB`);
  } catch (err) {
    console.log(`Error while connecting to DB: ${err}`);
  }
};
