<template>
  <div class="navbar-container">
    <div class="navbar-top">
      <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
      <div class="dividing-line"></div>
      <div class="chat-box">
        <div class="chat-icon-box active">
          <i class="icon-develop-collaboration"></i>
        </div>
        <span>{{ $t("navbar.chat") }}</span>
      </div>
    </div>
    <div class="navbar-bottom">
      <SwitchLang />
      <Theme />
      <d-tooltip position="right" :content="$t('navbar.systemSetting')">
        <i class="icon-setting system-setting"></i>
      </d-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@/view/theme";
import SwitchLang from "./switch-lang.vue";
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.navbar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 100%;
  padding: 0 8px;
  box-sizing: border-box;

  .navbar-top,
  .navbar-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  .navbar-bottom {
    padding-bottom: 16px;
  }

  :deep(.mc-header-logo-container) {
    flex-direction: column;
    cursor: pointer;

    .mc-header-title {
      font-size: $devui-font-size !important;
    }
  }

  .dividing-line {
    width: 80%;
    height: 1px;
    margin: 12px 0;
    background-color: $devui-dividing-line;
  }

  .chat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: $devui-font-size;
    cursor: pointer;

    .chat-icon-box {
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      margin-bottom: 4px;
      color: $devui-text;
      border-radius: $devui-border-radius-card;
      transition: all $devui-animation-duration-slow
        $devui-animation-ease-in-out-smooth;

      &.active,
      &:hover {
        background-color: $devui-base-bg;
        box-shadow: $devui-shadow-length-base $devui-light-shadow;
      }

      i {
        font-size: 16px;
      }
    }
  }

  ::v-deep .system-setting {
    font-size: 16px;
    cursor: pointer;
  }
}

@media screen and (max-width: 940px) {
  .navbar-container {
    display: none;
  }
}
</style>
