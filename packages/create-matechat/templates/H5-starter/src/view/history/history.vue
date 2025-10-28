<template>
  <div
    :class="['history-list-container', !commonStore.isExpand && 'not-expand']"
  >
    <div class="history-header">
      <div class="history-header-left">
        <span class="history-title">{{ $t("history.chatHistory") }}</span>
      </div>
    </div>
    <d-search
      v-model="searchKey"
      is-keyup-search
      icon-position="left"
      :placeholder="$t('history.searchChat')"
      :show-glow-style="false"
      class="history-search"
      @search="onSearch"
    />
    <div :class="['history-list-box', !renderList.length && 'empty']">
      <template v-for="(item, index) in renderList" :key="index">
        <Collapse v-model="item.expand" :title="t(item.title)">
          <HistoryItem
            v-for="(val, i) in item.list"
            :key="i"
            :itemData="val"
            :class="{
              active: val.chatId === chatHistoryStore.activeHistoryId,
            }"
            @click="() => onHistoryClick(val)"
            @delete="() => onHistoryDelete(val)"
          />
        </Collapse>
      </template>
      <div v-if="!renderList.length" class="history-list-empty">
        <img :src="themeStore.theme === 'dark' ? NoDataDarkPng : NoDataPng" />
        <span>{{ $t("noData") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Collapse } from "@/components";
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
  useThemeStore,
  useCommonStore,
} from "@/store";
import type { CategorizedHistoryItem, IHistoryItem } from "@/types";
import { getHistoryTitle } from "@/utils";
import { useI18n } from "vue-i18n";
import HistoryItem from "./history-item.vue";
import NoDataPng from "../../../public/no-data.png";
import NoDataDarkPng from "../../../public/no-data-dark.png";

const { t } = useI18n();
const chatHistoryStore = useChatHistoryStore();
const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();
const themeStore = useThemeStore();
const commonStore = useCommonStore();

const { proxy } = getCurrentInstance();
const searchKey = ref("");
const renderList = ref<CategorizedHistoryItem[]>([]);
let categorizedHistoryList: CategorizedHistoryItem[] = [];

const onSearch = (e: string) => {
  if (e) {
    const res = [];
    for (let i = 0; i < categorizedHistoryList.length; i++) {
      const item = { ...categorizedHistoryList[i] };
      item.list = item.list?.filter((listItem) =>
        listItem.messages[0].content.includes(e)
      ) || [];
      item.list.length && res.push(item);
    }
    renderList.value = res;
  } else {
    renderList.value = categorizedHistoryList;
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
    type: "success",
    title: t("history.deleteHistoryTipTitle"),
    content: t("deleteSuccess"),
  });
  if (chatStatusStore.currentChatId === e.chatId) {
    chatStatusStore.startChat = false;
    chatMessageStore.messages = [];
  }
};
const updateCategorizedHistoryList = () => {
  const map: Record<
    CategorizedHistoryItem["updateDate"],
    CategorizedHistoryItem
  > = {};
  for (let i = 0; i < chatHistoryStore.historyList.length; i++) {
    const item = chatHistoryStore.historyList[i];
    if (map[item.updateDate]) {
      map[item.updateDate].list.push(item);
    } else {
      map[item.updateDate] = {
        title: getHistoryTitle(item.updateDate),
        updateDate: item.updateDate,
        updateTime: item.updateTime,
        expand: true,
        list: [item],
      };
    }
  }
  categorizedHistoryList = Object.values(map);
};

watch(
  chatHistoryStore.historyList,
  () => {
    searchKey.value = "";
    updateCategorizedHistoryList();
    onSearch("");
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 240px;
  max-width: 380px;
  width: 25%;
  height: 100%;
  padding: 12px;
  color: $devui-text;
  transition: all 0.3s ease-in-out;

  &.not-expand {
    width: 0;
    min-width: 0;
    padding: 0;
    opacity: 0;
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

  .history-search :deep() {
    .devui-input {
      border: none;
      border-radius: 100px;
    }
  }

  .history-list-box {
    flex: 1;
    margin-top: 8px;
    overflow: auto;

    &.empty {
      display: flex;
      justify-content: center;
      align-items: center;

      .history-list-empty {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        span {
          margin-top: 20px;
        }
      }
    }
  }
}

body[ui-theme-type="light"] {
  .history-list-container {
    backdrop-filter: blur(50px);
    background-color: rgba(249, 249, 249, 0.8);
  }
}

body[ui-theme-type="dark"] {
  .history-list-container {
    background-color: $devui-global-bg;
  }
}
</style>

<style lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.devui-notification-item-container {
  color: $devui-text;

  .devui-notification__icon-close i.icon {
    color: $devui-text !important;
  }
}
</style>
