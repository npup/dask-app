import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { Container, Button, TextInput } from "@mantine/core";
import { getItems, saveItem } from "./services";
import { Item } from "./models/Item";

const appRoot = document.querySelector(".app");

function App() {
  const [items, setItems] = useState<Item[]>([]);
  function setLatestItems(items: Item[], maxItems = 20) {
    setItems(items.slice(0, maxItems));
  }

  async function loadItems() {
    const items = await getItems();
    console.log("items", items);
    setLatestItems(items);
  }

  useEffect(() => {
    loadItems();
    nameRef.current && nameRef.current.select();
  }, []);

  const [name, setName] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("post ", name);
    const x = await saveItem({ name });
    console.log("sved", x);
    nameRef.current && nameRef.current.select();
    loadItems();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextInput ref={nameRef} value={name} onChange={handleChange} />
          <Button type="submit">Submit</Button>
        </form>
        <ul>
          {items.map((item) => (
            <li>{item.get("name")}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

ReactDOM.render(<App />, appRoot);
