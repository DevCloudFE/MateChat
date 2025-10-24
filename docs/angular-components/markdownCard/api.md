---
title: MarkDown 卡片
desc: 用于显示 MarkDown 内容的卡片组件
bannerSrc: '/bubbleBanner.png'
---


### 参数

| 参数名         | 类型                              | 默认值   | 说明                                                   |
| -------------- | --------------------------------- | -------- | ------------------------------------------------------ |
| content        | `string`                          | ''       | MarkDown文本                                           |
| theme        | [`Theme`](#theme)                          | 'light'       | MarkDown卡片主题                                           |
| mdOptions        | `object`                          | {}       | 设置 markdown 对字符串的处理方式， 可参考[markdown-it](https://www.npmjs.com/package/markdown-it?activeTab=readme)|
| mdPlugins       | [MdPlugin[]](#mdplugin)       | []       | 设置 markdown-it 插件|
| customXssRules       | [CustomXssRule[]](#customxssrule)       | []       | 自定义 xss 对某种 tag 的过滤方式，每条规则需要指定 tag, 并给出需要加入白名单的属性数组|
| enableThink | `boolean`                       | false         | 是否开启\<think\>标签识别                                 |
| thinkOptions | [`ThinkOptions`](#thinkoptions)                       | --         | \<think\>标签配置，自定义样式等                                       |
| typing | `boolean` | false  |  开启打字机效果    |                                       
| typingOptions | [`TypingOptions`](#typingoptions)  | `{ step: 2, interval: 50, style: 'normal' }`   |  打字机效果配置  |     
| enableMermaid | `boolean`                       | false         | 是否开启mermaid图形渲染 |
| mermaidConfig | `object`                       | {}         | mermaid相关配置，可参考[Mermaid](https://mermaid.nodejs.cn/config/usage.html)官网|



### 代码块插槽

| 插槽名     | 返回值 | 说明               |
| ---------- | ------ | ------------------ |
| codeActions    | { codeBlockData: [CodeBlockData](#codeblockdata) }     | 代码块头部右侧自定义操作区域     |
| codeHeader     | { codeBlockData: [CodeBlockData](#codeblockdata) }     | 自定义代码块头部区域     |
| codeContent     | { codeBlockData: [CodeBlockData](#codeblockdata) }     | 自定义代码块内容区域     |

### 事件

| 事件名     | 返回值 | 说明               |
| ---------- | ------ | ------------------ |
| after-mdt-init    | Object  | markdown-it实例mdt，在初始化完成后返回     |
| typingStart    | --  | 打字效果开始回调     |
| typing    | --  | 打字中每一步回调     |
| typingEnd    | --  | 打字结束回调     |

### 类型定义

#### CustomXssRule

```ts
interface CustomXssRule {
  key: string;
  value: string[] | null;
}
```

#### Mdplugin

```ts
interface Mdplugin {
  plugin: any;
  opts?: Object;
}

```
#### Theme

```ts
type Theme = 'light' | 'dark';
```

#### CodeBlockData

```ts
interface CodeBlockData {
  code: string;
  language: string;
}
``` 

#### ThinkOptions

```ts
interface ThinkOptions {
  customClass: string;
}
``` 

#### TypingOptions
```ts
interface TypingOptions {
  step: number | [number, number],  // 可指定两个数字之间step
  interval: number,
  style: 'normal' | 'cursor' | 'gradient' | 'color' 
}
```