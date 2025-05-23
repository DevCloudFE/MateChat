<template>
  <d-popover :content="$t('underDevelop')" trigger="hover" :position="['top']" style="color: var(--devui-text)">
    <div class="knowledge-wrapper">
      <i class="icon-operation-log"></i>
      <span>{{ $t("knowledge.addKnowledge") }}</span>
    </div>
  </d-popover>
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
