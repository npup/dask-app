import { FastifyInstance, FastifyPluginOptions } from "fastify";

import todosHandler from "../demo/routes/todos";

export default function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  app.register(todosHandler, { prefix: "/todos" });
  done();
}
