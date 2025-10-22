---
title: Bubble WebComponent 演示
desc: Angular Bubble 组件通过 WebComponent 方式在 Vue 项目中的各种使用场景
bannerSrc: '/bubbleBanner.png'
iconSrc: '/defaultIcon.png'
---

## 属性

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
|-------|------|-------|------|------|
| `content` | `string` | `''` | 否 | 气泡中显示的内容 |
| `loading` | `boolean` | `false` | 否 | 是否显示加载状态 |
| `align` | `'left' \| 'right'` | `'left'` | 否 | 气泡对齐方式，左侧或右侧 |
| `avatarPosition` | `'side' \| 'top'` | `'side'` | 否 | 头像位置，侧边或顶部 |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | 否 | 气泡样式变体，填充或描边 |
| `avatarConfig` | `object` | `undefined` | 否 | 头像配置对象 |

### avatarConfig 对象结构

```ts
interface BubbleAvatar {
  /** 头像类型，'name'(文字头像)或'img'(图片头像) */
  type?: 'name' | 'img';
  /** 头像图片URL，当type为'img'时使用 */
  imgUrl?: string;
  /** 头像显示的名字，当type为'name'时使用 */
  name?: string;
  /** 头像尺寸，单位px */
  size?: number;
  /** 文字头像的背景颜色 */
  bgColor?: string;
  /** 文字头像的文字颜色 */
  textColor?: string;
}
```