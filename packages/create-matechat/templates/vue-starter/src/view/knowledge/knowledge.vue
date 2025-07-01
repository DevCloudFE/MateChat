<template>
  <d-popover
    :content="$t('underDevelop')"
    trigger="hover"
    :position="['top']"
    style="color: var(--devui-text)"
  >
    <div class="knowledge-wrapper">
      <AddKnowledgeIcon />
      <span>{{ $t("knowledge.addKnowledge") }}</span>
    </div>
  </d-popover>
</template>

<script setup lang="ts">
import { AddKnowledgeIcon } from "@/components";
</script>

<style scoped lang="scss">
@use "devui-theme/styles-var/devui-var.scss" as *;

.knowledge-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: $devui-font-size;
  color: $devui-text;
  cursor: pointer;
  flex: none;
}
</style>
