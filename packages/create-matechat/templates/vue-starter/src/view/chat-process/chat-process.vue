<template>
  <div
    ref="conversationRef"
    class="conversation-area mc-scroll-overlay"
    @wheel="handleWheel"
    @mousedown="mousedownHandler"
    @scroll="scrollHandler"
    @mouseup="mouseupHandler"
  >
    <div class='chat-list'>
      <template v-for="(msg, idx) in chatMessageStore.messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="msg.avatarConfig"
        >
        <template #bottom>
          <div class="bubble-bottom-operations">
            <i class="icon-recover" @click="() => onReAnswer(msg)"></i>
          </div>
        </template>
      </McBubble>
        <McBubble
          v-else
          :loading="msg.loading ?? false"
          :avatarConfig="msg.avatarConfig"
          :data-v-idx="idx"
          :class="msg.isThinkShrink ? 'think-block-shrink' : 'think-block-expand'"
        >
          <div class="think-toggle-btn" @click="toggleThink(msg)" v-if="msg.reasoning_content">
            <i class="icon-point"></i>
            <span>{{ msg.content ? (t('chat.thinkingComplete') + t('chat.thinkingTime', { time: getThinkingTime(msg) })) : t('chat.thinking') }}</span>
            <i :class="btnIcon"></i>
          </div>
          <McMarkdownCard :content="renderMessage(msg)" :theme="themeStore.theme" :enableThink="msg.reasoning_content" />
          <template #bottom>
            <div class="bubble-bottom-operations" v-if="msg.complete">
              <i class="icon-copy-new"></i>
              <i class="icon-like"></i>
              <i class="icon-dislike"></i>
            </div>
          </template>
        </McBubble>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatMessageStore, useThemeStore } from '@/store';
import type { IMessage } from '@/types';
import { nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const chatMessageStore = useChatMessageStore();
const themeStore = useThemeStore();
const { t } = useI18n();

const conversationRef = ref();
const scrollbarWidth = 8; // 垂直滚动条宽度
const isLoading = ref(false);
const btnIcon = ref('icon-chevron-up-2');
const headspace = 20; // 判断滚动条是否在最下方预留像素值
const mouseDown = ref(false);
const clickOnScrollbar = ref(false); // 是否点击了滚动条
const wheelHadUp = ref(false); // 是否有向上滑动鼠标滚轮

const toggleThink = (msg: IMessage) => {
  if (isLoading.value) {
    return;
  }
  msg.isThinkShrink = !msg.isThinkShrink;
  btnIcon.value = !msg.isThinkShrink
    ? 'icon-chevron-up-2'
    : 'icon-chevron-down-2';
};

const getThinkingTime = (msg: IMessage) => {
  if (msg.startTime && msg.endTime) {
    return Math.round((msg.endTime - msg.startTime) / 1000);
  }
  return 0;
};

const renderMessage = (msg: IMessage) => {
  if (msg.from === 'user' || !msg.reasoning_content) {
    return msg.content;
  }
  return `<think>${msg.reasoning_content}</think>${msg.content}`;
};

// 通过鼠标滚轮判断是否需要自动滚动到最底部
const handleWheel = (e: WheelEvent) => {
  if (e.deltaY < 0 && !e.shiftKey && !e.ctrlKey) {
    wheelHadUp.value = true;
    return;
  }
  const scrollTop = conversationRef.value.scrollTop;
  const clientHeight = conversationRef.value.clientHeight;
  const scrollHeight = conversationRef.value.scrollHeight;

  const isAtBottom =
    scrollTop + clientHeight + e.deltaY >= scrollHeight - headspace;
  // 鼠标滚轮将滚动条滚到最底部
  if (isAtBottom) {
    wheelHadUp.value = false;
    clickOnScrollbar.value = false;
  }
};

// 鼠标按下事件 判断是否按在滚动条上
const mousedownHandler = (e: MouseEvent) => {
  mouseDown.value = true;
  const rect = conversationRef.value.getBoundingClientRect();
  const isVerticalScroll =
    e.clientX >= rect.right - scrollbarWidth && e.clientX <= rect.right;
  const elementHeight = conversationRef.value.offsetHeight;
  const mouseY = e.offsetY;
  const distanceToBottom = elementHeight - mouseY;

  if (
    isVerticalScroll &&
    !(distanceToBottom <= headspace && distanceToBottom >= 0)
  ) {
    // 鼠标点击在垂直滚动条上 并且未点击在底部预留范围 则停止跟随AI输出自动滚动到底部
    clickOnScrollbar.value = true;
    return;
  }
};

const mouseupHandler = () => {
  mouseDown.value = false;
};

const scrollHandler = () => {
  const container = conversationRef.value;
  const distanceToBottom =
    container.scrollHeight - container.clientHeight - container.scrollTop;

  // 拖动到到底部 则继续跟随滚动
  if (mouseDown.value && distanceToBottom < headspace) {
    clickOnScrollbar.value = false;
    wheelHadUp.value = false;
  }
};

const onReAnswer = (msg: IMessage) => {
  chatMessageStore.ask(msg.content as string);
}

watch(
  () => chatMessageStore.messageChangeCount,
  () => {
    if (chatMessageStore.messages.at(-1)?.loading) {
      // 用户发出新消息时 该watch只会监听到AI第一次返回的loading状态，此时应该自动返回到消息最底部
      wheelHadUp.value = false;
      clickOnScrollbar.value = false;
    }
    nextTick(() => {
      if (wheelHadUp.value || clickOnScrollbar.value) {
        return;
      }
      conversationRef.value?.scrollTo({
        top: conversationRef.value.scrollHeight,
        behavior: 'smooth',
      });
    });
  },
);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.conversation-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  padding-top: 20px;

  .chat-list {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 12px;

    & > * {
      margin-top: 8px;
    }
  }

  .bubble-bottom-operations {
    margin-top: 8px;
    i {
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: $devui-gray-10;
      }
    }
  }
}

body[ui-theme='galaxy-theme'] {
  .conversation-area {
    :deep() {
      .mc-bubble-content.filled {
        background-color: $devui-base-bg;
      }
    }
  }
}

.think-toggle-btn {
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 10px;
  padding: 7px 10px 7px 0;
  margin-bottom: 4px;
  width: fit-content;
  cursor: pointer;
  color: $devui-aide-text;
  &:hover {
    color: $devui-text;
  }
}

:deep(.think-block-expand .mc-think-block) {
  display: block;
}

:deep(.think-block-shrink .mc-think-block) {
  display: none;
}

</style>
