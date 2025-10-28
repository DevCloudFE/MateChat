<template>
  <d-popover
    :content="$t('underDevelop')"
    trigger="hover"
    :position="['top']"
    style="color: var(--devui-text)"
  >
    <div class="chat-setting">
      <i class="icon-infrastructure"></i>
    </div>
  </d-popover>
</template>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.chat-setting {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin-left: 8px;
  border-radius: $devui-border-radius-full;
  background-color: $devui-base-bg;
  box-shadow: 0px 1px 8px 0px rgba(25, 25, 25, 0.06);
  cursor: pointer;
}
</style>
