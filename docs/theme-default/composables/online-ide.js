import sdk from '@stackblitz/sdk';
import indexHtml from './online-ide-files/index-template.js';
import logo2xSvgStr from './online-ide-files/logo-2x-svg-str.js';
import logoSvgStr from './online-ide-files/logo-svg-str.js';
import mainJS from './online-ide-files/main.js';
import styleText from './online-ide-files/style-text.js';
import userSvgStr from './online-ide-files/user-svg-str.js';
import viteConfig from './online-ide-files/vite-config.js';

export function openOnStackBlitz(sourceData) {
  sdk.openProject({
    template: 'node', // 基于 Node.js 环境运行 npm 项目
    title: 'MateChat',
    description: 'MateChat Demo',
    tags: ['matechat', 'vue'],
    files: getFiles(sourceData),
  });
}

export function getFiles(sourceData, ide = 'StackBlitz') {
  return {
    'package.json': JSON.stringify(
      {
        name: 'vue-matechat-demo',
        private: true,
        version: '0.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies: {
          vue: '^3.5.13',
          'devui-theme': '^0.1.0',
          '@devui-design/icons': '^1.4.0',
          'markdown-it': '14.1.0',
          'markdown-it-emoji': '^3.0.0',
          'markdown-it-mermaid-plugin': '^0.1.0',
          'markdown-it-plantuml': '^1.4.1',
          mermaid: '^11.0.0',
          '@mdit/plugin-katex': 'latest',
          'vue-devui': '^1.6.29',
          '@matechat/core': 'latest', // 始终使用最新包
        },
        devDependencies: {
          '@vitejs/plugin-vue': '^4.2.3',
          sass: '^1.86.0',
          'sass-embedded': '^1.83.4',
          'sass-loader': '^16.0.5',
          'style-loader': '^4.0.0',
          vite: '^4.3.9',
        },
      },
      null,
      2,
    ),
    'index.html': indexHtml,
    'vite.config.js': viteConfig,
    'src/main.js': mainJS,
    'src/style.scss': styleText,
    'src/App.vue': sourceData,
    'public/logo.svg': logoSvgStr,
    'public/logo2x.svg': logo2xSvgStr,
    'public/png/demo/userAvatar.svg': userSvgStr,
  };
}
