import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

function aliasWithTsConfig() {
  const { paths } = require("./tsconfig.json").compilerOptions;
  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "");

    aliases[key] = path.resolve(
      __dirname,
      paths[item][0].replace("/*", "").replace("*", "")
    );
  });

  return aliases;
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3003,
  },
  resolve: {
    alias: aliasWithTsConfig(),
  },
  plugins: [react()],
});
