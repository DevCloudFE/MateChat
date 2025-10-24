import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@matechat/core': path.resolve(__dirname, '../packages/components'),
    },
  },
  // 配置构建选项，忽略特定文件的解析错误
  build: {
    rollupOptions: {
      // 忽略解析错误
    },
  },
});
