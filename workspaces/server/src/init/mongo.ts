import mongoose from "mongoose";
import { config } from "../config";

const DB_NAME = config.DB_NAME;
const DB_PORT = config.DB_PORT;
const DB_NETWORK_HOST = config.DB_NETWORK_HOST;

export async function initDb() {
  const connectionString = `mongodb://${DB_NETWORK_HOST}:${DB_PORT}/${DB_NAME}`;
  const dbInfo = { DB_NETWORK_HOST, DB_PORT, DB_NAME, connectionString };
  try {
    console.info("MongoDB connecting to", dbInfo);
    await mongoose.connect(connectionString, {});
    console.info("MongoDB connected");
  } catch (err) {
    console.error(
      "Failed connecting to MongoDB: ",
      (err as unknown as Error).message
    );
    throw err;
  }
}
