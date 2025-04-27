<template>
  <div class="input-container">
    <McInput
      :value="inputValue"
      :maxLength="2000"
      @change="(e:string) => (inputValue = e)"
      @submit="onSubmit"
    >
      <template #extra>
        <div class="input-foot-wrapper">
          <div class="input-foot-left">
            <InputAtModel @click="onModelClick" />
            <d-tooltip position="top" :content="$t('underDevelop')">
              <span class="input-word-container">
                <i class="icon-standard"></i>
                {{ $t("thesaurus") }}
              </span>
            </d-tooltip>
            <InputAppendix />
            <InputAudio />
            <InputOnlineSearch />
            <span class="input-foot-dividing-line"></span>
            <span class="input-foot-maxlength">
              {{ inputValue.length }}/2000
            </span>
          </div>
          <div class="input-foot-right">
            <d-button
              icon="op-clearup"
              shape="round"
              :disabled="!inputValue"
              @click="inputValue = ''"
            >
              {{ $t("input.clearInput") }}
            </d-button>
          </div>
        </div>
      </template>
    </McInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useChatMessageStore, useChatModelStore } from "@/store";
import { InputAtModel } from "@view/chat-model";
import { InputAppendix } from "@view/appendix";
import { InputAudio } from "@view/audio";
import { InputOnlineSearch } from "@view/online-search";

const chatMessageStore = useChatMessageStore();
const chatModelStore = useChatModelStore();

const inputValue = ref("");

chatMessageStore.$onAction(({ name }) => {
  if (name === "ask") {
    inputValue.value = "";
  }
});

const onSubmit = (val: string) => {
  chatMessageStore.ask(val);
};

const onModelClick = () => {
  inputValue.value += `@${chatModelStore.currentModel}`;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.input-container {
  padding: 0 12px 12px 12px;

  .input-foot-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-right: 8px;

    .input-foot-left {
      display: flex;
      align-items: center;
      gap: 8px;

      .input-word-container {
        display: flex;
        align-items: center;

        i {
          font-size: $devui-font-size-icon;
        }
      }

      span {
        font-size: $devui-font-size-sm;
        color: $devui-text;
        cursor: pointer;
      }

      .input-foot-dividing-line {
        width: 1px;
        height: 14px;
        background-color: $devui-line;
      }

      .input-foot-maxlength {
        font-size: $devui-font-size-sm;
        color: $devui-aide-text;
      }
    }

    .input-foot-right {
      & > *:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
}
</style>
