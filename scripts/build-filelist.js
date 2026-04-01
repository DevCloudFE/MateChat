import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import fs from 'fs-extra';
import { build, defineConfig } from 'vite';
import { buildLibOutputDir } from './const.js';

async function buildFileList() {
  const fileListPath = path.resolve(
    __dirname,
    '../packages/components/FileList/index.ts',
  );

  await build(
    defineConfig({
      configFile: false,
      publicDir: false,
      plugins: [vue(), vueJsx()],
      build: {
        rollupOptions: {
          external: [
            'vue',
            '@floating-ui/dom',
            '@vue/shared',
            'lodash-es',
            /@matechat\/core/,
            'markdown-it',
            'highlight.js',
            'xss',
            'mermaid',
          ],
        },
        lib: {
          entry: fileListPath,
          name: 'index',
          fileName: 'index',
          formats: ['es'],
        },
        outDir: path.resolve(buildLibOutputDir, './FileList'),
      },
    }),
  );

  console.log('FileList component built successfully!');
}

buildFileList();
