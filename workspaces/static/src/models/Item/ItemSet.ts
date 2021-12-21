import { Item } from ".";
import { IItemData } from "./types";

export class ItemSet {
  public static create(name: string, itemData: IItemData[]) {
    return new ItemSet(name, itemData);
  }
  get name() {
    return this.#name;
  }
  get items() {
    return this.#items;
  }

  private constructor(name: string, itemData: IItemData[]) {
    this.#name = name;
    this.#items = itemData.map((data) =>
      Item.create({ ...data, itemSet: this })
    );
  }
  #name: string;
  #items: Item[];
}
