<template>
  <d-tooltip position="top" :content="$t('underDevelop')">
    <div class="knowledge-wrapper">
      <i class="icon-operation-log"></i>
      <span>{{ $t("knowledge.addKnowledge") }}</span>
    </div>
  </d-tooltip>
</template>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.knowledge-wrapper {
  font-size: $devui-font-size;
  color: $devui-text;
  cursor: pointer;

  span {
    margin-left: 4px;
  }
}
</style>
