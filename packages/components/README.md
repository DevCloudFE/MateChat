<p align="center">
  <a href="https://matechat.gitcode.com/" target="_blank" rel="noopener noreferrer">
    <img alt="MateChat Logo" src="https://matechat.gitcode.com/logo.svg" width="180" style="max-width:100%;">
  </a>
</p>
<h1 align="center">MateChat</h1>
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

如果你还没有新建项目，可以使用vite首先初始化一个`vue+ts`项目：

```bash
$ npm create vite@latest
```

```bash
$ npm i vue-devui @matechat/core @devui-design/icons
```

### 2. 引入

在`main.ts`文件中引入`matechat`, `图标库` 样式文件

```ts
import { createApp } from 'vue';
import App from './App.vue';

import MateChat from '@matechat/core';

import '@devui-design/icons/icomoon/devui-icon.css';

createApp(App).use(MateChat).mount('#app');
```

### 3. 使用

在`App.vue`文件中使用 MateChat 组件，如：

```html
<template>
  <McBubble :content="'Hello, MateChat'" :avatarConfig="{ name: 'matechat' }"></McBubble>
</template>
```

以下为一个简单的对话界面搭建示例：

```ts
<template>
  <McLayout class="container">
    <McHeader :title="'MateChat'" :logoImg="'https://matechat.gitcode.com/logo.svg'">
      <template #operationArea>
        <div class="operations">
          <i class="icon-helping"></i>
        </div>
      </template>
    </McHeader>
    <McLayoutContent
      v-if="startPage"
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px"
    >
      <McIntroduction
        :logoImg="'https://matechat.gitcode.com/logo2x.svg'"
        :title="'MateChat'"
        :subTitle="'Hi，欢迎使用 MateChat'"
        :description="description"
      ></McIntroduction>
      <McPrompt
        :list="introPrompt.list"
        :direction="introPrompt.direction"
        class="intro-prompt"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
    </McLayoutContent>
    <McLayoutContent class="content-container" v-else>
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg' }"
        >
        </McBubble>
        <McBubble v-else :content="msg.content" :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/logo.svg' }" :loading="msg.loading"> </McBubble>
      </template>
    </McLayoutContent>
    <div class="shortcut" style="display: flex; align-items: center; gap: 8px">
      <McPrompt
        v-if="!startPage"
        :list="simplePrompt"
        :direction="'horizontal'"
        style="flex: 1"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
      <Button
        style="margin-left: auto"
        icon="add"
        shape="circle"
        title="新建对话"
        size="sm"
        @click="newConversation"
      />
    </div>
    <McLayoutSender>
      <McInput :value="inputValue" :maxLength="2000" @change="(e) => (inputValue = e)" @submit="onSubmit">
        <template #extra>
          <div class="input-foot-wrapper">
            <div class="input-foot-left">
              <span v-for="(item, index) in inputFootIcons" :key="index">
                <i :class="item.icon"></i>
                {{ item.text }}
              </span>
              <span class="input-foot-dividing-line"></span>
              <span class="input-foot-maxlength">{{ inputValue.length }}/2000</span>
            </div>
            <div class="input-foot-right">
              <Button icon="op-clearup" shape="round" :disabled="!inputValue" @click="inputValue = ''">清空输入</Button>
            </div>
          </div>
        </template>
      </McInput>
    </McLayoutSender>
  </McLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'vue-devui/button';
import 'vue-devui/button/style.css';

const description = [
  'MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。',
  '作为AI模型，MateChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 MateChat 做的更好。',
];
const introPrompt = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: '了解当前大模型可以帮你做的事',
    },
    {
      value: 'bindProjectSpace',
      label: '怎么绑定项目空间',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: '如何绑定云空间中的项目',
    },
  ],
};
const simplePrompt = [
  {
    value: 'quickSort',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    label: '帮我写一个快速排序',
  },
  {
    value: 'helpMd',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    label: '你可以帮我做些什么？',
  },
];
const startPage = ref(true);
const inputValue = ref('');
const inputFootIcons = [
  { icon: 'icon-at', text: '智能体' },
  { icon: 'icon-standard', text: '词库' },
  { icon: 'icon-add', text: '附件' },
];

const messages = ref<any[]>([
  {
    from: 'user',
    content: '你好',
  },
  {
    from: 'model',
    content: '你好，我是 MateChat',
    id: 'init-msg',
  },
]);

const newConversation = () => {
  startPage.value = true;
  messages.value = [];
}

const onSubmit = (evt) => {
  inputValue.value='';
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: 'user',
    content: evt,
  });
  setTimeout(() => {
    // 模型返回消息
    messages.value.push({
      from: 'model',
      content: evt,
    });
  }, 200);
};
</script>

<style>
.container {
  width: 1000px;
  margin: 20px auto;
  height: calc(100vh - 40px);
  padding: 20px;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}

.input-foot-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-right: 8px;

  .input-foot-left {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 12px;
      color: #252b3a;
      cursor: pointer;
    }

    .input-foot-dividing-line {
      width: 1px;
      height: 14px;
      background-color: #d7d8da;
    }

    .input-foot-maxlength {
      font-size: 12px;
      color: #71757f;
    }
  }

  .input-foot-right {
    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
```

### 4. 主题化

基于[vue-devui主题化](https://vue-devui.github.io/theme-guide/)来实现。

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
const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: 'user',
    content: evt,
  });
  setTimeout(() => {
    // 模型返回消息
    messages.value.push({
      from: 'model',
      content: evt,
    });
  }, 200);
};
```

修改为：

```ts
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '', // 模型APIKey
  baseURL: '', // 模型API地址
  dangerouslyAllowBrowser: true,
});

const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: 'user',
    content: evt,
    avatarConfig: { name: 'user' },
  });

  fetchData(evt);
};

const fetchData = async (ques) => {
  messages.value.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await client.chat.completions.create({
    model: 'my-model', // 替换为自己的model名称
    messages: [{ role: 'user', content: ques }],
    stream: true, // 为 true 则开启接口的流式返回
  });
  messages.value[messages.value.length - 1].loading = false;
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
```

完成模型API地址与APIKey填充后，即拥有了一个对接大模型的简单应用。如果你想要参考更完整的页面示例，可参考[演示场景](https://matechat.gitcode.com/playground/playground.html)。

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
