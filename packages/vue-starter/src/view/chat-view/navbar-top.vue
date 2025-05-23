<template>
  <div class="navbar-top-container">
    <div class="navbar-left">
      <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
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
          <span class="devui-text">{{ $t('navbar.systemSetting') }}</span>
        </template>
        <div class="switch-lang-container">
          <i class="icon-setting system-setting" />
        </div>
      </d-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalConfig from '@/global-config';
import { SwitchLang } from '@/view/navbar';
import { Theme } from '@/view/theme';
import { HistoryList } from '@view/history';
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
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-left: 8px;
    color: $devui-text;
    border-radius: $devui-border-radius-card;
    transition: all $devui-animation-duration-slow
    $devui-animation-ease-in-out-smooth;
    cursor: pointer;

    &:hover {
      background-color: $devui-base-bg;
      box-shadow: $devui-shadow-length-base $devui-light-shadow;
    }
  }

  ::v-deep .system-setting {
    font-size: 16px;
    cursor: pointer;
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
</style>

<style lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.devui-popover__content.navbar-top-history-menu {
  padding: 0;
  background-color: $devui-connected-overlay-bg;
  box-shadow: $devui-shadow-length-connected-overlay $devui-shadow;
}
</style>
