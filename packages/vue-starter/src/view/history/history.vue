<template>
  <div class="history-container">
    <div class="history-title">对话历史</div>
    <d-search
      v-model="searchKey"
      is-keyup-search
      placeholder="搜索聊天"
      @search="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchKey = ref("");
const onSearch = (e) => {
  console.log("search", e);
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-container {
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
}
</style>
