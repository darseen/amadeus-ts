import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/amadeus/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  clean: true,
});
