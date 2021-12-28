import { initDb } from "./init/mongo";
import { initServer } from "./init/api-server";

async function main() {
  console.info(`Starting server..`);
  try {
    await initDb();
    await initServer();
    console.info(`All OK!`);
  } catch (err) {
    console.error("API server startup failure", err);
    process.exit(1);
  }
}

main();
