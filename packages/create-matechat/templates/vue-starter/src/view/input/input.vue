<template>
  <div class="input-container">
  <!-- 图片预览区域 -->
  <div v-if="imagePreviewUrl" class="image-preview-container">
    <div class="preview-image-wrapper">
      <img :src="imagePreviewUrl" alt="预览图片" class="preview-image">
      <button class="remove-image" @click="clearImagePreview">×</button>
    </div>
  </div>
    <McInput
      :value="inputValue"
      :maxLength="2000"
      variant="borderless"
      @change="(e:string) => (inputValue = e)"
      @submit="onSubmit"
    >
      <template #extra>
        <div class="input-foot-wrapper">
          <InputOnlineSearch />
          <span class="input-foot-dividing-line"></span>
          <InputAtModel @click="onModelClick" />
          <d-popover
            :content="$t('underDevelop')"
            trigger="hover"
            :position="['top']"
            style="color: var(--devui-text)"
          >
            <div class="input-word-container">
              <PromptsIcon />
              <span>{{ $t("thesaurus") }}</span>
            </div>
          </d-popover>
          <InputCamera @captureImage="handleImageCapture" />
          <InputAppendix />
          <span class="input-foot-dividing-line"></span>
          <span class="input-foot-maxlength">
            {{ inputValue.length }}/2000
          </span>
        </div>
      </template>
    </McInput>
    <div class="statement-box">
      <span>{{ $t("input.disclaimer") }}</span>
      <span class="separator" />
      <span class="link-span">{{ $t("input.privacyStatement") }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PromptsIcon } from '@/components';
import { useChatMessageStore, useChatModelStore } from '@/store';
import { InputAppendix } from '@view/appendix';
import { InputCamera } from '@view/camera';
import { InputAtModel } from '@view/chat-model';
import { InputOnlineSearch } from '@view/online-search';
import { ref } from 'vue';

const chatMessageStore = useChatMessageStore();
const chatModelStore = useChatModelStore();

const inputValue = ref('');
const imagePreviewUrl = ref('');

// 处理相机捕获的图片
const handleImageCapture = (imageData: string) => {
  imagePreviewUrl.value = imageData;
};

// 清除图片预览
const clearImagePreview = () => {
  imagePreviewUrl.value = '';
};

chatMessageStore.$onAction(({ name }) => {
  if (name === 'ask') {
    inputValue.value = '';
  }
});

const onSubmit = () => {
  const text = inputValue.value.trim();
  if (!text && !imagePreviewUrl.value) return;

  const messageContent = {
    text,
    image: imagePreviewUrl.value,
  };

  chatMessageStore.ask(messageContent);

  inputValue.value = '';
  imagePreviewUrl.value = '';
};

const onModelClick = () => {
  inputValue.value += `@${chatModelStore.currentModel?.modelName}`;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.input-container {
  width: 100%;
  max-width: 1200px;
  padding: 0 12px 12px 12px;

  .input-foot-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-right: 8px;

    .input-word-container {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 30px;
      color: $devui-text;
      font-size: $devui-font-size;
      border-radius: 4px;
      padding: 6px;
      cursor: pointer;

      svg {
        width: 14px;
        height: 14px;
      }

      span {
        font-size: $devui-font-size-sm;
      }

      &:hover {
        background-color: var(--devui-icon-hover-bg);
      }
    }

    span {
      color: $devui-text;
      cursor: pointer;
    }

    .input-foot-dividing-line {
      width: 1px;
      height: 14px;
      background-color: $devui-line;
      margin: 0 8px;
    }

    .input-foot-maxlength {
      font-size: $devui-font-size-sm;
      color: $devui-aide-text;
    }
  }
  :deep() {
    .mc-input-foot-left {
      overflow-x: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar { display: none; } /* WebKit browsers */
    }
    .mc-button svg path {
      transition: fill $devui-animation-duration-slow
        $devui-animation-ease-in-out-smooth;
    }
  }

  .image-preview-container {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .preview-image-wrapper {
    position: relative;
    display: inline-block;
  }

  .preview-image {
    max-width: 200px;
    max-height: 150px;
    object-fit: contain;
    border-radius: 4px;
  }

  .remove-image {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .statement-box {
    font-size: 12px;
    margin-top: 8px;
    color: $devui-aide-text;
    text-align: center;

    .separator {
      height: 12px;
      margin: 0 4px;
      border: 0.6px solid $devui-disabled-text;
    }

    .link-span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

body[ui-theme="galaxy-theme"] {
  .input-container {
    :deep() {
      .mc-button:disabled {
        color: $devui-disabled-text;
        background-color: $devui-disabled-bg;
        svg path {
          fill: $devui-disabled-text;
        }
      }
    }
  }
}

@media screen and (max-width: 520px) {
  .input-word-container span {
    display: none;
  }
  .input-foot-maxlength {
    display: none;
  }
}
</style>
