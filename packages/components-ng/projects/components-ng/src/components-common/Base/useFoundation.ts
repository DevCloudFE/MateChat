import { onBeforeUnmount, ref, reactive, nextTick } from 'vue';
import BaseFoundation from './foundation';

export type ExtractAdapter<T> = T extends BaseFoundation<infer A> ? A : never;

export interface UseFoundationOptions<T> {
  adapter: ExtractAdapter<T>;
  foundationClass: new (adapter: ExtractAdapter<T>) => T;
}

export function useDefaultAdapter() {
  const cache = reactive<Record<string, any>>({});

  return {
    getCache: (key: string) => cache[key],
    getCaches: () => ({ ...cache }),
    setCache: (key: string, value: any) => {
      cache[key] = value;
    },
    nextTick: nextTick,
  };
}

export function useFoundation<T>({
  adapter,
  foundationClass,
}: UseFoundationOptions<T>) {
  const foundationRef = ref<T | null>(null);

  // 初始化foundation实例
  const initFoundation = () => {
    if (!foundationRef.value) {
      foundationRef.value = new foundationClass(adapter);

      // 调用foundation的init方法
      if (typeof foundationRef.value.init === 'function') {
        foundationRef.value.init();
      }
    }
    return foundationRef.value;
  };

  // 销毁foundation实例
  const destroyFoundation = () => {
    if (foundationRef.value) {
      if (typeof foundationRef.value.destroy === 'function') {
        foundationRef.value.destroy();
      }
      foundationRef.value = null;
    }
  };

  // 在组件卸载前销毁foundation实例
  onBeforeUnmount(() => {
    destroyFoundation();
  });

  // 初始化并返回foundation实例
  const foundation: T = initFoundation() as T;

  return {
    foundation,
    destroyFoundation,
  };
}
