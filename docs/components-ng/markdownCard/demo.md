---
title: MarkDown 卡片
desc: 用于显示 MarkDown 内容的卡片组件
bannerSrc: '/bubbleBanner.png'
---
按需引入路径：

```ts
import { MarkdownCardModule } from '@matechat/ng';
```

### 基本用法

基本用法只需传入 content 即可。

<mc-ng-markdown-basic></mc-ng-markdown-basic>



### 打字机效果
支持配置打字机动效果，当前内置不同效果样式可配置，支持配置动效速度与打字间隔，也适用流式数据返回场景。

<mc-ng-markdown-typing></mc-ng-markdown-typing>



### think标签支持

支持自定义的 think 标签，用于包裹特定内容并渲染为自定义样式的块级元素。适合用于强调思考过程或特殊内容展示。

<mc-ng-markdown-thinking></mc-ng-markdown-thinking>



### 主题切换

组件提供了浅色与深色两种主题，默认使用浅色主题，可以通过 theme 属性来切换主题。

<mc-ng-markdown-theme></mc-ng-markdown-theme>

### 数学公式
通过配置md-plugins katex插件，进行数学公式渲染（DEMO未实际渲染，实际使用时解开代码中注释即可按预期渲染）。

<mc-ng-markdown-math></mc-ng-markdown-math>

### Mermaid 渲染
1. 设置enableMermaid为true开启mermaid渲染。注意：开启此功能前请确保项目已正确安装mermaid库。

通过 npm 安装 mermaid:

```bash
$ npm install mermaid
```

2. 通过配置md-plugins Mermaid插件，进行Mermaid图渲染。

<mc-ng-markdown-mermaid></mc-ng-markdown-mermaid>



### PlantUML 渲染
通过配置md-plugins plantuml插件，进行plantuml图渲染。

<mc-ng-markdown-plantuml></mc-ng-markdown-plantuml>



### emoji渲染
通过配置markdown-it-emoji插件，进行emoji表情渲染。

<mc-ng-markdown-emoje></mc-ng-markdown-emoje>



### 自定义代码块操作区

我们提供了 `actions` 插槽，支持你自定义代码块操作区。

<mc-ng-markdown-code-operator></mc-ng-markdown-code-operator>



### 自定义代码块头部

我们提供了 `header` 插槽，支持你自定义代码块头部区域。

<mc-ng-markdown-header></mc-ng-markdown-header>

