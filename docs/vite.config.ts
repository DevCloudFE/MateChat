import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@matechat/core': path.resolve(__dirname, '../packages/components'),
    },
  },
});
