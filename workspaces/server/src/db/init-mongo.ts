import mongoose from "mongoose";
import { config } from "../config";

const DB_NAME = config.DB_NAME;
const DB_PORT = config.DB_PORT;
const DB_NETWORK_HOST = config.DB_NETWORK_HOST;

export async function initDb() {
  const dbInfo = { DB_NETWORK_HOST, DB_PORT, DB_NAME };
  //console.log("Connecting to MongoDB", dbInfo);
  return new Promise((res, rej) => {
    mongoose
      .connect(`mongodb://${DB_NETWORK_HOST}:${DB_PORT}/${DB_NAME}`, {})
      .then(() => {
        console.log("MongoDB connected!");
        res(dbInfo);
      })
      .catch((err) => {
        console.error("Failed connecting to MongoDB:", { err, dbInfo });
        rej(err);
      });
  });
}
