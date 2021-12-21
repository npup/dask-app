import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { compilerOptions } = require("./tsconfig.json");

const watch = process.argv[2] === "--watch";

const root = compilerOptions.rootDir;
const main = `${root}/index.ts`;

esbuild
  .build({
    entryPoints: [main],
    outdir: compilerOptions.outDir,
    bundle: true,
    minify: true,
    platform: "node",
    sourcemap: true,
    target: "node16",
    plugins: [
      // Automatically exclude all node_modules from the bundled version
      nodeExternalsPlugin(),
    ],
    watch: watch
      ? {
          onRebuild(error, result) {
            if (error) console.error("watch build failed:", error);
            else console.log("watch build succeeded:", result);
          },
        }
      : false,
  })
  .then((result) => {
    console.log("Build OK maybe:", result);
    if (watch) {
      console.log("Watching...");
    }
  })
  .catch(() => process.exit(1));
