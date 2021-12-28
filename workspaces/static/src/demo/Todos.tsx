import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { todosService } from "./services";
import { TodoItem } from "./services/todos/types";

export function Todos() {
  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    loadItems();
    nameRef.current && nameRef.current.select();
  }, []);

  async function loadItems() {
    const items = await todosService.getAll();
    setLatestItems(items);
  }

  function setLatestItems(items: TodoItem[], maxItems = 20) {
    setItems(items.slice(0, maxItems));
  }

  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await todosService.save({ name });
    nameRef.current && nameRef.current.select();
    loadItems();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  async function toggleTodo(item: TodoItem) {
    item.done = !item.done;
    await todosService.update(item);
    loadItems();
  }

  return (
    <div style={{ maxWidth: "25em", margin: "2em auto" }}>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Todo
          <input
            type="text"
            ref={nameRef}
            value={name}
            onChange={handleChange}
          />
        </label>
        <div style={{ textAlign: "right", marginTop: "1em" }}>
          <button type="submit">Create</button>
        </div>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleTodo(item)}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
