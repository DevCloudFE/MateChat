---
title: Toolbar 工具栏
desc: 快速配置点赞等操作按钮/功能
bannerSrc: "/textareaBanner.png"
iconSrc: "/textareaIcon.png"
---

### 基本用法

通过配置 `items` 参数实现工具栏的快速搭建。

:::demo

```vue
<template>
  <div>
    <McBubble
      :content="content"
      :avatarConfig="{ imgSrc: '/logo.svg' }"
    >
      <template #bottom>
          <McToolbar :items="basicItems" style="margin-top: 8px;" @onClick="handleItemClick" />
      </template>
    </McBubble>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('这里是Toolbar 工具栏组件的的基本用法演示，通过配置items参数快速搭建一个工具栏。');
const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: content.value,
  },
  {
    key: "refresh",
    icon: "refresh",
    label: "重新回答",
  },
  {
    key: "like",
    icon: "like",
    label: "点赞",
    isActive: false,
    onClick: () => {
      console.log('like 的 onClick 方法');
    }
  },
  {
    key: "dislike",
    icon: "dislike",
    label: "点踩",
    isActive: false,
  },
  {
    key: "delete",
    icon: "delete",
    label: "删除",
  },
  {
    key: "share",
    icon: "share",
    label: "分享",
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
            <template #download-icon="{ actionData }">
                <i class="icon icon-download-2" style="font-size: 16px;" />
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

const switchValue = ref(false);
const variantValue = computed(() => {
  return switchValue.value ? 'bordered' : 'filled'
});

const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: "复制内容 copy value",
  },
  {
    key: "download",
    label: "下载",
    onClick: (actionData) => {
      console.log('download 点击事件', actionData);
    }
  },
  {
    key: "switch",
  },
];

const handleItemClick = (item, event) => {
  console.log(`点击了【${item.label}】`, item, event);
};
</script>
```

:::

### 直接使用内置图标组件

复制等操作项可直接作为组件使用，可通过设置style的color样式改变图标颜色。单独使用图标组件情况下，点赞点踩没有联动效果，需要手动控制。

:::demo

```vue
<template>
    <McBubble :content="'Hello MateChat'" :align="'right'" :avatarConfig="{ imgSrc: '/png/demo/userAvatar.svg' }">
      操作栏组件单独使用
      <div class="demo-toolbar-basic">
        <McCopyIcon text="复制的内容" class="copy-class" />
        <McLikeIcon class="like-color" :is-active="likeActive" @active-change="activeChange" @click="likeClick"/>
        <McDislikeIcon :is-active="dislikeActive" @active-change="dislikeActiveChange" />
        <McShareIcon :width="size" :height="size" />
      </div>
    </McBubble>
    <McBubble
      content="Hello MateChat"
      :avatarConfig="{ imgSrc: '/logo.svg' }"
      style="margin-top: 20px;"
    >
        <McMarkdownCard
          :content="content1"
          :theme="theme"
          :typing="true"
          :typingOptions="typingOptions4"
          @typingEnd="typingEnd"
        ></McMarkdownCard>
        <McToolbar
          v-if="streamEnd"
          :items="basicItems"
          style="margin-top: 8px;"
        />
    </McBubble>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const MOCK_CONTENT = `与其他组件结合使用，在打字机结束后显示操作栏，如果你需要重新执行打字机动效，可点击操作栏刷新按钮。`;
let themeService;
const theme = ref('light');
const content = ref(MOCK_CONTENT);
const size = 16;
const typingOptions4 = {
  interval: 200,
  step: 2,
};
const likeActive = ref(true);
const dislikeActive = ref(false);

const content1 = ref('');
let interval;
let contentEnd = false;
const streamEnd = ref(false);

const basicItems = [
  {
    key: "copy",
    icon: "copy",
    label: "复制",
    text: MOCK_CONTENT,
  },
  {
    key: "refresh",
    icon: "refresh",
    label: "刷新",
    onClick: () => {
      content1.value = '';
      contentEnd = false;
      streamEnd.value = false;
      setTimeout(() => {
        content.value = MOCK_CONTENT;
        streamContent();
      });
    },
  },
  {
    key: "like",
    icon: "like",
    label: "点赞",
    isActive: false,
    onClick: () => {
      console.log('like 的 onClick 方法');
    }
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
];

const streamContent = () => {
  clearInterval(interval);
  let currentIndex = 0;
  interval = setInterval(() => {
    currentIndex += Math.ceil(Math.random() * 10);
    content1.value = MOCK_CONTENT.slice(0, currentIndex);
    if (currentIndex > MOCK_CONTENT.length) {
      contentEnd = true;
      clearInterval(interval);
    }
  }, 100);
}

const generateAnswer = () => {
  content.value = '';
  content1.value = '';
  setTimeout(() => {
    content.value = MOCK_CONTENT;
    streamContent();
  });
}

function likeClick(e) {
  console.log('like点击事件', e);
}

// 单独使用like和dislike组件的情况下手动控制两个组件的互斥行为
function activeChange(isActive) {
  console.log('activeChange', isActive);
  likeActive.value = isActive;
  dislikeActive.value = false;
}

function dislikeActiveChange(isActive) {
    console.log('dislikeActiveChange', isActive);
    dislikeActive.value = isActive;
    likeActive.value = false;
}

const typingEnd = () => {
  if (contentEnd) {
    streamEnd.value = true;
    console.log('流式与打字机效果完成');
  }
}

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  streamContent();
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>

<style scoped>
.copy-class {
  color: green;
}
/* like 和 dislike 激活状态下组件会添加 .mc-action-item-active 属性，可单独修改激活状态下的颜色 */
.like-color.mc-action-item-active {
    color: #FFCC80;
}
</style>
```

:::
