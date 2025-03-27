import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      { find: '@matechat/core', replacement: resolve(__dirname, '../components') },
      { find: '@matechat/core/Locale', replacement: resolve(__dirname, '../components/Locale') },
    ],
  },
  optimizeDeps: { exclude: ['fsevents'] },
});
