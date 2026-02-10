import BaseFoundation from '@matechat/common/Base/foundation';
import { MentionFoundation } from '@matechat/common/Mention/foundation';
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import type { MentionProps } from './mention-types';

export function useMention(
  props: MentionProps,
  emits: (event: string, ...args: any[]) => void,
) {
  const popperTriggerEl = ref();
  const originEl = ref();
  const overlayEl = ref<HTMLElement>();
  const overlayStyle = reactive({ top: '0px', left: '0px', width: '' });
  let inputEl: HTMLInputElement | HTMLTextAreaElement | null;
  let mentionFoundation: MentionFoundation;

  // 创建foundation实例
  mentionFoundation = new MentionFoundation({
    ...BaseFoundation.defaultAdapter,
    getProps: () => ({
      modelValue: props.modelValue,
      prefix: props.prefix,
      fitHostWidth: props.fitHostWidth,
      optionsCount: props.optionsCount,
    }),
    nextTick: (cb) => nextTick(cb), // 使用Vue的nextTick函数确保DOM更新完成后执行回调
    updateModelValue: (val) => emits('update:modelValue', val),
    searchChange: (event) => emits('searchChange', event),
    activeIndexChange: () => {},
    toggleChange: (val) => emits('toggleChange', val),
  });

  watch(
    () => props.modelValue,
    (val: boolean, oldVal) => {
      // 更新foundation的modelValue
      mentionFoundation.updateOptions({ modelValue: val });
      if (oldVal !== undefined) {
        emits('toggleChange', val);
      }
      // 当弹窗显示时，更新位置
      if (val) {
        nextTick(() => {
          // 确保overlayEl已被设置到foundation中
          if (overlayEl.value) {
            mentionFoundation.setOverlayEl(overlayEl.value);
          }
          updatePosition();
        });
      }
    },
    { immediate: true },
  );

  // 监听prefix变化
  watch(
    () => props.prefix,
    (newPrefix) => {
      mentionFoundation.updateOptions({ prefix: newPrefix });
    },
    { deep: true },
  );

  // 监听fitHostWidth变化
  watch(
    () => props.fitHostWidth,
    (newVal) => {
      mentionFoundation.updateOptions({ fitHostWidth: newVal });
    },
  );

  const initEvent = () => {
    if (originEl.value) {
      inputEl =
        originEl.value.querySelector('textarea') ||
        originEl.value.querySelector('input');

      if (inputEl) {
        // 设置foundation的元素
        mentionFoundation.setInputEl(inputEl);
        mentionFoundation.setOriginEl(originEl.value);
        if (overlayEl.value) {
          mentionFoundation.setOverlayEl(overlayEl.value);
        }

        // 初始化事件
        mentionFoundation.initEvents();
      }
    }
  };

  // 更新弹窗位置
  const updatePosition = () => {
    if (originEl.value && overlayEl.value) {
      // 获取foundation计算的位置信息
      const positionInfo = mentionFoundation.updateOverlayPosition();
      // 处理Promise返回值
      if (positionInfo instanceof Promise) {
        positionInfo.then((pos) => {
          if (pos) {
            // 更新Vue组件的响应式样式
            Object.assign(overlayStyle, pos);
          }
        });
      } else if (positionInfo) {
        // 处理非Promise返回值（兼容旧版本）
        Object.assign(overlayStyle, positionInfo);
      }
    }
  };

  onMounted(() => {
    const triggerEl = popperTriggerEl.value.triggerEl;
    originEl.value = triggerEl.$el ?? triggerEl;
    initEvent();
  });

  onUnmounted(() => {
    // 清理foundation资源
    mentionFoundation.destroy();
  });

  return {
    popperTriggerEl,
    originEl,
    overlayEl,
    overlayStyle,
    initEvent,
    mentionFoundation,
    resetMention: () => mentionFoundation.resetMention(),
    updateOptions: (options: Partial<MentionProps>) =>
      mentionFoundation.updateOptions(options),
    updatePosition,
  };
}
