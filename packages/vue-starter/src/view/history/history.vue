<template>
  <div class="history-container">
    <div class="history-title">对话历史</div>
    <d-search
      v-model="searchKey"
      is-keyup-search
      placeholder="搜索聊天"
      @search="onSearch"
    />
    <div class="history-list-box">
      <HistoryItem
        v-for="(item, index) in renderList"
        :key="index"
        :itemData="item"
        @click="() => onHistoryClick(item)"
        @delete="() => onHistoryDelete(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
} from "@/store";
import type { IHistoryItem } from "@/types";
import HistoryItem from "./history-item.vue";

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
};
const onHistoryDelete = (e: IHistoryItem) => {
  chatHistoryStore.deleteHistory(e.chatId);
  proxy.$notificationService.open({
    type: "success",
    title: "删除历史提示",
    content: "删除成功",
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
