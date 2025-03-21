---
title: MarkDown 卡片
desc: 用于显示 MarkDown 内容的卡片组件
bannerSrc: '/bubbleBanner.png'
---

按需引入路径：

```ts
import { McMarkdownCard } from '@matechat/core';
```

### 基本用法

基本用法只需传入 content 即可

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const themeService = window['devuiThemeService'];
const theme = ref('light');
const content = ref(`
# 快速排序（Quick Sort）

### 介绍
**快速排序（Quick Sort）**：是一种高效的排序算法，它采用分治法（Divide and Conquer）的思想。它的基本思路是：

1. 选择一个基准值（pivot）
2. 将数组分成两部分：小于基准值的部分和大于等于基准值的部分
3. 递归地对这两部分进行排序

### 代码实现

1. 以下是快速排序的实现方法
\`\`\`ts
function quickSort(arr) {
  function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // 输出排序后的数组
}
\`\`\`
`);

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
```

:::

### 主题切换

组件提供了浅色与深色两种主题，默认使用浅色主题，可以通过 theme 属性来切换主题

:::demo

```vue
<template>
  <div class="btn-container">
    <d-button variant="solid" @click="changeTheme">切换主题</d-button>
  </div>
  <div class="theme-container" :class="themeClass">
    <McMarkdownCard :content="content" :theme="theme"></McMarkdownCard>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
const theme = ref('light');
const themeClass = ref('light-background');
const themeService = window['devuiThemeService'];
const content = ref(`
# 快速排序（Quick Sort）

### 介绍
**快速排序（Quick Sort）**：是一种高效的排序算法，它采用分治法（Divide and Conquer）的思想。它的基本思路是：

1. 选择一个基准值（pivot）
2. 将数组分成两部分：小于基准值的部分和大于等于基准值的部分
3. 递归地对这两部分进行排序

### 代码实现

1. 以下是快速排序的实现方法
\`\`\`ts
function quickSort(arr) {
  function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // 输出排序后的数组
}
\`\`\`
`);

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
    themeClass.value = themeService.currentTheme.id === 'infinity-theme' ? 'light-background' : 'dark-background';
  }
};

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
<style scoped lang="scss">
.btn-container {
  display: flex;
  justify-content: end;
}
.theme-container {
  margin-top: 8px;
  padding: 12px;
  border-radius: 8px;
}
.light-background {
  background-color: #f6f6f8;
}

.dark-background {
  background-color: #1a1a1c;
}
</style>
```

:::

### 数学公式
通过配置md-plugins katex插件，进行数学公式渲染。
:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme" :mdPlugins="mdPlugins"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { katex } from '@mdit/plugin-katex'; // 请首先安装@mdit/plugin-katex依赖
const themeService = window['devuiThemeService'];
const theme = ref('light');
const mdPlugins = ref([{
  plugin: katex,
  opt: {}
}])
const content = ref(
`
$E = mc^2$
$\\sqrt{3x-1}+(1+x)^2$
`
);

const handleAction = (codeBlockData) => {
  console.log(codeBlockData);
}

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
}

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
}

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
})
</script>
<style>
@import 'katex/dist/katex.min.css';  /* 请首先安装 katex 依赖 */
</style>

```

:::


### Mermaid 渲染
通过配置md-plugins Mermaid插件，进行Mermaid图渲染。
:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme" :mdPlugins="mdPlugins"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import markdownItMermaid from "@datatraccorporation/markdown-it-mermaid";; // 请首先安装@datatraccorporation/markdown-it-mermaid依赖
const themeService = window['devuiThemeService'];
const theme = ref('light');
const mdPlugins = ref([{
  plugin: markdownItMermaid,
}])
const content = ref(`
# Flow Chart
\`\`\`mermaid
flowchart LR
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

# Class Diagram
\`\`\`mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am I?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
\`\`\`

# State Diagram
\`\`\`mermaid
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
\`\`\`
`);

const handleAction = (codeBlockData) => {
  console.log(codeBlockData);
}

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
}

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
}

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
})
</script>
```

:::


### PlantUML 渲染
通过配置md-plugins plantuml插件，进行plantuml图渲染。
:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme" :mdPlugins="mdPlugins"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import PlantUml from 'markdown-it-plantuml'; // 请首先安装markdown-it-plantuml依赖
const themeService = window['devuiThemeService'];
const theme = ref('light');
const mdPlugins = ref([{
  plugin: PlantUml,
  opts: {
    server: 'https://www.plantuml.com/plantuml'
  } // 自定义server可参考plantuml官方文档进行搭建
}])
const content = ref(`
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very long" as Long
' You can also declare:
' "Bob()" -> Long as "This is very long"
Long --> "Bob()" : ok
@enduml`);

const handleAction = (codeBlockData) => {
  console.log(codeBlockData);
}

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
}

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
}

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
})
</script>
```

