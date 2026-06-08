---
title: McConfigProvider 全局化配置
desc: 为组件提供统一的全局化配置。
---

### 参数

| 参数名             | 类型                                | 默认值     | 说明                                     |
| ----------------- | ----------------------------------- | --------- | ----------------------------------------- |
| customLocaleMessages | `CustomLocaleMessages`           | -          | 语言包配置                      |
| locale               | `string`                         | 'zh-cn'    | 语言                      |
| theme                | `string \| CustomThemeConfig`          | -          | 主题                      |


### 类型定义

#### CustomLocaleMessages

语言包配置，用于自定义组件的文案内容。

```ts
// 文案配置：具体可参考 @matechat/core/locale/lang/zh-cn.ts
export type LocaleMessages = Record<string, any>;

// key：语言（如：zh-cn、en-us），value：语言包配置
export type CustomLocaleMessages = Record<string, LocaleMessages>;

export interface CustomThemeConfig {
  id?: string; // 主题id
  name?: string; // 主题名称
  data?: Record<string, string>; // 主题数据
  isDark?: boolean; // 是否为暗黑主题
  autoDeduction?: boolean; // 是否自动推导主题；如果使用自动推导主题，需要在主题数据中包含主题颜色'devui-brand'字段
  [key: string]: any; // 其他自定义字段
};
```
