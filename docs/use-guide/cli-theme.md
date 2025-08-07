# 主题化配置

MateChat Cli模板应用支持灵活的主题配置，默认提供深色与浅色两种主题，并支持高度自定义。通过修改 `src/global-config.ts` 配置文件，您可以轻松实现主题定制。以下是详细配置指南：

### 默认主题

应用预设了两种主题风格：浅色主题和深色主题。您可以直接引入并应用这些主题。

在 `src/global-config.ts` 中配置主题变量，代码示例如下：

```typescript
import { lightTheme, darkTheme } from "./constant";

export default {
  theme: lightTheme,
} as IGlobalConfig;

```

浅色主题效果：
<img src="/png/theme/matechat-theme-light.png" alt="浅色主题效果" />

### 自定义主题

若预定义主题无法满足需求，可通过自定义主题色值实现主题定制。系统支持基于主色、主背景色等核心色值自动推导完整主题配置，降低自定义成本。

#### 示例
例如，若想创建一个`粉色系`主题，只需指定一个主色（如 `#F7A2AD`），系统会基于此主色智能推导其他关联颜色（包括按钮、链接、背景等元素的颜色）。

此外，您还可以灵活配置全局背景样式：支持纯色背景、渐变背景或自定义背景图片，满足各种视觉需求。


在 `src/global-config.ts` 中配置主题变量，代码示例如下：

```ts
// 自定义主题配置
export default {
  theme: {
    data: {
      // 关键色值配置
      "devui-brand": "#F7A2AD",       // 品牌主色
      "mc-global-bg": "linear-gradient(to bottom, #FFDDE1, #EE9CA7)",  // 渐变背景
      // 可选：指定其他主题变量，若不指定则使用自动推导的值
      // "devui-text": "#333333",       // 文本色
      // "devui-border": "#e8e8e8"      // 边框色
      // 可自定义添加其他主题变量，并在样式中使用
      // "custom-color": "#F7A2AD",
    }
  }
} as IGlobalConfig;
```

现在我们已经完成了主题的自定义，来看看效果吧

<img src="/png/theme/matechat-theme-pink.png" />

更多自定义主题配置可参考 `src/constant/theme-data.ts` 中的 `CustomThemeDataConfig` 实现。