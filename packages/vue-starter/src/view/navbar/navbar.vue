<template>
  <div class="navbar-container">
    <div class="navbar-top">
      <McHeader :logoImg="GlobalConfig.logoPath || '/logo.svg'" :title="GlobalConfig.title || 'MateChat'"></McHeader>
      <div class="dividing-line"></div>
      <div class="chat-box">
        <div class="chat-icon-box active">
          <i class="icon-develop-collaboration"></i>
        </div>
        <span>{{ $t("navbar.chat") }}</span>
      </div>
    </div>
    <div class="navbar-bottom">
      <SwitchLang v-if="!GlobalConfig.language" />
      <Theme v-if="!GlobalConfig.theme" />
      <d-popover :position="['right']" trigger="hover">
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
import { Theme } from '@/view/theme';
import SwitchLang from './switch-lang.vue';
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

:deep(.switch-lang-container) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 8px;
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

.navbar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 100%;
  box-sizing: border-box;

  .navbar-top,
  .navbar-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .navbar-bottom {
    padding-bottom: 16px;
  }

  :deep(.mc-header-logo-container) {
    flex-direction: column;
    cursor: pointer;

    .mc-header-title.mc-header-title {
      font-size: 12px;
      font-weight: 600;
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

.devui-text {
  color: $devui-text;
}

@media screen and (max-width: 940px) {
  .navbar-container {
    display: none;
  }
}
</style>
