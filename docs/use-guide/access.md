# 使用MateChat的多种方式

当前MateChat主要基于Vue3开发，但我们仍可以通过多种方式将MateChat与您的项目集成。

以下是一些可行方案供参考：

### 一、在Vue3项目中集成MateChat（主流方式）

**适用场景**：需要深度定制AI助手功能，并与现有Vue项目无缝融合的场景。

**步骤**：
参考 [快速开始](https://matechat.gitcode.com/use-guide/introduction.html#_1-%E5%AE%89%E8%A3%85) 的使用方式

```ts
import { createApp } from 'vue';
import App from './App.vue';

import MateChat from '@matechat/core';

import '@devui-design/icons/icomoon/devui-icon.css';

createApp(App).use(MateChat).mount('#app');
```


### 二、通过iframe嵌入独立页面

**适用场景**：需快速为第三方平台添加AI助手，且不希望侵入宿主环境。

**步骤**：

1. `构建独立MateChat页面`: 创建一个包含MateChat组件的独立Vue项目，并打包为静态资源或独立部署。
2. `嵌入iframe`：在宿主页面中通过iframe加载matechat应用。


### 三、与其他框架集成（如React/Angular）

**适用场景**：需与现有其他框架的宿主应用集成

**方案建议**：
1. `封装Web Component`: 将MateChat组件打包为自定义元素，供任意框架调用。
2. `通过微前端架构`: 使用qiankun、microApp等微前端方案将MateChat作为独立子应用加载。

## 未来计划（社区共建）

**官方React/Angular适配库**：我们正规划推出`@matechat/react` 和 `@matechat/angular` 等适配版本，提供原生API支持。

**诚邀开发者参与**：若您熟悉React/Angular或跨框架开发，欢迎加入 [MateChat项目](https://gitcode.com/DevCloudFE/MateChat)，共同构建多框架统一生态！

