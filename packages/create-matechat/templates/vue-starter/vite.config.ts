import path from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // 使用相对路径以便打包后正常加载
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ["vue"],
      dirs: ["./src"],
    }),
  ],
  resolve: {
    alias: {
      "@view": path.resolve(__dirname, "./src/view"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
