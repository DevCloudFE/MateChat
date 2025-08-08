<template>
  <div class="chat-view-wrapper">
    <div class="chat-view-container">
      <NavbarTop />
      <ChatProcess v-if="chatStatusStore.startChat" />
      <Welcome v-else />
      <div class="new-convo-button">
        <div class="agent-knowledge">
          <ChatModel />
          <ChatSetting />
          <span class="agent-knowledge-dividing-line"></span>
          <Knowledge />
        </div>
        <d-popover
          :content="$t('newChat')"
          trigger="hover"
          :position="['top']"
          style="color: var(--devui-text)"
        >
          <div class="new-chat-setting" @click="onNewConvo">
            <i class="icon-add"></i>
          </div>
        </d-popover>
      </div>
      <Input />
    </div>
    <div
      v-if="GlobalConfig.displayShape === DisplayShape.Immersive"
      :class="['toggle-wrapper', !commonStore.isExpand && 'not-expand']"
      @click="onToggle"
    >
      <ExpandIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
  useCommonStore,
} from "@/store";
import { ChatModel } from "@view/chat-model";
import { ChatProcess } from "@view/chat-process";
import { ChatSetting } from "@view/chat-setting";
import { Input } from "@view/input";
import { Knowledge } from "@view/knowledge";
import { Welcome } from "@view/welcome";
import NavbarTop from "./navbar-top.vue";
import { ExpandIcon } from "@/components";
import GlobalConfig from "@/global-config";
import { DisplayShape } from "@/global-config-types";

const chatHistoryStore = useChatHistoryStore();
const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();
const commonStore = useCommonStore();

const onNewConvo = () => {
  chatHistoryStore.setActiveHistoryId("");
  chatStatusStore.startChat = false;
  chatMessageStore.messages = [];
};

const onToggle = () => {
  commonStore.isExpand = !commonStore.isExpand;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.chat-view-wrapper {
  position: relative;
  display: flex;
  flex: 1;
  width: 0;
  height: 100%;
}

.chat-view-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .new-convo-button {
    padding: 0 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    height: 39px;
    gap: 4px;
  }

  .agent-knowledge {
    flex: 1;
    display: flex;
    align-items: center;

    .agent-knowledge-dividing-line {
      width: 1px;
      height: 14px;
      margin: 0 12px;
      background-color: $devui-line;
    }
  }

  .new-chat-setting {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: $devui-border-radius-full;
    background-color: $devui-base-bg;
    box-shadow: 0px 1px 8px 0px rgba(25, 25, 25, 0.06);
    cursor: pointer;

    &:hover {
      color: $devui-brand;
    }
  }
}

.toggle-wrapper {
  position: absolute;
  z-index: 10;
  top: calc(50% - 20px);
  left: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 2px 0px 4px 0px var(--mc-float-block-shadow);
  background: $devui-base-bg;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  svg {
    transition: transform 0.3s ease-in-out;
  }

  &.not-expand {
    left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    svg {
      transform: rotate(180deg);
    }
  }
}

body[ui-theme-type="light"] {
  .chat-view-wrapper {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95),
      rgba(248, 250, 255, 0.95) 99%
    );
  }
}

body[ui-theme-type="dark"] {
  .chat-view-wrapper {
    background-color: $devui-global-bg;
  }
}

@media screen and (max-width: 940px) {
  .navbar-container {
    display: none;
  }
}

@media screen and (max-width: 860px) {
  .toggle-wrapper {
    display: none;
  }
}
</style>
