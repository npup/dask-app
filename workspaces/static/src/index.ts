import App from "./App.svelte";
const appRoot = document.querySelector(".app");

let app;

if (appRoot) {
  app = new App({
    target: appRoot,
  });
}

export default app;
