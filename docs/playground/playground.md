---
isPlayground: true
---

:::demo

```vue
<template>
  <div class="demo-test">
    <McHeader :logoImg="'/logo.svg'" :title="'MateChat'">
      <template #operationArea>
        <div class="operations">
          <i class="icon-helping"></i>
        </div>
      </template>
    </McHeader>
    <div v-if="startChat" ref="conversationRef" class="conversation-area">
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble v-if="msg.from === 'user'" :content="msg.content" :align="'right'" :avatarConfig="msg.avatarConfig"></McBubble>
        <McBubble v-else :loading="msg.loading ?? false" :avatarConfig="msg.avatarConfig">
          <McMarkdownCard :content="msg.content" :theme="theme"></McMarkdownCard>
          <template #bottom>
            <div class="bubble-bottom-operations">
              <i class="icon-copy-new"></i>
              <i class="icon-like"></i>
              <i class="icon-dislike"></i>
            </div>
          </template>
        </McBubble>
      </template>
    </div>
    <div v-else class="welcome-page">
      <McIntroduction
        logo-img="/logo2x.svg"
        title="MateChat"
        sub-title="Hi，欢迎使用 MateChat"
        :description="[
          'MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。',
          '作为AI模型，MateChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 MateChat 做的更好。',
        ]"
      ></McIntroduction>
      <McPrompt :list="introPrompt.list" :direction="'horizontal'" class="intro-prompt" @itemClick="onItemClick($event)"></McPrompt>
      <div class="guess-question">
        <div class="guess-title">
          <div>猜你想问</div>
          <div>
            <i class="icon-recover"></i>
            <span>换一批</span>
          </div>
        </div>
        <div class="guess-content">
          <span v-for="(item, index) in guessQuestions" :key="index" @click="onItemClick(item)">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="new-convo-button">
      <McPrompt
        v-if="startChat"
        class="simple-prompt"
        style="flex: 1"
        :list="simplePrompt"
        :direction="'horizontal'"
        @itemClick="onItemClick($event)"
      ></McPrompt>
      <div v-else class="agent-knowledge">
        <d-dropdown :position="['top']" @toggle="(val) => (isAgentOpen = val)">
          <div class="agent-wrapper">
            <img src="/logo.svg" />
            <span>{{ selectedAgent.label }}</span>
            <i class="icon-infrastructure"></i>
            <i :class="['icon-chevron-down-2', { 'is-open': isAgentOpen }]"></i>
          </div>
          <template #menu>
            <McList :data="agentList" @select="(val) => (selectedAgent = val)"></McList>
          </template>
        </d-dropdown>
        <span class="agent-knowledge-dividing-line"></span>
        <div class="knowledge-wrapper">
          <i class="icon-operation-log"></i>
          <span>添加知识</span>
        </div>
      </div>
      <d-button icon="add" shape="circle" title="新建对话" size="sm" @click="onNewConvo" />
    </div>
    <div style="padding: 0 12px 12px 12px">
      <McInput :value="inputValue" :maxLength="2000" @change="(e) => (inputValue = e)" @submit="onSubmit">
        <template #extra>
          <div class="input-foot-wrapper">
            <div class="input-foot-left">
              <span v-for="(item, index) in inputFootIcons" :key="index" @click="() => onInputIconClick(item)">
                <i :class="item.icon"></i>
                {{ item.text }}
              </span>
              <span class="input-foot-dividing-line"></span>
              <span class="input-foot-maxlength">{{ inputValue.length }}/2000</span>
            </div>
            <div class="input-foot-right">
              <d-button icon="op-clearup" shape="round" :disabled="!inputValue" @click="inputValue = ''">清空输入</d-button>
            </div>
          </div>
        </template>
      </McInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, nextTick, onMounted } from 'vue';
import { introPrompt, simplePrompt, mockAnswer, guessQuestions } from './mock.constants';

const inputValue = ref('');
const startChat = ref(false);
const conversationRef = ref();
const isAgentOpen = ref(false);
const theme = ref('light');
let themeService;
const agentList = ref([
  { label: 'MateChat', value: 'matechat', active: true },
  { label: 'InsCode', value: 'inscode' },
]);
const selectedAgent = ref(agentList.value[0]);
const aiModelAvatar = {
  imgSrc: 'https://matechat.gitcode.com/logo.svg',
  width: 32,
  height: 32,
};
const customerAvatar = {
  imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
  width: 32,
  height: 32,
};
const inputFootIcons = [
  { icon: 'icon-at', text: '智能体' },
  { icon: 'icon-standard', text: '词库' },
  { icon: 'icon-add', text: '附件' },
];

const messages = ref([]);

const onInputIconClick = (e) => {
  if (e.icon === 'icon-at') {
    inputValue.value += `@${selectedAgent.value.label}`;
  }
};

const onSubmit = (e, answer = undefined) => {
  if(e === '') {
    return;
  }
  inputValue.value = '';
  if (!messages.value.length) {
    startChat.value = true;
  }
  messages.value.push({
    from: 'user',
    content: e,
    avatarPosition: 'side-right',
    avatarConfig: { ...customerAvatar },
  });
  nextTick(() => {
    conversationRef.value?.scrollTo({
      top: conversationRef.value.scrollHeight,
      behavior: 'smooth',
    });
  });
  getAIAnswer(answer ?? e);
};

const getAIAnswer = (content) => {
  messages.value.push({
    from: 'assistant',
    content: '',
    avatarPosition: 'side-left',
    avatarConfig: { ...aiModelAvatar },
    loading: true,
  });
  
  /* 模拟流式数据返回 */
  setTimeout(async () => {
    messages.value.at(-1).loading = false;
    for (let i = 0; i < content.length;) {
      await new Promise(r => setTimeout(r, 300 * Math.random()));
      messages.value[messages.value.length - 1].content = content.slice(0, i += Math.random() * 10);
      nextTick(() => {
        conversationRef.value?.scrollTo({
          top: conversationRef.value.scrollHeight
        });
      });
    }
  }, 1000);
};

const onNewConvo = () => {
  startChat.value = false;
  messages.value = [];
};

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
    // 使用 mock 数据
    onSubmit(item.label, mockAnswer[item.value]);
  }
};

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
});
</script>

<style scoped lang="scss">
.demo-test {
  width: 100%;
  min-width: 500px;
  height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .conversation-area,
  .welcome-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0 12px;
  }

  .conversation-area {
    gap: 8px;
  }

  .welcome-page {
    gap: 24px;
    justify-content: center;
  }

  .guess-question {
    width: 100%;
    padding: 16px 12px;
    border-radius: var(--devui-border-radius-card);
    background-color: var(--devui-gray-form-control-bg);

    .guess-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--devui-text);
      margin-bottom: 12px;

      & > div:first-child {
        font-weight: 700;
        font-size: var(--devui-font-size);
      }
      & > div:last-child {
        font-size: var(--devui-font-size-sm);
        cursor: pointer;
        span {
          margin-left: 4px;
        }
      }
    }

    .guess-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      span {
        font-size: var(--devui-font-size-sm);
        color: var(--devui-text);
        padding: 4px 12px;
        border-radius: var(--devui-border-radius-full);
        background-color: var(--devui-gray-form-control-hover-bg);
        cursor: pointer;
      }
    }
  }

  .bubble-bottom-operations {
    margin-top: 8px;
    i {
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: var(--devui-icon-hover-bg);
      }
    }
  }

  .new-convo-button {
    padding: 0 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 39px;
    gap: 4px;
  }

  :deep(.simple-prompt .mc-list) {
    justify-content: unset;
  }

  :deep(.intro-prompt .mc-list) {
    justify-content: center;
  }

  .operations {
    i {
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: var(--devui-global-bg);
      }
    }
  }

  .agent-knowledge {
    flex: 1;
    display: flex;
    align-items: center;

    .agent-wrapper {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: var(--devui-border-radius-full);
      background-color: var(--devui-area);
      cursor: pointer;

      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }

      span {
        font-size: var(--devui-font-size);
        color: var(--devui-text);
        margin-right: 8px;
      }

      i {
        font-size: var(--devui-font-size);
        color: var(--devui-text);
        transition: transform 0.3s ease-in-out;

        &:last-child {
          margin-left: 4px;
        }
      }

      .is-open {
        transform: rotate(180deg);
      }
    }

    .agent-knowledge-dividing-line {
      width: 1px;
      height: 14px;
      margin: 0 12px;
      background-color: var(--devui-line);
    }

    .knowledge-wrapper {
      font-size: var(--devui-font-size);
      color: var(--devui-text);
      cursor: pointer;

      span {
        margin-left: 4px;
      }
    }
  }

  .input-foot-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-right: 8px;

    .input-foot-left {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        font-size: var(--devui-font-size-sm);
        color: var(--devui-text);
        cursor: pointer;
      }

      .input-foot-dividing-line {
        width: 1px;
        height: 14px;
        background-color: var(--devui-line);
      }

      .input-foot-maxlength {
        font-size: var(--devui-font-size-sm);
        color: var(--devui-aide-text);
      }
    }

    .input-foot-right {
      & > *:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
}
</style>
```

:::
