---
title: ToolCall 工具
desc: 快速配置点赞等操作按钮/功能
bannerSrc: "/textareaBanner.png"
iconSrc: "/textareaIcon.png"
---

按需引入路径：

```ts
import { McToolCall } from '@matechat/core';
```

### 基本用法

通过配置 `items` 参数实现工具栏的快速搭建。

:::demo

```vue
<template>
  <div>
    <McToolCall
      name="read"
      description="描述111"
      status="pending"
      defaultExpanded="true"
    >
      <div>
        <span>内容</span>
        <div>div box</div>
      </div>
    </McToolCall>
  </div>
</template>

<script setup>
import { ref } from 'vue';


</script>
```

:::
