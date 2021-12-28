import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { TodoItem } from "../models/TodoItem";

export default function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  app.get("/", async (req, repl) => {
    const todos = await TodoItem.find();
    return todos;
  });

  app.post<{ Body: { name: string } }>("/", async (req, repl) => {
    const todo = new TodoItem({
      name: req.body.name,
    });
    const savedTodo = await todo.save();
    return savedTodo;
  });

  app.delete<{ Params: { id: string } }>("/:id", async (req, repl) => {
    const { id } = req.params;
    const todo = await TodoItem.findByIdAndDelete(id);
    console.log("deleted", { id, todo });
    if (!todo) {
      repl.code(404).send(null);
    }
    return todo;
  });

  app.get<{ Params: { id: string } }>("/:id", async (req, repl) => {
    const { id } = req.params;
    console.log("Wanna GET", id);
    const todo = await TodoItem.findById(id);
    return todo;
  });

  app.patch<{ Body: { done: boolean }; Params: { id: string } }>(
    "/:id",
    async (req, repl) => {
      const { id } = req.params;
      console.log("Wanna update (put)", id, req.body.done);
      const todo = await TodoItem.findByIdAndUpdate(
        id,
        {
          done: req.body.done,
        },
        { new: true }
      );
      repl.header("Content-Location", `/api/items/${todo.id}`);
      return todo;
    }
  );

  done();
}
