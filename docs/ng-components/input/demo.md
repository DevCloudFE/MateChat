---
title: Input 输入
desc: 用于对话的输入框组件
bannerSrc: '/inputBanner.png'
iconSrc: '/inputIcon.png'
---

 <script type="text/javascript">
  // 加载webcomponent脚本
  import { loadWebComponentScript } from '/ng-components/utils/web-component-loader.js';
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

# Input 输入框组件

## 介绍

Input 输入框是最基础的表单组件，用于收集用户输入。本组件提供了丰富的功能和样式选项，满足各种输入场景需求。


### 基本用法
绑定 `value` 等基本参数进行使用。

<mc-ng-input-basic></mc-ng-input-basic>

### 自动聚焦

通过 `autofocus` 属性设置输入框在组件挂载后自动获得焦点，默认为 `false`。当输入框被禁用时，自动聚焦不会生效。

<mc-ng-input-auto></mc-ng-input-auto>

### 展示形态

通过`displayType`参数设置展示形态，支持的值为`full`和`simple`，默认为`full`。

`full`形态，prefix 插槽和输入框在同一行，extra 插槽和发送按钮在下方。

`simple`形态，prefix 插槽、输入框和发送按钮在同一行，不支持 extra 插槽。

`variant`参数设置为`borderless`，可设置不带边框。

通过`sendBtnVariant`参数控制发送按钮的形态，支持的值为`full`和`simple`，默认为`full`。

<mc-ng-input-suffix></mc-ng-input-suffix>


### 提交模式

通过`submitShortKey`设置提交快捷键，支持的值为`enter`和`shiftEnter`，默认为`enter`。

当提交快捷键为`enter`时，换行快捷键为`shift+enter`；当提交快捷键为`shift+enter`时，换行快捷键为`enter`。

<mc-ng-input-submit></mc-ng-input-submit>

### 自定义发送按钮

通过`button`插槽自定义发送按钮，实现按钮 disable、loading 等状态和按钮图标、按钮文案的自定义。

<mc-ng-input-button></mc-ng-input-button>

### 自动调整高度

通过 `autosize` 属性让文本域自动调整高度，支持布尔值和配置对象两种形式。

- 设置为 `true`：使用默认配置（最小1行，最大5行）
- 设置为对象：可自定义最小和最大行数，如 `{ minRows: 2, maxRows: 10 }`
<mc-ng-input-auto-size></mc-ng-input-auto-size>

### 自定义插槽

通过`head`插槽自定义输入框顶部的内容，通过`extra`自定义发送按钮左侧的内容。

<mc-ng-input-slot></mc-ng-input-slot>
