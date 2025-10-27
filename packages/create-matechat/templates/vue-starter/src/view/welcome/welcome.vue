<template>
  <div class="welcome-page">
    <div class="content-wrapper">
    <McIntroduction
      :logo-img="GlobalConfig.logoPath || Logo2X"
      :title="GlobalConfig.title"
      :sub-title="GlobalConfig.subTitle"
      :description="[$t('welcome.description1'), $t('welcome.description2')]"
      class="welcome-introduction"
    ></McIntroduction>
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
  </div>
</template>

<script setup lang="ts">
import GlobalConfig from '@/global-config';
import {
  guessQuestionsCn,
  guessQuestionsEn,
  mockAnswer,
} from '@/mock-data/mock-chat-view';
import { useChatMessageStore, useLangStore } from '@/store';
import { LangType } from '@/types';
import Logo2X from '../../../public/logo2x.svg';

const langStore = useLangStore();
const chatMessageStore = useChatMessageStore();

const list = computed(() =>
  langStore.currentLang === LangType.CN ? guessQuestionsCn : guessQuestionsEn,
);

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
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
  justify-content: flex-start;
  .content-wrapper {
    margin: auto 0;
    width: 100%;
    gap: 24px;
    display: flex;
    flex-direction: column;
    min-height: 0;
    }
  overflow: auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 12px;
  gap: 24px;

  .welcome-introduction {
    :deep() {
      .mc-introduction-description {
        font-size: var(--devui-font-size, 14px);
      }
    }
  }

  .guess-question {
    width: 100%;
    padding: 24px;
    border-radius: 24px;
    background-color: $devui-base-bg;

    .guess-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $devui-text;
      margin-bottom: 16px;

      & > div:first-child {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
      }
      & > div:last-child {
        font-size: $devui-font-size;
        color: $devui-aide-text;
        cursor: pointer;

        span {
          margin-left: 4px;
          line-height: 24px;
        }
      }
    }

    .guess-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      span {
        font-size: $devui-font-size;
        color: $devui-aide-text;
        padding: 10px 16px;
        border-radius: $devui-border-radius-full;
        background-color: $devui-dividing-line;
        cursor: pointer;
      }
    }
  }
}
</style>
