---
title: Bubble 气泡
desc: 用于承载对话内容的气泡组件
bannerSrc: '/bubbleBanner.png'
---

### 参数

| 参数名         | 类型                              | 默认值   | 说明                                                   |
| -------------- | --------------------------------- | -------- | ------------------------------------------------------ |
| content        | `string`                          | ''       | 气泡显示内容                                           |
| loading        | `boolean`                         | false    | 是否显示 loading 态，显示 loading 时其他区域将不会显示 |
| align          | [BubbleAlign](#bubblealign)       | 'left'   | 气泡对齐方式                                           |
| avatarPosition | [AvatarPosition](#avatarposition) | 'side'   | 头像位置                                               |
| variant        | [BubbleVariant](#bubblevariant)   | 'filled' | 气泡样式                                               |
| avatarConfig   | [BubbleAvatar](#bubbleavatar)     | --       | 头像配置，使用 avatar 插槽后该配置无效                      |

### 插槽

| 插槽名     | 返回值 | 说明               |
| ---------- | ------ | ------------------ |
| default    | --     | 自定义气泡内容区域 |
| loadingTpl | --     | 自定义加载样式     |
| top        | --     | 自定义气泡上方区域 |
| bottom     | --     | 自定义气泡下方区域 |
| avatar     | --     | 自定义头像区域   |

### 类型定义

#### BubbleAlign

```ts
type BubbleAlign = 'left' | 'right';
```

#### AvatarPosition

```ts
type AvatarPosition = 'top' | 'side';
```

#### BubbleVariant

```ts
type BubbleVariant = 'filled' | 'none' | 'bordered';
```

#### BubbleAvatar

```ts
interface BubbleAvatar {
  name?: string; // 头像内显示的名字
  gender?: 'male' | 'female'; // 根据性别头像背景色会有所不同
  width?: number; // 头像宽度
  height?: number; // 头像高度
  isRound?: boolean; // 是否是圆形头像
  imgSrc?: string; // 头像显示图片，imgSrc 优先级比 name 高
  displayName?: string; // 头像旁显示的名字，该属性仅当头像位于气泡上方时生效，如果希望当头像位于侧边时生效，我们推荐你通过 top 插槽来放置相关信息
}
```
