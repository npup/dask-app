import * as React from "react";
import * as ReactDOM from "react-dom";

import { Todos } from "./demo/Todos";

const appRoot = document.querySelector(".app");

function App() {
  return (
    <div>
      <Todos />
    </div>
  );
}

ReactDOM.render(<App />, appRoot);
