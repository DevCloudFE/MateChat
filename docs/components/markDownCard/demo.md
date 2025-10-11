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

基本用法只需传入 content 即可。

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let themeService;
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
```

:::

### 打字机效果
支持配置打字机动效果，当前内置不同效果样式可配置，支持配置动效速度与打字间隔，也适用流式数据返回场景。

:::demo

```vue
<template>
  <div class="btn-container">
    <d-button variant="solid" @click="generateAnswer">重新执行</d-button>
  </div>
  <div>
    <span class="demo-title">默认效果</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">打字机并配置打字速度</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true" :typingOptions="typingOptions1"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">渐变打字</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true" :typingOptions="typingOptions2"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">彩色打字</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true" :typingOptions="typingOptions3"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">流式返回</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content1" :theme="theme" :typing="true" :typingOptions="typingOptions4" @typingEnd="typingEnd"></McMarkdownCard>
    </McBubble>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const MOCK_CONTENT = `**我了解到了你的需求**，*会进行<span style="color:red">打字机效果输出</span>，如果你需要重新执行打字机动效*，可点击重新执行按钮。`;
let themeService;
const content = ref(MOCK_CONTENT);
const theme = ref('light');

const typingOptions1 = {
  step: [1, 5],
  interval: 200,
  style: 'cursor',
};

const typingOptions2 = {
  interval: 200,
  style: 'gradient',
};

const typingOptions3 = {
  interval: 200,
  style: 'color',
};

const typingOptions4 = {
  interval: 200,
  step: 1,
};

const content1 = ref('');
let interval;
let stramEnd = false;

