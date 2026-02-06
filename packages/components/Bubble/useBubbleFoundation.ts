import { computed } from 'vue';
import { useFoundation, useDefaultAdapter } from '@matechat/common/Base/useFoundation';
import { BubbleFoundation, BubbleAdapter } from '@matechat/common/Bubble/foundation';
import { BubbleAvatar } from './bubble-types';

export interface UseBubbleFoundationOptions {
  props: any;
}

export function useBubbleFoundation({ props }: UseBubbleFoundationOptions) {
  // 创建适配器，将Vue组件的props和状态传递给Foundation
  const defaultAdapter = useDefaultAdapter();
  const adapter: BubbleAdapter = {
    ...defaultAdapter,
    getProps: () => props,
    getProp: (key: string) => props[key],
    getStates: () => ({}),
    getState: (key: string) => undefined,
    setState: (key: string, value: any) => {
      // Implementation of setState if needed
    },
  };

  // 使用useFoundation创建BubbleFoundation实例
  const { foundation } = useFoundation<BubbleFoundation>({
    adapter,
    foundationClass: BubbleFoundation,
  });

  // 计算气泡类名
  const bubbleClasses = computed(() => {
    return foundation.getBubbleClasses();
  });

  // 计算是否为空头像
  const isEmptyAvatar = computed(() => {
    return foundation.getIsEmptyAvatar(props.avatarConfig);
  });

  return {
    foundation,
    bubbleClasses,
    isEmptyAvatar,
  };
}
