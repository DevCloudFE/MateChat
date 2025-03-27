import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@matechat/core'],
  },
  resolve: {
    alias: {
      // '@matechat/core': '../components/index.ts',
      '@matechat/core': path.resolve(__dirname, '../components'),
    },
  }
})
