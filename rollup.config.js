import pkg from "./package.json";

export default [
  {
    input: "src/index.mjs",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    external: ['foreach-combination'],
  },
];
