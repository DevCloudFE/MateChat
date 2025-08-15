<template>
  <div class="navbar-top-container">
    <div class="navbar-left">
      <McHeader
        :logoImg="GlobalConfig.logoPath || Logo"
        :title="GlobalConfig.title || 'MateChat'"
      ></McHeader>
    </div>
    <div class="navbar-right">
      <d-popover :position="['bottom-end']" class="navbar-top-history-menu">
        <div class="switch-lang-container">
          <i class="icon-history" />
        </div>
        <template #content>
          <HistoryList class="navbar-top-history" />
        </template>
      </d-popover>
      <SwitchLang v-if="!GlobalConfig.language" />
      <Theme v-if="!GlobalConfig.theme" />
      <d-popover :position="['bottom-end']" trigger="hover">
        <template #content>
          <span class="devui-text">{{ $t("navbar.systemSetting") }}</span>
        </template>
        <div class="switch-lang-container">
          <i class="icon-setting system-setting" />
        </div>
      </d-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalConfig from "@/global-config";
import { SwitchLang } from "@/view/navbar";
import { Theme } from "@/view/theme";
import { HistoryList } from "@view/history";
import Logo from "../../../public/logo.svg";
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
  margin-top: 8px;

  .navbar-left,
  .navbar-right {
    display: flex;
    align-items: center;
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
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin-left: 8px;
    color: $devui-text;
    border-radius: $devui-border-radius-card;
    cursor: pointer;

    &:hover {
      background-color: var(--mc-icon-hover-bg);
    }

    i {
      font-size: 16px;
    }
  }
}

.navbar-top-history {
  width: 100%;
  border-right: none;
}

.devui-text {
  color: $devui-text;
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

@media screen and (max-width: 520px) {
  .navbar-top-container {
    display: none;
  }
}

body[ui-theme="infinity-theme"] {
  .navbar-top-history {
    backdrop-filter: blur(50px);
    background-color: rgba(249, 249, 249, 0.8);
  }
}

body[ui-theme="galaxy-theme"] {
  .navbar-top-history {
    background-color: $devui-global-bg;
  }
}
</style>

<style lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.devui-popover__content.navbar-top-history-menu {
  padding: 0;
  background-color: $devui-global-bg;
  box-shadow: $devui-shadow-length-connected-overlay $devui-shadow;
}
</style>
