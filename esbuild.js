const { build } = require("esbuild");
const pkg = require("./package.json");

const common = {
  entryPoints: ["./src/index.mjs"],
  bundle: true,
  platform: "node",
  external: ["foreach-combination"],
};

build({
  ...common,
  outfile: pkg.main,
});

build({
  ...common,
  outfile: pkg.module,
  format: "esm",
});
