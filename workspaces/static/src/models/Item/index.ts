import { IItemData } from "./types";

export class Item {
  public static create(data: IItemData) {
    return new Item(data);
  }
  get(key: keyof IItemData) {
    return this.#data[key];
  }

  #data: IItemData;
  private constructor(data: IItemData) {
    this.#data = data;
  }
}
