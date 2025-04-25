<template>
  <div class="history-container">
    <div class="history-title">{{ $t("history.chatHistory") }}</div>
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
        :class="{ active: item.chatId === activeHistoryId }"
        @click="() => onHistoryClick(item)"
        @delete="() => onHistoryDelete(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
} from "@/store";
import type { IHistoryItem } from "@/types";
import HistoryItem from "./history-item.vue";

const { t } = useI18n();
const chatHistoryStore = useChatHistoryStore();
const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();

const { proxy } = getCurrentInstance();
const searchKey = ref("");
const activeHistoryId = ref("");
const renderList = ref<IHistoryItem[]>([]);

const onSearch = (e: string) => {
  if (e) {
    renderList.value = chatHistoryStore.historyList.filter((item) =>
      item.messages[0].content.includes(e)
    );
  } else {
    renderList.value = chatHistoryStore.historyList;
  }
};
const onHistoryClick = (e: IHistoryItem) => {
  activeHistoryId.value = e.chatId;
  chatStatusStore.currentChatId = e.chatId;
  chatMessageStore.messages = e.messages;
};
const onHistoryDelete = (e: IHistoryItem) => {
  chatHistoryStore.deleteHistory(e.chatId);
  proxy.$notificationService.open({
    type: "success",
    title: t("history.deleteHistoryTipTitle"),
    content: t("deleteSuccess"),
  });
  if (chatStatusStore.currentChatId === e.chatId) {
    chatStatusStore.startChat = false;
    chatMessageStore.messages = [];
  }
};

watch(chatHistoryStore.historyList, () => {
  searchKey.value = "";
  onSearch("");
});
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  padding: 12px;
  color: $devui-text;
  border-right: 1px solid $devui-line;

  .history-title {
    font-size: $devui-font-size-lg;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .history-list-box {
    flex: 1;
    margin-top: 8px;
    overflow: auto;
  }
}
</style>
