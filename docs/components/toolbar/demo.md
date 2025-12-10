---
title: Toolbar 工具栏
desc: 快速配置点赞等操作按钮/功能
bannerSrc: "/textareaBanner.png"
iconSrc: "/textareaIcon.png"
---

### 基本用法

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McToolbar :items="basicItems" @onClick="handleItemClick" />
  </div>
</template>

<script setup>
const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: "复制内容 copy value",
  },
  {
    key: "like",
    icon: "like",
    label: "点赞",
    isActive: true,
  },
  {
    key: "dislike",
    icon: "dislike",
    label: "点踩",
    isActive: false,
  },
  {
    key: "share",
    icon: "share",
    label: "分享",
  },
  {
    key: "delete",
    icon: "delete",
    label: "删除",
  },
  {
    key: "refresh",
    icon: "refresh",
    label: "刷新",
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 按钮大小和间隔

可以通过 `iconSize` 和 `gap` 定义图标大小和图标间隔。

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McToolbar
      :items="basicItems"
      :icon-size="24"
      :gap="16"
      @onClick="handleItemClick"
    />
  </div>
</template>

<script setup>
const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: "复制内容 copy value",
  },
  {
    key: "refresh",
    icon: "refresh",
    label: "刷新",
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 自定义图标

icon字段支持传 `VNode` 或 `() => VNode` 类型的值，实现icon部分的自定义。

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McToolbar :items="basicItems" @onClick="handleItemClick" />
  </div>
</template>

<script setup>
import { h } from "vue";
import DownloadSvgComponent from "./DownloadSvgComponent.vue";

const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: "复制内容 copy value",
  },
  {
    key: "download",
    icon: h(DownloadSvgComponent),
    label: "下载",
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 自定义操作项

通过 `contentReder` 参数实现操作项的自定义。

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McToolbar :items="basicItems" @onClick="handleItemClick" />
  </div>
</template>

<script setup>
import { h, ref, computed } from "vue";

const currentValue = ref(1);
const STEP = 1;
// 确保数值为有效数字
const validValue = computed(() => {
  return isNaN(currentValue.value) ? 0 : currentValue.value;
});

// 增加数值
const handleIncrement = () => {
  currentValue.value = validValue.value + STEP;
};

// 减少数值
const handleDecrement = () => {
  currentValue.value = validValue.value - STEP;
};
const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: "复制内容 copy value",
  },
  {
    key: "numberInput",
    contentRender: () => {
      return h(
        "div",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            fontSize: "16px",
          },
        },
        [
          // 减号按钮
          h(
            "button",
            {
              style: {
                padding: "8px 16px",
                border: "none",
                backgroundColor: "#f3f4f6",
                cursor: "pointer",
                opacity: 1,
                transition: "background-color 0.2s",
              },
              onClick: handleDecrement,
              onMouseover: (e) => (e.target.style.backgroundColor = "#e5e7eb"),
              onMouseout: (e) => (e.target.style.backgroundColor = "#f3f4f6"),
            },
            "-",
          ),

          // 数值显示区域（不可编辑，仅展示）
          h(
            "span",
            {
              style: {
                padding: "8px 20px",
                borderLeft: "1px solid #e5e7eb",
                borderRight: "1px solid #e5e7eb",
                minWidth: "40px",
                textAlign: "center",
              },
            },
            validValue.value,
          ),

          // 加号按钮
          h(
            "button",
            {
              style: {
                padding: "8px 16px",
                border: "none",
                backgroundColor: "#f3f4f6",
                cursor: "pointer",
                opacity: 1,
                transition: "background-color 0.2s",
              },
              onClick: handleIncrement,
              onMouseover: (e) => (e.target.style.backgroundColor = "#e5e7eb"),
              onMouseout: (e) => (e.target.style.backgroundColor = "#f3f4f6"),
            },
            "+",
          ),
        ],
      );
    },
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 直接使用内置图标组件

复制等图标可直接作为组件使用

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McCopyIcon text="复制的内容" />
    <McDeleteIcon />
    <McLikeIcon :is-active="true" />
    <McDislikeIcon :is-active="false" />
    <McRefreshIcon />
    <McShareIcon :width="20" :height="20" />
  </div>
</template>

<script setup></script>

<style scoped>
.demo-toolbar-basic {
  display: flex;
  gap: 8px;
}
:deep(.mc-icon-svg-class #ipd-copy-new) {
  fill: red;
}
</style>
```

:::
