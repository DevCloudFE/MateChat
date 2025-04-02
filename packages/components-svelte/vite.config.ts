import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve, join } from "path";

// 动态读取 src/components 目录下的所有 .svelte 文件
const componentsDir = resolve(__dirname, "components/index.ts");
export default defineConfig({
  root: resolve(__dirname),
  build: {
    lib: {
      entry: componentsDir, // 动态生成的入口文件
      formats: ["es"], // 输出格式：ES 模块
    },
    outDir: resolve(__dirname, "../components-js"), // 输出目录
    rollupOptions: {
      // external: ["svelte"], // 将 Svelte 运行时标记为外部依赖
      external: ["svelte", "svelte/internal"],
      output: {
        preserveModules: true, // 预构建模块
        entryFileNames: (chunkInfo) => {
          return `${chunkInfo.name.replace(
            "/component-svelte/components",
            ""
          )}.js`;
        }, // 输出文件名
      },
    },
  },
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        dev: true, // 开启开发模式
      }
    }),
  ],
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
  }
});
