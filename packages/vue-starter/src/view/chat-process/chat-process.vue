<template>
  <div ref="conversationRef" class="conversation-area">
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
          <div class="bubble-bottom-operations">
            <i class="icon-copy-new"></i>
            <i class="icon-like"></i>
            <i class="icon-dislike"></i>
          </div>
        </template>
      </McBubble>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useChatMessageStore, useThemeStore } from "@/store";

const chatMessageStore = useChatMessageStore();
const themeStore = useThemeStore();

const conversationRef = ref();

watch(
  () => chatMessageStore.messageChangeCount,
  () => {
    nextTick(() => {
      conversationRef.value?.scrollTo({
        top: conversationRef.value.scrollHeight,
        behavior: "smooth",
      });
    });
  }
);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.conversation-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 12px;
  gap: 8px;

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
</style>
