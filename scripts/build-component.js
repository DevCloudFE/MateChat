import path from 'path';
import fs from 'fs-extra';
import { defineConfig, build } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
  ComponentsDir,
  BuildLibOutputDir,
  IgnoreDirs,
  ComponentIndexFile,
  BuildLibOutputIndexFile,
  BuildLibOutputIndexDtsFile,
} from './const.js';
import { resolveFilesInfo } from './utils.js';

async function buildComponents() {
  const filesInfo = resolveFilesInfo(ComponentsDir);

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
          external: ['vue', '@floating-ui/dom', '@vue/shared', 'lodash-es', /vue-devui/, /@matechat\/core/, 'markdown-it', 'highlight.js', 'xss'],
        },
        lib: {
          entry: itemFile.indexPath,
          name: 'index',
          fileName: 'index',
          formats: ['es'],
        },
        outDir: path.resolve(BuildLibOutputDir, `./${itemFile.name}`),
      },
    }),
  );
}

// 自动引入index.css
function autoImportCss() {
  const ignore = [...IgnoreDirs, 'Locale'];
  fs.readdirSync(BuildLibOutputDir)
    .filter((itemDir) => fs.statSync(path.resolve(BuildLibOutputDir, itemDir)).isDirectory() && !ignore.includes(itemDir))
    .map((itemDir) => ({ indexPath: path.resolve(BuildLibOutputDir, itemDir, 'index.js') }))
    .forEach((itemDir) => {
      const fileContent = fs.readFileSync(itemDir.indexPath);
      const outputFileContent = `import "./index.css";\n` + fileContent;
      fs.outputFile(itemDir.indexPath, outputFileContent, 'utf-8');
    });
}

// 复制components/index.ts的内容到dist/index.js
function copyIndex() {
  const fileContent = fs.readFileSync(ComponentIndexFile, 'utf-8');
  fs.ensureFileSync(BuildLibOutputIndexFile);
  fs.outputFileSync(BuildLibOutputIndexFile, fileContent, 'utf-8');
}

// 生成index.d.ts
function generateIndexDts() {
  const fileStr = `import type { App } from 'vue';
  declare function install(app: App): void
  declare const _default: {
      install: typeof install;
  };
  export default _default;`;
  fs.outputFileSync(BuildLibOutputIndexDtsFile, fileStr, 'utf8');
}

buildComponents();
