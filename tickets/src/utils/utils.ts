import mongoose from "mongoose";

const generateRandomMongooseHexId = () =>
  new mongoose.Types.ObjectId().toHexString();

export { generateRandomMongooseHexId };
