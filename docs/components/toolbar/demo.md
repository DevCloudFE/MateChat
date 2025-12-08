---
title: Toolbar组件
desc: Toolbar组件demo页
bannerSrc: '/textareaBanner.png'
iconSrc: '/textareaIcon.png'
---


### 基本用法

:::demo

```vue
<template>
  <div class="demo-toolbar-basic">
    <McToolbar 
      :items="basicItems" 
      iconSize="18" 
      @onClick="handleItemClick"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import Recover from './recover.svg';

const basicItems = [
  {
    key: 'copy',
    icon: 'copy',
    label: '复制',
    text: '复制内容 copy value',
  },
  {
    key: 'like',
    icon: 'like',
    label: '点赞',
    isActive: false
  },
  {
    key: 'dislike',
    icon: 'dislike',
    label: '点踩',
    isActive: false
  },
  {
    key: 'share',
    icon: 'share',
    label: '分享',
  },
  {
    key: 'delete',
    icon: 'delete',
    label: '删除',
  },
  {
    key: 'delete',
    icon: 'delete',
    label: '自定义',
    contentRender: () => h('img', {
        src: Recover,
        width: '24px',
        height: '24px'
    }),
  }
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>

<style scoped>
.demo-toolbar-basic {
  padding: 16px;
}
</style>
```
:::