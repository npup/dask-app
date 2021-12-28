import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Container, Button, TextInput, Checkbox, List } from "@mantine/core";
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
    <Container>
      <form onSubmit={handleSubmit}>
        <TextInput
          ref={nameRef}
          value={name}
          onChange={handleChange}
          label="Todo"
        />
        <div style={{ textAlign: "right", marginTop: "1em" }}>
          <Button type="submit">Create</Button>
        </div>
      </form>
      <List>
        {items.map((item) => (
          <List.Item key={item._id}>
            <Checkbox
              checked={item.done}
              onChange={() => toggleTodo(item)}
              label={item.name}
            />
          </List.Item>
        ))}
      </List>
    </Container>
  );
}
