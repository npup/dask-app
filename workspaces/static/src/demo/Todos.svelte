<script lang="ts">
  import { onMount } from "svelte";
  import { todosService } from "./services";
  import type { TodoItem } from "./services/todos/types";

  async function handleSubmit(e: Event) {
    e.preventDefault();
    await todosService.save({ name });
    loadItems();
    textInput.select();
  }
  function handleInput(e) {
    name = e.target.value;
  }

  async function handleCheckbox(item: TodoItem) {
    item.done = !item.done;
    await todosService.update(item);
  }

  async function loadItems() {
    const items = await todosService.getAll();
    todos = items;
  }

  let textInput: HTMLInputElement;
  let todos: TodoItem[] = [];
  let name: string = "";
  onMount(async () => {
    loadItems();
  });
</script>

<div style="max-width: 25em; margin: 2em auto">
  <form on:submit={handleSubmit}>
    <label style="display: flex; flex-direction: column">
      Todo
      <input
        bind:this={textInput}
        type="text"
        value={name}
        on:input={handleInput}
      />
    </label>
    <div style="text-align: right; margin-top: 1em">
      <button type="submit">Create</button>
    </div>
  </form>
  <ul>
    {#each todos as todo}
      <li>
        <input
          type="checkbox"
          checked={todo.done}
          on:click={() => handleCheckbox(todo)}
        />{todo.name}
      </li>
    {/each}
  </ul>
</div>
