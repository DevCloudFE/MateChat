<template>
  <Button
    variant="solid"
    shape="round"
    :disabled="rootProps.disabled || (!rootProps.loading && !inputValue)"
    :class="['mc-button', { 'mc-button-loading': rootProps.loading }]"
    @click="onConfirm"
  >
    <LoadingIcon v-if="rootProps.loading" />
    <SendIcon v-else />
    <span>{{ rootProps.loading ? t('Input.pauseAnswer') : t('Input.send') }}</span>
  </Button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Button } from 'vue-devui/button';
import 'vue-devui/button/style.css';
import LoadingIcon from './LoadingIcon.vue';
import SendIcon from './SendIcon.vue';
import { inputInjectionKey } from '../input-types';
import type { InputContext } from '../input-types';
import { useMcI18n } from '@matechat/core/Locale';

const { t } = useMcI18n();

const { inputValue, rootProps, rootEmits } = inject(inputInjectionKey) as InputContext;

const onConfirm = () => {
  if (rootProps.loading) {
    rootEmits('cancel');
  } else {
    rootEmits('submit', inputValue.value);
    inputValue.value = '';
  }
};
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-button.devui-button {
  border: none;

  &.mc-button-loading {
    :deep(svg) {
      animation: rotating 1s linear infinite;
    }
  }

  :deep(.button-content) {
    svg {
      path {
        fill: $devui-light-text;
      }
      margin-right: 4px;
    }

    display: inline-flex;
    align-items: center;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(180deg);
  }
}
</style>
