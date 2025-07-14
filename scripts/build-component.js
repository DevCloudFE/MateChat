import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import fs from 'fs-extra';
import { build, defineConfig } from 'vite';
import {
  buildLibOutputDir,
  buildLibOutputIndexDtsFile,
  buildLibOutputIndexFile,
  componentIndexFile,
  componentsDir,
  ignoreDirs,
} from './const.js';
import { resolveFilesInfo } from './utils.js';

async function buildComponents() {
  const filesInfo = resolveFilesInfo(componentsDir, ['node_modules', 'dist']);

  for (let i = 0; i < filesInfo.length; i++) {
    await buildSingle(filesInfo[i]);
  }

  autoImportCss();
  copyIndex();
  generateIndexDts();
}

async function buildSingle(itemFile) {
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
          entry: itemFile.indexPath,
          name: 'index',
          fileName: 'index',
          formats: ['es'],
        },
        outDir: path.resolve(buildLibOutputDir, `./${itemFile.name}`),
      },
    }),
  );
}

// 自动引入index.css
function autoImportCss() {
  const ignore = [...ignoreDirs, 'Locale'];
  const itemDirs = fs
    .readdirSync(buildLibOutputDir)
    .filter(
      (itemDir) =>
        fs.statSync(path.resolve(buildLibOutputDir, itemDir)).isDirectory() &&
        !ignore.includes(itemDir),
    )
    .map((itemDir) => ({
      indexPath: path.resolve(buildLibOutputDir, itemDir, 'index.js'),
    }));
  for (const itemDir of itemDirs) {
    const fileContent = fs.readFileSync(itemDir.indexPath);
    const outputFileContent = `import "./index.css";\n${fileContent}`;
    fs.outputFile(itemDir.indexPath, outputFileContent, 'utf-8');
  }
}

// 复制components/index.ts的内容到dist/index.js
function copyIndex() {
  const fileContent = fs.readFileSync(componentIndexFile, 'utf-8');
  fs.ensureFileSync(buildLibOutputIndexFile);
  fs.outputFileSync(buildLibOutputIndexFile, fileContent, 'utf-8');
}

// 生成index.d.ts
function generateIndexDts() {
  const fileStr = `import type { App } from 'vue';
  declare function install(app: App): void
  declare const _default: {
      install: typeof install;
  };
  export default _default;`;
  fs.outputFileSync(buildLibOutputIndexDtsFile, fileStr, 'utf8');
}

buildComponents();
