import fastify from "fastify";
import { initDb } from "./db/init-mongo";
import { config } from "./config";

const PORT = config.API_SERVER_PORT;

const app = fastify({
  ignoreTrailingSlash: true,
});

import api from "./routes";
app.register(api);

initDb()
  .then((dbInfo) => {
    // db connection initialized ok - start api server
    app.listen({ host: "0.0.0.0", port: PORT }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.info(
        `DB config  is: ${JSON.stringify(dbInfo, null, 2)}
API server listening on ${address}`
      );
    });
  })
  .catch((err) => {
    // db connection initialization failed
    console.error(err);
    process.exit(1);
  });
