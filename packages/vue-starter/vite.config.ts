import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@view": path.resolve(__dirname, "./src/view"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
