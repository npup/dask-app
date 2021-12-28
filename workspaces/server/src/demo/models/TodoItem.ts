const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItemSchema = new Schema({
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

export const TodoItem = mongoose.model("todoItem", TodoItemSchema);
