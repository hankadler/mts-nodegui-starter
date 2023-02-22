import * as esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  entryPoints: ["dist/src/index.js"],
  external: ["@nodegui/nodegui"],
  format: "cjs",
  outfile: "dist/index.cjs",
  platform: "node"
});

