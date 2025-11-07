<p align="center">
  <a href="https://matechat.gitcode.com/" target="_blank" rel="noopener noreferrer">
    <img alt="MateChat Logo" src="https://matechat.gitcode.com/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>
<h1 align="center">MateChat / Angular</h1>
<p align="center">前端智能化场景解决方案UI库，轻松构建你的AI应用。已服务于华为内部多个应用智能化改造，并助力CodeArts、InsCode AI IDE等智能化助手搭建。</p>

![example](https://matechat.gitcode.com/example1.png)

## 🌈 特性

- 面向智能化场景组件库
- 开箱即用
- 多场景匹配
- 多主题适配
- 更多特性持续演进更新中...

了解更多请访问 MateChat 网站：[MateChat](https://matechat.gitcode.com)

## 🖥️ 快速开始

### 1. 安装

如果你还没有新建项目，可以使用 Angular CLI 首先初始化一个`angular`项目：

```bash
$ npm install -g @angular/cli

$ ng new matechat-demo

$ npm i @matechat/ng
```

### 2. 引入

在`app.component.ts`文件中引入模块

```ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BubbleModule } from "@matechat/ng";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, BubbleModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
```

### 3. 使用

在`app.component.html`文件中使用 MateChat 组件，如：

```html
<mc-bubble [content]="'Hello, MateChat'" [avatarConfig]="{ name: 'matechat' }"></mc-bubble>
```

以下为一个简单的对话界面搭建示例：

```html
<template>
  <div class="chat-container">
    <div class="chat-list">
      <ng-container *ngFor="let msg of messages">
        @if (msg.from === 'user') {
        <mc-bubble class="user-bubble" [align]="'right'" [content]="msg.content"></mc-bubble>
        } @else if (msg.from === 'model') {
        <mc-bubble class="model-bubble" [align]="'left'">
          <mc-markdown-card [content]="msg.content" [enableMermaid]="true"></mc-markdown-card>
        </mc-bubble>
        }
      </ng-container>
    </div>
    <div class="chat-footer">
      <mc-input (submit)="onSubmit($event)"></mc-input>
    </div>
  </div>
</template>
```


```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule, InputModule, MarkdownCardModule } from '@matechat/ng';
@Component({
  selector: 'app-root',
  imports: [CommonModule, BubbleModule, InputModule, MarkdownCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  inputValue = '';
  messages: any = [];

  onSubmit = (evt: any) => {
    this.inputValue = '';
    // 用户发送消息
    this.messages.push({
      from: 'user',
      content: evt,
    });
    setTimeout(() => {
      // 模型返回消息
      this.messages.push({
        from: 'model',
        content: evt,
      });
    }, 200);
  };
}

```

```scss
.chat-container {
  max-width: 1200px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
}
.chat-list {
  margin-bottom: 12px;
  height: 500px;
  overflow: auto;
}
.user-bubble,
.model-bubble {
  display: block;
  margin-top: 8px;
}
```
### 4. 主题化

在`main.ts`中初始化主题

```ts
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { ThemeServiceInit, infinityTheme } from "devui-theme";

// 使用无限主题
ThemeServiceInit({ infinityTheme }, "infinityTheme");
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```
## 🧩 对接模型服务

在搭建完成页面后，可以开始对接模型服务，如 `盘古大模型`、`ChatGPT` 等优秀大模型，在注册并生成对应模型的调用API_Key后，可以参考如下方法进行调用：

1. 通过 npm 安装 openai:

```bash
$ npm install openai
```

2. 使用OpenAI初始化并调用模型接口，如下为一段代码示例：

```js
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '', // 模型APIKey
  baseURL: '', // 模型API地址
  dangerouslyAllowBrowser: true,
});

const fetchData = (ques) => {
  const completion = await client.chat.completions.create({
    model: 'my-model', // 替换为自己的model名称
    messages: [
      { role: 'user', content: ques },
    ],
    stream: true, // 为 true 则开启接口的流式返回
  });

  for await (const chunk of completion) {
    console.log('content: ', chunk.choices[0]?.delta?.content || '');
    console.log('chatId: ', chunk.id);
  }
}
```

那么参考以上步骤，【快速开始】中示例可调整下代码。

将以下代码：

```ts
onSubmit = (evt) => {
  this.inputValue = '';
  // 用户发送消息
  this.messages.push({
    from: 'user',
    content: evt,
  });
  setTimeout(() => {
    // 模型返回消息
    this.messages.push({
      from: 'model',
      content: evt,
    });
  }, 200);
};
```

修改为：

```ts
import OpenAI from 'openai';

client = new OpenAI({
  apiKey: '', // 模型APIKey
  baseURL: '', // 模型API地址
  dangerouslyAllowBrowser: true,
});

 onSubmit = async (evt) => {
  this.inputValue = '';
  // 用户发送消息
  this.messages.push({
    from: 'user',
    content: evt,
    avatarConfig: { name: 'user' },
  });

  this.fetchData(evt);
};

fetchData = async (ques) => {
  this.messages.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await this.client.chat.completions.create({
    model: 'my-model', // 替换为自己的model名称
    messages: [{ role: 'user', content: ques }],
    stream: true, // 为 true 则开启接口的流式返回
  });
  for await (const chunk of completion) {
    this.messages[this.messages.length - 1].loading = false;
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    this.messages[this.messages.length - 1].content += content;
    this.messages[this.messages.length - 1].id = chatId;
  }
};
```

完成模型API地址与APIKey填充后，即拥有了一个对接大模型的简单应用。如果你想要参考更完整的页面示例，可参考[演示场景](https://matechat.gitcode.com/vue-starter/)。

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

我们诚挚地邀请您加入 MateChat 社区，一起参与项目的建设。无论您是经验丰富的开发者，还是刚刚起步的编程爱好者，您的贡献都对我们至关重要，这里是我们的[【贡献指南】](https://gitcode.com/DevCloudFE/MateChat/blob/main/CONTRIBUTING.md)。

## 谁在使用

[华为云 CodeArts 智能助手](https://www.huaweicloud.com/product/codeartside/snap.html)

[InsCode AI IDE](https://inscode.csdn.net/)

## License

[MIT](https://gitcode.com/DevCloudFE/MateChat/blob/main/LICENSE)

## 联系方式

欢迎加入我们的开源社区，关注 DevUI 微信公众号：DevUI
