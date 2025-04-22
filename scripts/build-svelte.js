import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig, build } from "vite";
import { componentsSvelteDir, svelteOutputDir } from "./const.js";
import sveltePreprocess from "svelte-preprocess";

// 编译 Svelte 组件
export async function buildSvelteComponents() {
  await build(
    defineConfig({
      configFile: false, // 不使用默认的 Vite 配置文件
      publicDir: false,
      plugins: [
        svelte({
          emitCss: false,
          preprocess: sveltePreprocess({
            scss: {
              prependData: `@import 'devui-theme/styles-var/devui-var.scss';`, // 全局引入 SCSS 变量
            },
          }),
        }),
      ],
      build: {
        rollupOptions: {
          external: ["svelte", "svelte/internal"], // 将 Svelte 运行时标记为外部依赖
          output: {
            preserveModules: true, // 预构建模块
            entryFileNames: (chunkInfo) => {
              return `${chunkInfo.name.replace(
                "/components-svelte/components",
                ""
              )}.js`;
            }, // 输出文件名
          },
        },
        lib: {
          entry: componentsSvelteDir, // Svelte 组件目录
          formats: ["es"], // 输出格式
        },

        outDir: svelteOutputDir, // 输出目录
      },
    })
  );
}
