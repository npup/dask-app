import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "./src/config";

const isProd = process.env.NODE_ENV === "production";

// dev server settings
let server = null;
if (!isProd) {
  server = {
    host: "0.0.0.0",
    port: config.DEV_PORT,
    proxy: {
      "/api": {
        target: `http://0.0.0.0:${config.API_SERVER_DEV_PORT}/`,
        rewrite(path) {
          const result = path.replace(/^\/api/, "");
          console.log("got path", {
            path,
            directTo: `:${config.API_SERVER_DEV_PORT}${result}`,
          });
          return result;
        },
      },
    },
  };
}

const conf = defineConfig({
  clearScreen: false,
  root: "./src",
  build: {
    outDir: "../dist",
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react()],
  server,
});

export default conf;
