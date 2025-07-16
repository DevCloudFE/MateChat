<template>
  <div class="navbar-container">
    <div class="navbar-top">
      <div class="navbar-header">
        <img :src="GlobalConfig.logoPath || Logo" />
        <span>{{ GlobalConfig.title || "MateChat" }}</span>
      </div>
      <div class="dividing-line"></div>
      <div class="chat-box">
        <div class="chat-icon-box active">
          <img src="/chat-icon.svg" />
        </div>
        <span>{{ $t("navbar.chat") }}</span>
      </div>
    </div>
    <div class="navbar-bottom">
      <SwitchLang v-if="!GlobalConfig.language" />
      <Theme v-if="!GlobalConfig.theme" />
      <d-popover :position="['right']" trigger="hover">
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
import { Theme } from "@/view/theme";
import SwitchLang from "./switch-lang.vue";
import Logo from "../../../public/logo.svg";
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

:deep(.switch-lang-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: $devui-text;
  border-radius: $devui-border-radius-card;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.navbar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 100%;
  box-sizing: border-box;

  .navbar-top,
  .navbar-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .navbar-top {
    margin-top: 12px;

    .navbar-header {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      gap: 4px;

      img {
        width: 34px;
        height: 34px;
      }
      span {
        line-height: 20px;
        font-size: 11px;
        font-weight: bold;
      }
    }
  }

  .navbar-bottom {
    padding-bottom: 16px;
    gap: 16px;
  }

  :deep(.mc-header-logo-container) {
    flex-direction: column;
    cursor: pointer;

    .mc-header-title.mc-header-title {
      font-size: 10px;
      font-weight: 600;
    }
  }

  .dividing-line {
    width: 32px;
    height: 1px;
    margin: 16px 0;
    background-color: #babbc0;
  }

  .chat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: $devui-font-size-sm;
    cursor: pointer;

    .chat-icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border-radius: $devui-border-radius-card;

      &.active,
      &:hover {
        background-color: $devui-base-bg;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }

    span {
      color: $devui-text;
      font-size: $devui-font-size-sm;
      line-height: 20px;
    }
  }

  ::v-deep .system-setting {
    font-size: 20px;
    cursor: pointer;
  }
}

.devui-text {
  color: $devui-text;
}

@media screen and (max-width: 940px) {
  .navbar-container {
    display: none;
  }
}
</style>
