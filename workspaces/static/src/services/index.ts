import ky from "ky";
import { Item } from "../models/Item";
import { IItemData } from "../models/Item/types";

function apiGet<T>(path: string): Promise<T> {
  return ky.get(path).json();
}

function apiPost<T>(path: string, data: T): Promise<T> {
  return ky
    .post(path, {
      json: data,
    })
    .json();
}

function apiDelete(path: string) {
  return ky.delete(path);
}

export async function getItems(): Promise<Item[]> {
  const items = Object.entries(await apiGet<IItemData[]>("/api/items")).map(
    ([id, data]) => {
      const { itemSet: itemSetData, ...itemData } = data;
      const itemSet = undefined;
      return Item.create({ ...itemData, itemSet });
    }
  );
  return items;
}
export function saveItem(data: IItemData) {
  return apiPost<IItemData>("/api/items", data);
}
