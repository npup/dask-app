import { apiGet, apiPatch, apiPost } from "../util";
import { TodoItem } from "./types";

const PATH = "/api/todos";
export async function getAll(): Promise<TodoItem[]> {
  return apiGet<TodoItem[]>(PATH);
}

export async function save(data: Pick<TodoItem, "name">) {
  return apiPost<TodoItem>(PATH, data);
}

export async function get(id: string) {
  return apiGet<TodoItem>(`${PATH}/${id}`);
}

export async function update(item: TodoItem) {
  const data = { done: item.done };
  return apiPatch<TodoItem>(`${PATH}/${item._id}`, data);
}