const streamContent = () => {
  clearInterval(interval);
  let currentIndex = 0;
  interval = setInterval(() => {
    currentIndex += Math.ceil(Math.random() * 10);
    content1.value = MOCK_CONTENT.slice(0, currentIndex);
    if (currentIndex > MOCK_CONTENT.length) {
      stramEnd = true;
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

const typingEnd = () => {
  if (stramEnd) {
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

<style lang="scss" scoped>
.btn-container {
  display: flex;
  margin-bottom: 12px;
}
.demo-title {
  margin: 20px 0px 8px 8px;
  display: inline-block;
}
</style>
```

:::

### think标签支持

支持自定义的 think 标签，用于包裹特定内容并渲染为自定义样式的块级元素。适合用于强调思考过程或特殊内容展示。

:::demo

```vue
<template>
  <div class="btn-container">
    <d-button variant="solid" @click="generateAnswer">{{ isLoading ? '停止' : '重新生成'}}</d-button>
  </div>
  <div id="think-demo-content">
    <template v-for="(msg, idx) in messages" :key="idx">
      <McBubble v-if="msg.from === 'user'" :content="msg.content" :align="'right'" :avatarConfig="msg.avatarConfig"></McBubble>
      <McBubble v-else :loading="msg.loading ?? false" :avatarConfig="msg.avatarConfig" :variant="'bordered'" :class="msg.isThinkShrink ? 'think-block-shrink' : 'think-block-expand'">

        <div class="think-toggle-btn" @click="toggleThink(msg)">
          <i class="icon-point"></i>
          <span>{{ thinkBtnText }}</span>
          <i :class="btnIcon"></i>
        </div>
        <McMarkdownCard :enableThink="true" :content="msg.content" :theme="theme"></McMarkdownCard>
      </McBubble>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let themeService;
const theme = ref('light');
const messages = ref([])
const aiModelAvatar = {
  imgSrc: 'https://matechat.gitcode.com/logo.svg',
  width: 32,
  height: 32,
};
const isLoading = ref(false);
let interval = null;
const thinkBtnText = ref('已深度思考 (用时16秒)');
const btnIcon = ref('icon-chevron-up-2');
const mockAnswer = `
<think>
嗯，用户让我帮他写一个快速排序。我得先回想一下快速排序的原理。快速排序是分治算法的一种，基本步骤是选一个基准元素，然后把数组分成两部分，一部分比基准小，另一部分比基准大，然后递归地对这两部分排序。

首先，我得确定基准的选择。通常有三种方法：选第一个元素、选中间元素或者随机选。选中间可能比较好，避免最坏情况的时间复杂度。比如数组已经有序的时候，选第一个会导致O(n²)的时间复杂度，但选中间元素可能更平衡。

然后，分区操作怎么做呢？分区的目标是把比基准小的放左边，大的放右边。可以用双指针的方法，左边找比基准大的，右边找比基准小的，然后交换，直到指针相遇。这时候再把基准放到正确的位置，返回基准的索引。

接下来是递归调用。对基准左边的子数组和右边的子数组分别进行快速排序，直到子数组的长度小于等于1，这时候数组就已经有序了。

现在要考虑用户的需求。用户可能对编程不太熟悉，所以代码需要简洁易懂，同时要有注释说明。或者用户可能需要一个高效的实现，不过快速排序的平均时间复杂度已经是O(n log n)了，应该没问题。

可能的边缘情况是数组为空或只有一个元素，这时候直接返回。所以函数里要先处理这种情况。

然后，测试一下这个函数是否正确。比如输入一个无序数组，比如[3,6,8,10,1,2,1]，看看排序后的结果是否是[1,1,2,3,6,8,10]。或者测试已经有序的数组，比如[1,2,3,4,5]，确保不会出现栈溢出或者错误的结果。

还有，是否需要处理重复元素？快速排序本身是能处理重复的，所以应该没问题。

再考虑语言的问题，用户没有说明用什么语言，但根据用户的名字或者上下文，可能想要Python的实现？或者可能其他语言。不过根据常见情况，可能先给出Python版本。

所以，综合这些思考，可以写出一个Python的快速排序函数。基准选中间元素，分区使用双指针，递归处理左右子数组。然后加上注释，解释每一步的作用。

最后，给出示例用法，让用户知道如何调用这个函数，并验证结果是否正确。
</think>
    
以下是使用 Python 实现的快速排序算法，包含详细注释：

\`\`\`python
def quick_sort(arr):
    """实现快速排序的递归函数"""
    # 基线条件：当数组长度小于等于1时，直接返回
    if len(arr) <= 1:
        return arr
    
    # 选择中间元素作为基准值（可有效避免最坏情况）
    pivot = arr[len(arr) // 2]
    
    # 将数组分成三部分：小于基准、等于基准、大于基准
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # 递归排序左右子数组，合并结果
    return quick_sort(left) + middle + quick_sort(right)

# 示例用法
if __name__ == "__main__":
    example_arr = [3,6,8,10,1,2,1]
    sorted_arr = quick_sort(example_arr)
    print("原数组：", example_arr)
    print("排序后：", sorted_arr)
\`\`\`
`
const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

const toggleThink = (msg) => {
  msg.isThinkShrink = !msg.isThinkShrink;
  btnIcon.value = !msg.isThinkShrink ? 'icon-chevron-up-2' :'icon-chevron-down-2'
}

const generateAnswer = () => {
  if (isLoading.value) {
    isLoading.value = false;
    clearInterval(interval);
  } else {
    isLoading.value = true;
    messages.value = [
      {
        from: 'ai-model',
        avatarConfig: { ...aiModelAvatar },
        content: '',
        loading: false
      }
    ];
    thinkBtnText.value = '思考中...';
    let currentIndex = 0;
    let totalTime = 0;
    interval = setInterval(() => {
      if (currentIndex < mockAnswer.length) {
        messages.value[messages.value.length - 1].content = mockAnswer.slice(0, currentIndex);
        currentIndex += 10;
        totalTime += 100;
        if (messages.value[messages.value.length - 1].content.indexOf('</think>') > -1 && thinkBtnText.value === '思考中...') {
          thinkBtnText.value = `已深度思考 (用时${totalTime / 1000}秒)`;
        }
      } else {
        isLoading.value = false;
        clearInterval(interval);
        messages.value[messages.value.length - 1].loading = false;
      }
    }, 100);
  }
}

onMounted(() => {
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }

  messages.value.push({
    from: 'ai-model',
    avatarConfig: { ...aiModelAvatar },
    content: mockAnswer
  })
});
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  justify-content: end;
  margin-bottom: 12px;
}
</style>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';
.think-toggle-btn {
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 10px;
  padding: 7px 10px;
  margin-bottom: 12px;
  width: fit-content;
  cursor: pointer;
  background-color: $devui-area;
  &:hover {
    background-color: var(--devui-btn-common-bg-hover);
  }
}

.think-block-expand .mc-think-block {
  display: block;
}

.think-block-shrink .mc-think-block {
  display: none;
}
</style>
```

:::

### 主题切换

组件提供了浅色与深色两种主题，默认使用浅色主题，可以通过 theme 属性来切换主题。

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
let themeService;
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
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
通过配置md-plugins katex插件，进行数学公式渲染（DEMO未实际渲染，实际使用时解开代码中注释即可按预期渲染）。
:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme" :mdPlugins="mdPlugins"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
//import { katex } from '@mdit/plugin-katex'; // 请首先安装@mdit/plugin-katex依赖
let themeService;
const theme = ref('light');
//const mdPlugins = ref([{
//  plugin: katex,
//  opt: {}
//}])
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
})
</script>
<style>
/* @import 'katex/dist/katex.min.css';  请首先安装 katex 依赖 */
</style>

```

:::


### Mermaid 渲染
1. 设置enableMermaid为true开启mermaid渲染。注意：开启此功能前请确保项目已正确安装mermaid库。

通过 npm 安装 mermaid:

```bash
$ npm install mermaid
```

2. 通过配置md-plugins Mermaid插件，进行Mermaid图渲染。

:::demo

```vue
<template>
  <McMarkdownCard :enableMermaid="true" :content="content" :theme="theme" :mdPlugins="mdPlugins"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let themeService;
const theme = ref('light');
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
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
let themeService;
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
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
let themeService;
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
})
</script>

```

:::

### 自定义代码块操作区

我们提供了 `actions` 插槽，支持你自定义代码块操作区。

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
let themeService;
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
```

:::

### 自定义代码块头部

我们提供了 `header` 插槽，支持你自定义代码块头部区域。

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
let themeService;
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
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

我们提供了 `content` 插槽，支持你自定义代码块内容区。

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme">
    <template #content="{ codeBlockData }">
      <div v-if="codeBlockData.language === 'echart'" ref="chart" style="width: 100%; height: 500px;">
        {{ handleCodeBlockData(codeBlockData) }}
      </div>
      <div v-else class="content-container" v-html="transfer(codeBlockData)"></div>
    </template>
  </McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
let themeService;
const theme = ref('light');
const chart = ref(null);
let myChart = null;
const echartsLoaded = ref(false);
const content = ref(`
**Echarts渲染**
\`\`\`echart
{
  backgroundColor: '#fefefe',
  color: ['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'],
  title: {
    text: '交通方式',
    top: '48%',
    textAlign: "center",
    left: "49%",
    textStyle: {
      fontSize: 22,
      fontWeight: '400'
    }
  },
  tooltip: {
    show: false
  },
  legend: {
    icon: "circle",
    orient: 'horizontal',
    x: 'right',
    data:['火车','飞机','客车','轮渡'],
    right: 300,
    bottom: 30,
    align: 'right',
    itemGap: 20
  },
  toolbox: {
    show: false 
  },
  series: [{
    name: '',
    type: 'pie',
    clockWise: false,
    radius: [105, 109],
    hoverAnimation: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'outside',
        },
        labelLine: {
          length:30,
          length2:100,
          show: true,
          color:'#00ffff'
        }
      }
    },
    data: [
      { value: 20, name: '火车', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#00ffff', shadowColor: '#00ffff' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } },
      { value: 10, name: '飞机', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#00cfff', shadowColor: '#00cfff' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } },
      { value: 30, name: '客车', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#006ced', shadowColor: '#006ced' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } },
      { value: 40, name: '轮渡', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#ffe000', shadowColor: '#ffe000' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } }
    ]
  }]
}
\`\`\`


**自定义代码行号**

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

// 处理代码块数据
const handleCodeBlockData = (codeBlockData) => {
  if (codeBlockData.language === 'echart') {
    try {
      // 解析字符串为 ECharts 配置对象
      const option = new Function('return ' + codeBlockData.code)();
      // 根据主题设置颜色
      option.title.textStyle.color = theme?.value === 'light' ? '#252b3a' : '#CED1DB';
      option.legend.textStyle = option.legend.textStyle || {};
      option.legend.textStyle.color = theme?.value === 'light' ? '#252b3a' : '#CED1DB';
      option.backgroundColor = theme?.value === 'light' ? '#fefefe' : '#34363A';

      if (option.series && option.series[0] && option.series[0].itemStyle && option.series[0].itemStyle.normal) {
        option.series[0].itemStyle.normal.label.color = theme?.value === 'light' ? '#252b3a' : '#CED1DB';
      }
      
      // 渲染图表 - 确保 ECharts 已加载
      if (echartsLoaded.value) {
        renderChart(option);
      }
    } catch (e) {
      console.error('解析 ECharts 配置失败:', e);
    }
  }
};

// 渲染图表
const renderChart = (option) => {
  if (!chart.value) return;
  
  if (!myChart) {
    // 确保 window.echarts 已定义
    if (typeof window.echarts !== 'undefined') {
      myChart = window.echarts.init(chart.value);
    } else {
      console.error('ECharts 库未加载');
      return;
    }
  }
  
  myChart.setOption(option);
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
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
  // 加载 ECharts
  if (typeof window.echarts === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/6.0.0/echarts.min.js';
    script.onload = () => {
      console.log('ECharts 加载完成');
      echartsLoaded.value = true; // 设置加载完成标志
    };
    document.head.appendChild(script);
  } else {
    echartsLoaded.value = true; // 如果已加载，直接设置标志
  }
  
  window.addEventListener('resize', () => {
    if (myChart) {
      myChart.resize();
    }
  });
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
  padding: 12px 12px 12px 22px;
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
