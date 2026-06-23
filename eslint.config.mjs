import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "dist/**",
    "coverage/**",
    "node_modules/**",
  ]),
]);
