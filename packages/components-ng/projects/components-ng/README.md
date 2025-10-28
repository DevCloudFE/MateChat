<p align="center">
  <a href="https://matechat.gitcode.com/" target="_blank" rel="noopener noreferrer">
    <img alt="MateChat Logo" src="https://matechat.gitcode.com/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>
<h1 align="center">MateChat/Angular</h1>
<p align="center">前端智能化场景解决方案UI库，轻松构建你的AI应用。已服务于华为内部多个应用智能化改造，并助力CodeArts、InsCode AI IDE等智能化助手搭建。</p>

![example](https://matechat.gitcode.com/example1.png)

## 🌈 特性

- 面向智能化场景组件库
- 开箱即用
- 多场景匹配
- 多主题适配
- 更多特性持续演进更新中...

了解更多请访问MateChat网站：[MateChat](https://matechat.gitcode.com)

## 🖥️ 快速开始

### 1. 安装

如果你还没有新建项目，可以使用Angular CLI首先初始化一个`angular`项目：

```bash
$ npm install -g @angular/cli

$ ng new matechat-ng

$ npm i @matechat/ng @devui-design/icons
```

### 2. 引入

在`app.component.ts`文件中引入模块

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BubbleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
```

在`angular.json`中引入图标库样式文件

```json
{
    "options": {
        "styles": [
              "node_modules/@devui-design/icons/icomoon/devui-icon.css"
            ],
    }
}
```

### 3. 使用

在`main.ts`中初始化主题

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
 
// 使用无限主题
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

```

在`app.component.html`文件中使用 MateChat 组件，如：

```html
<template>
  <mc-bubble [content]="'Hello, MateChat'" [avatarConfig]="{ name: 'matechat' }"></mc-bubble>
</template>
```

## 📝 提出意见&建议

我们非常欢迎您的建议，您的每一个想法都可能帮助我们改进这个项目。如果您有任何关于功能改进、特性新增、文档补充或者其他方面的建议，随时在 [issues](https://gitcode.com/DevCloudFE/MateChat/issues) 提交。

## 🔧 本地开发

```bash
git clone git@gitcode.com:DevCloudFE/MateChat.git
cd matechat
pnpm i
pnpm run docs:dev
```

## 📅 特性规划

MateChat 在不断的演进中，你可在这里了解我们的计划：[MateChat 特性计划](https://gitcode.com/DevCloudFE/MateChat/issues/1)

## 🤝 欢迎贡献

我们诚挚地邀请您加入MateChat社区，一起参与项目的建设。无论您是经验丰富的开发者，还是刚刚起步的编程爱好者，您的贡献都对我们至关重要，这里是我们的[【贡献指南】](https://gitcode.com/DevCloudFE/MateChat/blob/main/CONTRIBUTING.md)。

## 谁在使用

[华为云CodeArts智能助手](https://www.huaweicloud.com/product/codeartside/snap.html)

[InsCode AI IDE](https://inscode.csdn.net/)

## License

[MIT](https://gitcode.com/DevCloudFE/MateChat/blob/main/LICENSE)

## 联系方式

欢迎加入我们的开源社区，关注DevUI微信公众号：DevUI
