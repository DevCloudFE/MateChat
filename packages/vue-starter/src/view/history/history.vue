<template>
  <div ref="historyContainer" class="history-container">
    <div class="history-header">
      <div class="history-header-left">
        <span class="history-title">{{ $t("history.chatHistory") }}</span>
      </div>
      <div class="history-header-right">
        <div class="history-nav-icon" @click="handleToggleHistory">
          <i class="icon-nav-collapse" />
        </div>
      </div>
    </div>
    <d-search
      v-model="searchKey"
      is-keyup-search
      :placeholder="$t('history.searchChat')"
      @search="onSearch"
    />
    <div class="history-list-box">
      <HistoryItem
        v-for="(item, index) in renderList"
        :key="index"
        :itemData="item"
        :class="{ active: item.chatId === chatHistoryStore.activeHistoryId }"
        @click="() => onHistoryClick(item)"
        @delete="() => onHistoryDelete(item)"
      />
    </div>
  </div>
  <div v-if="!isExpand" class="history-nav-icon history-expand" @click="handleToggleHistory">
    <i class="icon-nav-expand" />
  </div>
</template>

<script setup lang="ts">
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
} from '@/store';
import type { IHistoryItem } from '@/types';
import { useI18n } from 'vue-i18n';
import HistoryItem from './history-item.vue';

const { t } = useI18n();
const chatHistoryStore = useChatHistoryStore();
const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();

const { proxy } = getCurrentInstance();
const historyContainer = ref<HTMLElement>();
const searchKey = ref('');
const renderList = ref<IHistoryItem[]>([]);
const isExpand = ref(true);

const onSearch = (e: string) => {
  if (e) {
    renderList.value = chatHistoryStore.historyList.filter((item) =>
      item.messages[0].content.includes(e),
    );
  } else {
    renderList.value = chatHistoryStore.historyList;
  }
};
const onHistoryClick = (e: IHistoryItem) => {
  chatHistoryStore.setActiveHistoryId(e.chatId);
  chatStatusStore.currentChatId = e.chatId;
  chatMessageStore.messages = e.messages;
};
const onHistoryDelete = (e: IHistoryItem) => {
  chatHistoryStore.deleteHistory(e.chatId);
  proxy.$notificationService.open({
    type: 'success',
    title: t('history.deleteHistoryTipTitle'),
    content: t('deleteSuccess'),
  });
  if (chatStatusStore.currentChatId === e.chatId) {
    chatStatusStore.startChat = false;
    chatMessageStore.messages = [];
  }
};

const handleToggleHistory = () => {
  const container = historyContainer.value;
  if (container) {
    container.classList.toggle('stow');
    if (isExpand.value) {
      setTimeout(() => {
        isExpand.value = false;
      }, 300);
    } else {
      isExpand.value = true;
    }
  }
};

watch(
  chatHistoryStore.historyList,
  () => {
    searchKey.value = '';
    onSearch('');
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 240px;
  max-width: 420px;
  width: 25%;
  height: 100%;
  padding: 12px;
  color: $devui-text;
  border-right: 1px solid $devui-line;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &.stow {
    width: 0;
    min-width: 0;
    padding: 12px 0;
    border: none;
  }

  .history-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .history-header-left,
    .history-header-right {
      display: flex;
      align-items: center;
    }
  }

  .history-title {
    font-size: $devui-font-size-lg;
    font-weight: bold;
    margin-bottom: 8px;
    white-space: nowrap;
  }

  .history-list-box {
    flex: 1;
    margin-top: 8px;
    overflow: auto;
  }
}

.history-nav-icon {
  height: fit-content;
  padding: 0 4px;
  cursor: pointer;

  &:hover {
    background-color: $devui-shape-icon-fill-hover;
  }

  &.history-expand {
    position: absolute;
    top: 16px;
    left: 16px;
  }
}
</style>
