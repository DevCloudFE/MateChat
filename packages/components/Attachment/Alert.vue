<!-- Block 1: Normal script for exporting the factory function -->
<script lang="ts">
import { createApp, h } from 'vue';
// 导入在同一个文件中定义的组件本身
import AlertComponent from './Alert.vue';

interface AlertOptions {
  type?: 'info' | 'success' | 'error' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

// 这个函数可以被外部模块正常导入
export function showAlert(options: AlertOptions) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const app = createApp({
    render() {
      return h(AlertComponent, {
        ...options,
        // 这个函数将作为 'onClose' prop 传递给 AlertComponent 实例
        onClose: () => {
          app.unmount();
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        },
      });
    },
  });

  app.mount(container);
}
</script>

<!-- Block 2: Script setup for the component's instance logic -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 4500,
  },
  // 这个 prop 由上面的 showAlert 函数传入
  onClose: {
    type: Function,
    required: true,
  },
});

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
  if (props.duration > 0) {
    setTimeout(close, props.duration);
  }
});

function close() {
  isVisible.value = false;
  // 等待 CSS fade-out 动画完成后再调用 unmount 函数
  setTimeout(() => {
    props.onClose();
  }, 300);
}
</script>

<template>
  <transition name="mc-alert-fade">
    <div v-if="isVisible" :class="['mc-alert', `mc-alert--${type}`]">
      <div class="mc-alert__header">
        <span class="mc-alert__title">{{ title }}</span>
        <button class="mc-alert__close-btn" @click="close">✕</button>
      </div>
      <div class="mc-alert__content">
        <pre class="mc-alert__message">{{ message }}</pre>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
// 引入 DevUI 变量 (确保路径正确)
@import 'devui-theme/styles-var/devui-var.scss';

.mc-alert {
  position: fixed;
  top: 50px; 
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: $devui-border-radius;
  transition: all 0.3s ease-in-out;
  z-index: 10000;

  &--error {
    background-color: $devui-info-bg;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__title {
    font-weight: bold;
    font-size: $devui-font-size;
    color: $devui-text;
  }

  &__close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: $devui-aide-text;
    &:hover {
      color: $devui-text;
    }
  }

  &__content {
    font-size: $devui-font-size-sm;
    color: $devui-aide-text;
  }

  &__message {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
    font-family: inherit;
  }
}

.mc-alert-fade-enter-from,
.mc-alert-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%);
}
</style>