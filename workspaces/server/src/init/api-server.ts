import fastify, { FastifyInstance } from "fastify";
import { config } from "../config";
import api from "../routes";

const host = "0.0.0.0";
const port = config.API_SERVER_PORT;

const app = fastify({
  ignoreTrailingSlash: true,
});

app.register(api);

export function initServer(): Promise<FastifyInstance> {
  console.info(`API server starting...`);
  return new Promise((res, rej) => {
    app.listen({ host, port }, (err, address) => {
      if (err) {
        console.error(
          "Failed starting API server: ",
          (err as unknown as Error).message
        );
        return rej(err);
      }
      console.log(`API server listening on ${address}`);
      res(app);
    });
  });
}
