<template>
  <div ref="conversationRef" class="conversation-area mc-scroll-overlay">
    <div class='chat-list'>
      <template v-for="(msg, idx) in chatMessageStore.messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="msg.avatarConfig"
        ></McBubble>
        <McBubble
          v-else
          :loading="msg.loading ?? false"
          :avatarConfig="msg.avatarConfig"
          :data-v-idx="idx"
        >
          <div class="think-toggle-btn" @click="toggleThink(idx)" v-if="msg.reasoning_content">
            <i class="icon-point"></i>
            <span>{{ msg.content ? t('chat.thinkingComplete') : t('chat.thinking') }}</span>
            <i :class="btnIcon"></i>
          </div>
          <McMarkdownCard :content="renderMessage(msg)" :theme="themeStore.theme" :enableThink="true" />
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
import { nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const chatMessageStore = useChatMessageStore();
const themeStore = useThemeStore();
const { t } = useI18n();

const conversationRef = ref();
const isLoading = ref(false);
const btnIcon = ref('icon-chevron-up-2');
const toggleThink = (idx) => {
  if (isLoading.value) {
    return
  }
  const targetNode = document.querySelectorAll(`[data-v-idx="${idx}"] .mc-bubble-content-container`)[0];
  if (targetNode) {
    const thinkBlock = targetNode.querySelector(`.mc-think-block`);
    if (thinkBlock) {
      const currentDisplay = getComputedStyle(thinkBlock).display;
      thinkBlock.style.display = currentDisplay === 'none' ? 'block' : 'none';
      btnIcon.value = currentDisplay === 'none' ? 'icon-chevron-up-2' :'icon-chevron-down-2'
    }
  }
}

const renderMessage = (msg) => {
  if (msg.from === 'user' || !msg.reasoning_content) {
    return msg.content;
  }
  return `<think>${msg.reasoning_content}</think>${msg.content}`;
}

watch(
  () => chatMessageStore.messageChangeCount,
  () => {
    nextTick(() => {
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
</style>
