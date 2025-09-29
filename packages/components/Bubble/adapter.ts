import { props } from "./bubble-types";
import { BubbleAdapter } from "@matechat/common/Bubble/foundation";
import { useDefaultAdapter } from "@matechat/common/Base/vue.adapter";


/**
 * 创建 Bubble 组件专用的适配器 hook
 * @param componentProps Bubble 组件的 props 对象
 * @returns BubbleAdapter 实例
 */
export function useBubbleAdapter(componentProps?: Record<string, any>): BubbleAdapter {
  return {
    ...useDefaultAdapter(componentProps || {}),
  };
}
