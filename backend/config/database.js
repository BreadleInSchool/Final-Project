import mongoose from "mongoose";
import config from "./index.js";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("Database error:", err.message);
    process.exit(1);
  }
};
