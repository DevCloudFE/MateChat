# Angular Bubble 组件 (WebComponent版本)

Bubble 是一个对话气泡组件，用于在聊天界面中展示消息。通过 WebComponent 技术，我们可以在 Vue 项目中无缝使用 Angular 开发的 Bubble 组件。

## 特性

- 支持左右两侧气泡展示
- 支持加载状态动画
- 可配置头像显示
- 适配不同屏幕尺寸
- 支持在 Vue 项目中直接使用

## 快速开始

### 在 Vue 项目中使用
### 直接在 HTML 中使用

## 文档导航

- [基本用法](/angular-components/bubble/demo) - 查看不同场景下的使用示例
- [API 参考](/angular-components/bubble/api) - 详细的属性和方法说明

## 注意事项

1. WebComponent 加载需要一定时间，请使用 `waitForAngularBubbleWC()` 确保组件加载完成后再进行操作
2. 在 Vue 组件中使用时，属性绑定需要使用 kebab-case 格式
3. 某些高级功能可能受限于 WebComponent 的跨框架特性
4. 如有性能问题，请参考[性能优化指南](/use-guide/performance)