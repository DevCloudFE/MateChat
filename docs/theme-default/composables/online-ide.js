import sdk from '@stackblitz/sdk';
import angularJson from './online-ide-files/angular-json.js';
import indexHtml from './online-ide-files/index-template.js';
import logo2xSvgStr from './online-ide-files/logo-2x-svg-str.js';
import logoSvgStr from './online-ide-files/logo-svg-str.js';
import mainJS from './online-ide-files/main.js';
import ngAppConfig from './online-ide-files/ng-app-config.js';
import ngIndexHtml from './online-ide-files/ng-index-html.js';
import ngMainJS from './online-ide-files/ng-main.js';
import ngTsconfigAppJson from './online-ide-files/ng-tsconfig-app-json.js';
import ngTsconfigJson from './online-ide-files/ng-tsconfig-json.js';
import ngTsconfigSpecJson from './online-ide-files/ng-tsconfig-spec-json.js';
import styleText from './online-ide-files/style-text.js';
import userSvgStr from './online-ide-files/user-svg-str.js';
import viteConfig from './online-ide-files/vite-config.js';

export function openOnStackBlitz(sourceData) {
  sdk.openProject(
    {
      template: 'node', // 基于 Node.js 环境运行 npm 项目
      title: 'MateChat',
      description: 'MateChat Demo',
      tags: ['matechat', 'vue'],
      files: getFiles(sourceData),
    },
    {
      openFile: 'src/App.vue',
    },
  );
}

export function getFiles(sourceData) {
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

export function openNgOnStackBlitz(sourceData) {
  sdk.openProject(
    {
      template: 'node', // 基于 Node.js 环境运行 npm 项目
      title: 'Angular 20 MateChat',
      description: 'Angular 20 MateChat演示项目',
      tags: ['matechat', 'vue'],
      files: getNgFiles(sourceData),
    },
    {
      openFile: 'src/app/app.ts',
    },
  );
}

function getNgFiles(sourceData) {
  const tsCode = replaceAngularComponentPaths(
    sourceData.find((item) => item.type.toUpperCase() === 'TS').code,
  );
  const htmlCode = replaceNgImgLink(
    sourceData.find((item) => item.type.toUpperCase() === 'HTML').code,
  );
  const scssCode = replaceNgImgLink(
    sourceData.find(
      (item) =>
        item.type.toUpperCase() === 'SCSS' || item.type.toUpperCase() === 'CSS',
    )?.code || '',
  );
  return {
    'package.json': JSON.stringify(
      {
        name: 'matechat-ng-demo',
        version: '0.0.0',
        scripts: {
          ng: 'ng',
          start: 'ng serve',
          build: 'ng build',
        },
        prettier: {
          printWidth: 100,
          singleQuote: true,
          overrides: [
            {
              files: '*.html',
              options: {
                parser: 'angular',
              },
            },
          ],
        },
        private: true,
        dependencies: {
          '@angular/common': '^20.3.0',
          '@angular/compiler': '^20.3.0',
          '@angular/core': '^20.3.0',
          '@angular/forms': '^20.3.0',
          '@angular/platform-browser': '^20.3.0',
          '@angular/router': '^20.3.0',
          '@matechat/ng': 'latest',
          'devui-theme': '^0.1.0',
          '@devui-design/icons': '^1.4.0',
          'markdown-it': '14.1.0',
          'markdown-it-emoji': '^3.0.0',
          'markdown-it-mermaid-plugin': '^0.1.0',
          'markdown-it-plantuml': '^1.4.1',
          mermaid: '^11.0.0',
          '@mdit/plugin-katex': 'latest',
          rxjs: '~7.8.0',
          tslib: '^2.3.0',
        },
        devDependencies: {
          '@angular/build': '^20.3.9',
          '@angular/cli': '^20.3.9',
          '@angular/compiler-cli': '^20.3.0',
          '@types/jasmine': '~5.1.0',
          'jasmine-core': '~5.9.0',
          karma: '~6.4.0',
          'karma-chrome-launcher': '~3.2.0',
          'karma-coverage': '~2.2.0',
          'karma-jasmine': '~5.1.0',
          'karma-jasmine-html-reporter': '~2.1.0',
          typescript: '~5.9.2',
        },
      },
      null,
      2,
    ),
    'angular.json': angularJson,
    'tsconfig.json': ngTsconfigJson,
    'tsconfig.spec.json': ngTsconfigSpecJson,
    'tsconfig.app.json': ngTsconfigAppJson,
    'src/index.html': ngIndexHtml,
    'src/main.ts': ngMainJS,
    'src/app/app.ts': tsCode,
    'src/app/app.html': htmlCode,
    'src/app/app.scss': scssCode,
    'src/app/app.config.ts': ngAppConfig,
    'src/style.scss': "@import '@devui-design/icons/icomoon/devui-icon.css';",
    'public/logo.svg': logoSvgStr,
    'public/logo2x.svg': logo2xSvgStr,
    'public/png/demo/userAvatar.svg': userSvgStr,
  };
}

function replaceAngularComponentPaths(code) {
  // 替换 templateUrl
  let modified = code.replace(
    /templateUrl:\s*['"`][^'"`]+['"`]/,
    "templateUrl: './app.html'",
  );
  // 替换 styleUrls
  modified = modified.replace(
    /styleUrls:\s*\[[^\]]+\]/,
    "styleUrls: ['./app.scss']",
  );
  // 替换 styleUrl
  modified = modified.replace(
    /styleUrl:\s*['"`][^'"`]+['"`]/,
    "styleUrl: './app.scss'",
  );
  // 替换 selector
  modified = modified.replace(
    /selector:\s*['"`][^'"`]+['"`]/,
    "selector: 'app-root'",
  );
  // 类名替换为 App
  modified = modified.replace(/(export\s+class\s+)(\w+)/, '$1App');
  return replaceNgImgLink(modified);
}

function replaceNgImgLink(code) {
  return code.replace('https://matechat.gitcode.com/', './');
}
