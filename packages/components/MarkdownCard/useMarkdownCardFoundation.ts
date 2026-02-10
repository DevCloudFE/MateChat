import {
  useFoundation,
  useDefaultAdapter,
} from "@matechat/common/Base/useFoundation";
import {
  MarkdownCardFoundation,
  MarkdownCardAdapter,
} from "@matechat/common/MarkdownCard/foundation";
import { useMcI18n } from "@matechat/core/Locale";

export interface UseMarkdownCardFoundationOptions {
  props: any;
  emit: any;
}

export function useMarkdownCardFoundation({
  props,
  emit,
}: UseMarkdownCardFoundationOptions) {
  const { t } = useMcI18n();

  // 创建适配器，将Vue组件的props和状态传递给Foundation
  const defaultAdapter = useDefaultAdapter();
  const adapter: MarkdownCardAdapter = {
    ...defaultAdapter,
    getProps: () => props,
    getProp: (key: string) => props[key],
    getStates: () => ({}),
    getState: (key: string) => undefined,
    setState: (key: string, value: any) => {
      // Implementation of setState if needed
    },
    locale: (key: string, params?: Record<string, string>) => t(key, params),
    typingStart: () => emit('typingStart'),
    typingEnd: () => emit('typingEnd'),
    typingEvent: () => emit('typingEvent'),
    parseContent: (content: string) => {}, // todo
  };

  // 使用useFoundation创建MarkdownCardFoundation实例
  const { foundation } = useFoundation<MarkdownCardFoundation>({
    adapter,
    foundationClass: MarkdownCardFoundation,
  });

  return {
    foundation,
  };
}
