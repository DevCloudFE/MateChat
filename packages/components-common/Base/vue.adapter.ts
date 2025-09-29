import { DefaultAdapter } from "./foundation";
/**
 * 创建一个通用的默认适配器 hook
 * @param componentProps 组件的 props 对象
 * @param componentStates 组件的状态对象（可选）
 * @returns DefaultAdapter 实例
 */
export function useDefaultAdapter<T extends Record<string, any> = any>(
  componentProps: T,
  componentStates: Record<string, any> = {},
  cache: Record<string, any> = {}
): DefaultAdapter {
  return {
    getProp(key: string): any {
      return componentProps[key];
    },
    getProps(): any {
      return componentProps;
    },
    getState(key: string): any {
      return componentStates[key];
    },
    getStates(): any {
      return componentStates;
    },
    setState(s: any, callback?: any): void {
      if (typeof s === 'object' && s !== null) {
        Object.assign(componentStates, s);
        if (typeof callback === 'function') {
          callback();
        }
      }
    },
    getCache(key: string): any {
      return cache[key];
    },
    getCaches(): any {
      return cache;
    },
    setCache(key: any, value: any): void {
      if (key !== undefined && key !== null) {
        cache[key] = value;
      }
    },
  };
}