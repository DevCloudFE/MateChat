---
title: Bubble 气泡
desc: 用于承载对话内容的气泡组件
bannerSrc: '/bubbleBanner.png'
---


 <script type="text/javascript">
  // 加载webcomponent脚本
  import { loadWebComponentScript } from '/components-ng/utils/web-component-loader.js';
  const webComponentConfig = {
      scriptUrl: '/angular-webcomponents/main.js',
      polyfillsUrl: '/angular-webcomponents/polyfills.js',
      runtimeUrl: '/angular-webcomponents/runtime.js',
      componentName: 'mc-ng-input',
      maxRetries: 3,
      retryDelay: 2000
  };            

  loadWebComponentScript(webComponentConfig);
   
   </script>


### 基础用法

最简单的气泡消息展示，可以设置左侧或右侧对齐。
基本用法只需传入 `content` 即可。


<mc-ng-bubble-basic></mc-ng-bubble-basic>

### 显示 Loading 状态

当设置 `loading` 为 `true` 时，将不会显示气泡内的其他区域。我们内置了一个默认的 `loading` 状态，如果不满足你的使用需求，可以通过 `loadingTpl` 插槽来自定义 `loading`。

<mc-ng-bubble-loading></mc-ng-bubble-loading>

### 支持不同的气泡样式

默认为 `filled`，还可以设置 `bordered` 和 `none`，其中 `filled` 和 `bordered` 我们为其设置了间距和圆角，`none` 则不带任何样式。

<mc-ng-bubble-variant></mc-ng-bubble-variant>

### 支持不同的气泡对齐方式

我们提供了 `left` 和 `right` 两种对齐方式，方便你区分用户提问和模型回答。

<mc-ng-bubble-align></mc-ng-bubble-align>

### 支持配置头像, 设置不同的头像位置

默认的我们的头像将显示在侧边，你也可以通过 `avatarPosition` 将其显示在气泡上方。
<mc-ng-bubble-avatar-config></mc-ng-bubble-avatar-config>

### 完全自定义头像区域

我们提供了 `avatar` 插槽，支持你自定义头像区的显示，进行更复杂的头像渲染。
<mc-ng-bubble-avatar-plus></mc-ng-bubble-avatar-plus>

### 自定义气泡内容区

我们提供了 `default` 插槽，支持你自定义内容区的显示，进行更复杂的数据渲染，下面将以 `markdown` 为例。

<mc-ng-bubble-custom></mc-ng-bubble-custom>

### 完全自定义气泡内容区域

将 `variant` 设置为 `none` 之后我们将不会为气泡内容区添加任何样式，方便你进行更多个性化的展示。

<mc-ng-bubble-variant-avatar></mc-ng-bubble-variant-avatar>