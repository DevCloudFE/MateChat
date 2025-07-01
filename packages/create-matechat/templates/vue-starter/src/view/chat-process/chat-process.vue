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
        >
          <McMarkdownCard :content="msg.content" :theme="themeStore.theme" />
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

const chatMessageStore = useChatMessageStore();
const themeStore = useThemeStore();

const conversationRef = ref();

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
@use "devui-theme/styles-var/devui-var.scss" as *;

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
</style>
