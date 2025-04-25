<template>
  <div class="welcome-page">
    <McIntroduction
      logo-img="/logo2x.svg"
      title="MateChat"
      :sub-title="`Hi，${$t('welcome.welcomeTo')} MateChat`"
      :description="[$t('welcome.description1'), $t('welcome.description2')]"
    ></McIntroduction>
    <WelcomePrompt />
    <div class="guess-question">
      <div class="guess-title">
        <div>{{ $t("welcome.guessYouWantAsk") }}</div>
        <div>
          <i class="icon-recover"></i>
          <span>{{ $t("welcome.change") }}</span>
        </div>
      </div>
      <div class="guess-content">
        <span
          v-for="(item, index) in list"
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
import { useChatMessageStore, useLangStore } from "@/store";
import {
  mockAnswer,
  guessQuestionsCn,
  guessQuestionsEn,
} from "@/mock-data/mock-chat-view";
import { WelcomePrompt } from "@view/prompt";
import { LangType } from "@/types";

const langStore = useLangStore();
const chatMessageStore = useChatMessageStore();

const list = computed(() =>
  langStore.currentLang === LangType.CN ? guessQuestionsCn : guessQuestionsEn
);

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
