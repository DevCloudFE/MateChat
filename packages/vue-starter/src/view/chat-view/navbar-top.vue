<template>
  <div class="navbar-top-container">
    <div class="navbar-left">
      <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
    </div>
    <div class="navbar-right">
      <d-popover :position="['bottom-end']" class="navbar-top-history-menu">
        <i class="icon-history"></i>
        <template #content>
          <History class="navbar-top-history" />
        </template>
      </d-popover>
      <SwitchLang />
      <Theme />
      <d-tooltip position="bottom-end" :content="$t('navbar.systemSetting')">
        <i class="icon-setting system-setting"></i>
      </d-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@/view/theme";
import { SwitchLang } from "@/view/navbar";
import { History } from "@view/history";
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.navbar-top-container {
  display: none;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  box-sizing: border-box;

  .navbar-left,
  .navbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .navbar-right {
    .icon-history {
      display: none;
      cursor: pointer;
    }
  }

  :deep(.mc-header-logo-container) {
    cursor: pointer;

    .mc-header-title {
      font-size: $devui-font-size !important;
    }
  }

  :deep(.switch-lang-container) {
    margin-bottom: 0;
  }

  ::v-deep .system-setting {
    font-size: 16px;
    cursor: pointer;
  }
}

.navbar-top-history {
  border-right: none;
}

@media screen and (max-width: 940px) {
  .navbar-top-container {
    display: flex;
  }
}

@media screen and (max-width: 860px) {
  .icon-history {
    display: inline-block !important;
  }
}
</style>

<style lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.devui-popover__content.navbar-top-history-menu {
  padding: 0;
  background-color: $devui-connected-overlay-bg;
  box-shadow: $devui-shadow-length-connected-overlay $devui-shadow;
}
</style>
