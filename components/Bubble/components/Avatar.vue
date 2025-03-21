<template>
  <span class="mc-bubble-avatar-wrapper">
    <img
      v-if="imgSrc && !isErrorImg"
      :src="imgSrc"
      alt=""
      @error="() => (isErrorImg = true)"
      :style="{
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: isRound ? '100%' : '0',
      }"
    />
    <span
      v-if="!imgSrc && !isNobody && nameDisplay?.length !== 0"
      :class="['mc-bubble-avatar-style', `mc-bubble-avatar-background-${code}`]"
      :style="{
        height: `${height}px`,
        width: `${width}px`,
        lineHeight: `${height}px`,
        fontSize: `${fontSize}px`,
        borderRadius: isRound ? '100%' : '0',
      }"
    >
      {{ nameDisplay }}
    </span>
    <span
      v-if="!imgSrc && !isNobody && nameDisplay?.length === 0"
      class="mc-bubble-avatar-style"
      :style="{ borderRadius: isRound ? '100%' : '0' }"
    >
      <AvatarBodyIcon :width="width" :height="height" />
    </span>
    <span
      v-if="(!imgSrc && isNobody) || (imgSrc && isErrorImg)"
      class="mc-bubble-avatar-style"
      :style="{ borderRadius: isRound ? '100%' : '0' }"
    >
      <AvatarNoBodyIcon :width="width" :height="height" />
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { avatarProps } from './avatar-types';
import AvatarBodyIcon from './AvatarBodyIcon.vue';
import AvatarNoBodyIcon from './AvatarNoBodyIcon.vue';

const props = defineProps(avatarProps);

const isErrorImg = ref<boolean>(false);
const isNobody = ref<boolean>(true);
const code = ref<number>(1);
const fontSize = ref<number>(12);
const nameDisplay = ref<string>();

const getBackgroundColor = (char: string): void => {
  if (props.gender) {
    if (props.gender.toLowerCase() === 'male') {
      code.value = 1;
    } else if (props.gender.toLowerCase() === 'female') {
      code.value = 0;
    }
    return;
  }
  const unicode = char.charCodeAt(0);
  code.value = unicode % 2;
};

const setDisplayName = (nameValue: string, widthValue: number): void => {
  if (nameValue.length < 2) {
    nameDisplay.value = nameValue;
  } else {
    // 以中文开头显示最后两个字符
    if (/^[\u4e00-\u9fa5]/.test(nameValue)) {
      nameDisplay.value = nameValue.substr(nameValue.length - 2, 2);
      // 英文开头
    } else if (/^[A-Za-z]/.test(nameValue)) {
      // 含有两个及以上，包含空格，下划线，中划线分隔符的英文名取前两个字母的首字母
      if (/[_ -]/.test(nameValue)) {
        const str_before = nameValue.split(/_|-|\s+/)[0];
        const str_after = nameValue.split(/_|-|\s+/)[1];
        nameDisplay.value = str_before.substr(0, 1).toUpperCase() + str_after.substr(0, 1).toUpperCase();
      } else {
        // 一个英文名的情况显示前两个字母
        nameDisplay.value = nameValue.substr(0, 2).toUpperCase();
      }
    } else {
      // 非中英文开头默认取前两个字符
      nameDisplay.value = nameValue.substr(0, 2);
    }
  }
  if (widthValue < 30) {
    nameDisplay.value = nameValue.substr(0, 1).toUpperCase();
  }
  getBackgroundColor(nameValue.substr(0, 1));
};

const calcValues = (nameInput: string): void => {
  const userName = nameInput;
  const minNum = Math.min(props.width, props.height);
  if (userName) {
    isNobody.value = false;
    setDisplayName(userName, minNum);
  } else if (userName === '') {
    isNobody.value = false;
    nameDisplay.value = '';
  } else {
    isNobody.value = true;
  }
  fontSize.value = minNum / 4 + 3;
};

calcValues(props.name);

watch([() => props.name, () => props.width, () => props.height, () => props.gender], () => {
  calcValues(props.name);
});
</script>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-bubble-avatar-wrapper {
  display: inline-block;

  .mc-bubble-avatar-style {
    display: inline-block;
    text-align: center;
    color: $devui-light-text;
  }

  .mc-bubble-avatar-background-0 {
    background-color: #ff8b87;
  }

  .mc-bubble-avatar-background-1 {
    background-color: #7693f5;
  }
}
</style>
