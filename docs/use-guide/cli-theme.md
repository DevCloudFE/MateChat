# 主题化配置

系统默认支持深色与浅色主题，可通过修改 `sr/global-config.ts` 配置文件指定当前使用的主题。以下为详细配置说明：

---

## 默认主题
根据项目需求选择预定义的浅色或深色主题，通过导入对应主题包完成配置。

在 `src/global-config.ts` 中引入并应用浅色或深色主题：
```typescript
import { lightTheme, darkTheme } from "./constant";

export default {
  theme: lightTheme,
} as IGlobalConfig;
```

## 自定义主题

若预定义主题无法满足需求，可通过自定义主题色值实现主题定制。系统支持基于主色、主背景色等核心色值自动推导完整主题配置，降低自定义成本。


在 `src/global-config.ts` 中配置主题变量，示例如下：

```ts
// 自定义主题配置
export default {
  theme: {
    data: {
      // 关键色值配置（必填/推荐）
      "devui-brand": "#49ad49",       // 品牌主色（如按钮、高亮色）
      "mc-global-bg": "linear-gradient(to bottom, #bfe7bf, #e4f4ee, #c8e6f5)",  // 全局背景色
      // 可选扩展：其他主题变量（如文字色、边框色等），不设置则根据主色自动推导
      // "devui-text": "#333333",
      // "devui-border": "#e8e8e8"
    }
  }
} as IGlobalConfig;
```

更多自定义主题配置可参考 `src/constant/theme-data.ts` 中的 `CustomThemeDataConfig` 实现。