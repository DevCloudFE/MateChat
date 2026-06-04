---
title: McConfigProvider 全局化配置
desc: 为组件提供统一的全局化配置。
---

### 参数

| 参数名             | 类型                                | 默认值     | 说明                                     |
| ----------------- | ----------------------------------- | --------- | ----------------------------------------- |
| customLocaleMessages | `CustomLocaleMessages`           | -          | 语言包配置                      |
| locale               | `string`                            | 'zh-cn'    | 语言                      |



### 类型定义

#### CustomLocaleMessages

语言包配置，用于自定义组件的文案内容。

```ts
// 文案配置：具体可参考 @matechat/core/locale/lang/zh-cn.ts
export type LocaleMessages = Record<string, any>;

// key：语言（如：zh-cn、en-us），value：语言包配置
export type CustomLocaleMessages = Record<string, LocaleMessages>;
```
