import { Schema, model } from "mongoose";

interface ITodoItem {
  name: string;
  done?: boolean;
  created?: Date;
}

const TodoItemSchema = new Schema<ITodoItem>({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const TodoItem = model("todoItem", TodoItemSchema);
