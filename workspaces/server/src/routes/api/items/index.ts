import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fse from "fs-extra";
import { config } from "../../../config";

const { FILES_VOLUME_DIR } = config;

const itemsFileName = `${FILES_VOLUME_DIR}/items.json`;

export default function (
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) {
  async function saveItems(items: any) {
    await fse.writeJSON(itemsFileName, items);
  }
  async function getItems(): Promise<{ [key: string]: any }> {
    const fileName = `${FILES_VOLUME_DIR}/items.json`;
    await fse.ensureFile(itemsFileName);
    let data;
    try {
      data = await fse.readJSON(itemsFileName);
    } catch (err) {
      await fse.writeJSON(fileName, {});
    }
    return data;
  }
  app.get("/", async (req, repl) => {
    const items = await getItems();
    return items;
  });

  app.post<{ Body: { name: string } }>("/", async (req, repl) => {
    const items = await getItems();
    const count = Object.keys(items).length;
    items[count] = { name: req.body.name, id: count };
    await saveItems(items);
    repl.redirect("/api/items");
  });

  app.delete<{ Params: { id: string } }>("/:id", async (req, repl) => {
    const items = await getItems();
    const item = items[req.params.id];
    if (!item) {
      repl.code(404).send(null);
    }
    delete items[req.params.id];
    await saveItems(items);
    return item;
  });

  app.get<{ Params: { id: string } }>("/:id", (req, repl) => {
    console.log("Wanna GET", req.params.id);
    repl.redirect("/api/items");
  });

  done();
}
