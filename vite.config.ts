import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: path.resolve("src"),
      },
      {
        find: "@components",
        replacement: path.resolve("src/components"),
      },
    ],
  },
});
