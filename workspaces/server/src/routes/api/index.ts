import { FastifyInstance, FastifyPluginOptions } from "fastify";

import itemsHandler from "./items";

export default function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  app.register(itemsHandler, { prefix: "/items" });
  done();
}