:::


### emoji渲染
通过配置markdown-it-emoji插件，进行emoji表情渲染。
:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme" :mdPlugins="mdPlugins"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { full as emoji } from 'markdown-it-emoji' // 请首先安装markdown-it-emoji依赖
const themeService = window['devuiThemeService'];
const theme = ref('light');
const mdPlugins = ref([{
  plugin: emoji
}])
const content = ref(`
:joy: :thumbsup: :laughing: :blush: :dog:
`);

const handleAction = (codeBlockData) => {
  console.log(codeBlockData);
}

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
}

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
}

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
})
</script>

```

:::

### 自定义代码块操作区

我们提供了 `actions` 插槽，支持你自定义代码块操作区

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme">
    <template #actions="{ codeBlockData }">
      <div class="btn-group">
        <d-button variant="solid" @click="handleAction(codeBlockData)">自定义按钮</d-button>
      </div>
    </template>
  </McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const themeService = window['devuiThemeService'];
const theme = ref('light');
const content = ref(`以下是快速排序的实现方法：

\`\`\`ts
function quickSort(arr) {
  // 快速排序
}
\`\`\`
`);

const handleAction = (codeBlockData) => {
  console.log(codeBlockData);
};

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
```

:::

### 自定义代码块头部

我们提供了 `header` 插槽，支持你自定义代码块头部区域

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme">
    <template #header="{ codeBlockData }">
      <div class="header-container">
        <div class="header-left">
          <img src="https://matechat.gitcode.com/logo.svg" alt="logo" />
          <span>MateChat</span>
        </div>
        <div class="header-right">
          <i class="icon-publish-new"></i>
        </div>
      </div>
    </template>
  </McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const themeService = window['devuiThemeService'];
const theme = ref('light');
const content = ref(`以下是快速排序的实现方法：

\`\`\`ts
function quickSort(arr) {
  // 快速排序
}
\`\`\`
`);

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
<style lang="scss">
.header-container {
  padding: 4px 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--devui-dividing-line);

  i {
    cursor: pointer;
  }

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon-inform {
    color: var(--devui-info);
  }

  .icon-mandatory {
    color: var(--devui-success);
  }

  .icon-publish-new {
    color: var(--devui-waiting);
  }
}
</style>
```

:::

### 自定义代码块内容区

我们提供了 `content` 插槽，支持你自定义代码块内容区

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme">
    <template #content="{ codeBlockData }">
      <div class="content-container" v-html="transfer(codeBlockData)"></div>
    </template>
  </McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
const themeService = window['devuiThemeService'];
const theme = ref('light');
const content = ref(`以下是快速排序的实现方法：
\`\`\`ts
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // 输出排序后的数组
\`\`\`
`);

const mdt = markdownIt({
  breaks: true,
  linkify: true,
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const preCode = hljs.highlight(lang, str, true).value;
        const lines = preCode.split(/\n/).slice(0, -1);
        let html = lines
          .map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>';
          })
          .join('');
        html = '<ol>' + html + '</ol>';
        return '<pre class="hljs"><code>' + html + '</code></pre>';
      } catch (__) {}
    }

    const preCode = mdt.utils.escapeHtml(str);
    const lines = preCode.split(/\n/).slice(0, -1);
    let html = lines
      .map((item, index) => {
        return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>';
      })
      .join('');
    html = '<ol>' + html + '</ol>';
    return '<pre class="hljs"><code>' + html + '</code></pre>';
  },
});

const htmlStr = mdt.render(content.value);

const transfer = (codeBlockData) => {
  const { code, language } = codeBlockData;
  const codeBlockStr = '\`\`\`' + language + '\n' + code + '\`\`\`';
  return mdt.render(codeBlockStr);
};

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>

<style lang="scss">
@use 'sass:meta';
body[ui-theme='galaxy-theme'] {
  @include meta.load-css('highlight.js/styles/github-dark.css');
}

body[ui-theme='infinity-theme'] {
  @include meta.load-css('highlight.js/styles/github.css');
}
</style>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';
.content-container :deep() {
  padding: 12px;
  background-color: $devui-base-bg;

  &.hljs {
    background-color: $devui-base-bg;
  }

  pre {
    margin: 0;
  }

  ol {
    margin: 0;
    background-color: $devui-base-bg;
  }
}
</style>
```

:::
