import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'node:path';

console.log(path.resolve(__dirname, '../packages/components/dist'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@matechat/core': path.resolve(__dirname, '../packages/components'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: { exclude: ['fsevents'] },
});
