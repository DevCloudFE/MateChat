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
  <div>
    <McBubble
      :content="content"
      :avatarConfig="{ imgSrc: '/logo.svg' }"
      variant="bordered"
    >
      <template #bottom>
          <McToolbar :items="basicItems" style="margin-top: 8px;" @onClick="handleItemClick" />
      </template>
    </McBubble>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('Hello MateChat');
const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: content.value,
  },
  {
    key: "like",
    icon: "like",
    label: "点赞",
    isActive: false,
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
    <McBubble
      content="Hello MateChat"
      :avatarConfig="{ imgSrc: '/logo.svg' }"
      variant="bordered"
    >
      <template #bottom>
        <McToolbar
          :items="basicItems"
          :icon-size="18"
          :gap="0"
          style="margin-top: 8px;"
          @onClick="handleItemClick"
        />
      </template>
    </McBubble>
  </div>
</template>

<script setup>
const basicItems = [
  {
    key: "refresh",
    icon: "refresh",
    label: "刷新",
  },
  {
    key: "delete",
    icon: "delete",
    label: "删除",
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 自定义图标或操作项

通过设置插槽实现自定义图标区域和或操作项区域

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McBubble
      content="Hello MateChat"
      :avatarConfig="{ imgSrc: '/logo.svg' }"
      :variant="variantValue"
    >
      <template #bottom>
        <McToolbar :items="basicItems" style="margin-top: 8px;" @onClick="handleItemClick">
            <template #recover-icon="{ actionData }">
                <img :src="RecoverSvg" :title="actionData.label" />
            </template>
            <template #switch>
              <d-tooltip content="开启边框">
                <d-switch v-model="switchValue" size="sm" />
              </d-tooltip>
            </template>
        </McToolbar>
      </template>
    </McBubble>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import RecoverSvg from "./recover.svg";

const switchValue = ref(true);
const variantValue = computed(() => {
  return switchValue.value ? 'bordered' : 'none'
});

const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: "复制内容 copy value",
  },
  {
    key: "recover",
    label: "重试",
    onClick: (actionData) => {
      console.log('recover 点击事件', actionData);
    }
  },
  {
    key: "switch",
    label: "重试",
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 直接使用内置图标组件

复制等操作项可直接作为组件使用，可通过设置style的color样式改变图标颜色

:::demo

```vue
<template>
    <McBubble
      content="Hello MateChat"
      :avatarConfig="{ imgSrc: '/logo.svg' }"
      variant="bordered"
    >
      <div class="demo-toolbar-basic">
        <McCopyIcon text="复制的内容" class="copy-class" />
        <McLikeIcon :is-active="true" @active-change="activeChange" @click="likeClick"/>
        <McDislikeIcon :is-active="false" />
        <McRefreshIcon />
        <McShareIcon :width="size" :height="size" />
        <McDeleteIcon style="color: red;" />
      </div>
    </McBubble>
</template>

<script setup>

const size = 16;

function likeClick(e) {
  console.log('like点击事件', e);
}

function activeChange(isActive) {
  console.log('activeChange', isActive);
}
</script>

<style scoped>
.copy-class {
  color: green;
}
</style>
```

:::
