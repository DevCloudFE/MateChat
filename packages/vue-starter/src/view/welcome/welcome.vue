<template>
  <div class="welcome-page">
    <McIntroduction
      logo-img="/logo2x.svg"
      title="MateChat"
      sub-title="Hi，欢迎使用 MateChat"
      :description="[
        'MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。',
        '作为AI模型，MateChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 MateChat 做的更好。',
      ]"
    ></McIntroduction>
    <WelcomePrompt />
    <div class="guess-question">
      <div class="guess-title">
        <div>猜你想问</div>
        <div>
          <i class="icon-recover"></i>
          <span>换一批</span>
        </div>
      </div>
      <div class="guess-content">
        <span
          v-for="(item, index) in guessQuestions"
          :key="index"
          @click="onItemClick(item)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatMessageStore } from "@/store";
import { mockAnswer, guessQuestions } from "@/mock-data/mock-chat-view";
import { WelcomePrompt } from "@view/prompt";

const chatMessageStore = useChatMessageStore();

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
    // 使用 mock 数据
    chatMessageStore.ask(item.label, mockAnswer[item.value]);
  }
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.welcome-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  padding: 0 12px;
  gap: 24px;

  .guess-question {
    width: 100%;
    padding: 16px 12px;
    border-radius: $devui-border-radius-card;
    background-color: $devui-gray-form-control-bg;

    .guess-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $devui-text;
      margin-bottom: 12px;

      & > div:first-child {
        font-weight: 700;
        font-size: $devui-font-size;
      }
      & > div:last-child {
        font-size: $devui-font-size-sm;
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
        font-size: $devui-font-size-sm;
        color: $devui-text;
        padding: 4px 12px;
        border-radius: $devui-border-radius-full;
        background-color: $devui-gray-form-control-hover-bg;
        cursor: pointer;
      }
    }
  }
}
</style>
