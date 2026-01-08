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
$ npm install -g @angular/cli@latest

$ ng new matechat-demo

$ npm i @matechat/ng
```

### 2. 引入

在`app.ts`文件中引入模块

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

在`app.html`文件中使用 MateChat 组件，如：

```html
<mc-bubble [content]="'Hello, MateChat'" [avatarConfig]="{ name: 'matechat' }"></mc-bubble>
```

以下为一个简单的对话界面搭建示例：

在app.html使用如下代码：

```html
<div class="mc-layout">
  <div class="chat-container">
    <div class="chat-header" :title="'MateChat'" :logoImg="'https://matechat.gitcode.com/logo.svg'">
      <img src="https://matechat.gitcode.com/logo.svg" />
      <span>MateChat</span>
    </div>
    @if (newPage) {
    <div class="welcom-page">
      <div class="content-wrapper">
        <div class="mc-introduction">
          <div class="mc-introduction-logo-container">
            <img src="https://matechat.gitcode.com/logo2x.svg" alt="MateChat" />
            <div class="mc-introduction-title">MateChat</div>
          </div>
          <!--v-if-->
          <div class="mc-introduction-description">
            <div>MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。</div>
            <div>
              作为AI模型，MateChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 MateChat
              做的更好。
            </div>
          </div>
        </div>
        <div class="guess-question">
          <div class="guess-title">
            <div>猜你想问</div>
          </div>
          <div class="guess-content">
            <ng-container *ngFor="let item of questionList">
              <span (click)="onSubmit(item)">{{ item }}</span>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
    } @else {
    <div class="chat-list">
      <ng-container *ngFor="let msg of messages">
        @if (msg.from === 'user') {
        <mc-bubble class="user-bubble" [align]="'right'" [content]="msg.content" [avatarConfig]="avatarConfig"></mc-bubble>
        } @else if (msg.from === 'model') {
        <mc-bubble class="model-bubble" [align]="'left'" [loading]="msg.loading" [avatarConfig]="modelAvatar">
          <mc-markdown-card [theme]="theme" [content]="msg.content" [enableMermaid]="true"></mc-markdown-card>
        </mc-bubble>
        }
      </ng-container>
    </div>
    }
    <div class="chat-footer">
      <mc-input (submit)="onSubmit($event)"> </mc-input>
      <div class="statement-box">
        <span>内容由AI生成，无法确保准确性和完整性，仅供参考</span>
      </div>
    </div>
  </div>
</div>
```

在app.ts中使用如下代码：

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule, InputModule, MarkdownCardModule } from '@matechat/ng';
@Component({
  selector: 'app-root',
  imports: [CommonModule, BubbleModule, InputModule, MarkdownCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  inputValue = '';
  messages: any = [];
  newPage = true;
  questionList = [
    '帮我写一篇文章',
    '你可以帮我做些什么？',
    '帮我写一个快速排序',
    '使用 js 格式化时间',
  ];
  avatarConfig = {
    imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
  };
  modelAvatar = {
    imgSrc: 'https://matechat.gitcode.com/logo.svg',
  };

  onSubmit = (evt: any) => {
    this.newPage = false;
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

在将模板应用中的app.css修改成`app.scss`，使用如下代码：


```scss
::ng-deep body {
  margin: 0;
  color: var(--devui-text, #252b3a);
}

.mc-layout {
  height: 100vh;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  background: linear-gradient(
    to bottom,
    #d0c9ff 0%,
    #e6d6f0 8%,
    #f1dbea 12%,
    #c8dcfb 40%,
    #abc6f6 60%,
    #87aefe 90%
  );
}

::ng-deep body[ui-theme='galaxy-theme'] .mc-layout {
  background: var(--devui-global-bg, #f6f6f8);

  .chat-container {
    background: transparent;
    border: none;
  }
}

.chat-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 8px;
}

.welcom-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  overflow: auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 12px;
  box-sizing: border-box;
  gap: 24px;
}

.guess-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--devui-text, #252b3a);
  margin-bottom: 16px;
}

.guess-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.mc-introduction-logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mc-introduction-description {
  text-align: center;
  font-size: 14px;
  color: var(--devui-text, #252b3a);
}

.mc-introduction-title {
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 1px;
  color: var(--devui-text, #252b3a);
}

.guess-question {
  width: 100%;
  margin-top: 24px;
  padding: 24px;
  border-radius: 24px;
  box-sizing: border-box;
  background-color: var(--devui-base-bg, #ffffff);
}

.guess-question-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--devui-text, #252b3a);
  margin-bottom: 16px;
}

.guess-question span {
  font-size: var(--devui-font-size, 12px);
  color: var(--devui-aide-text, #71757f);
  padding: 10px 16px;
  border-radius: var(--devui-border-radius-full, 100px);
  background-color: var(--devui-dividing-line, #f2f2f3);
  cursor: pointer;
}

.content-wrapper {
  margin: auto 0;
}

.chat-container {
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 20px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  background: linear-gradient(180deg, #fffffff2, #f8fafff2 99%);
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 20px;
    color: var(--devui-text, #252b3a);
  }
}

.mc-introduction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.chat-list {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 12px;
  overflow: auto;

  .user-bubble,
  .model-bubble {
    display: block;
    margin-top: 8px;
  }
}

.chat-footer {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 12px 12px;
  box-sizing: border-box;
}

.statement-box {
  font-size: 12px;
  margin-top: 8px;
  color: var(--devui-aide-text, #71757f);
  text-align: center;
}
```
### 4. 主题化

在`main.ts`中初始化主题，更多用法可参考 [devui-theme](https://matechat.gitcode.com/use-guide/theme.html)

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

ThemeServiceInit(
  {
    'galaxy-theme': galaxyTheme, // 暗黑主题
    'infinity-theme': infinityTheme,
  },
  'infinity-theme'
);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));

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
