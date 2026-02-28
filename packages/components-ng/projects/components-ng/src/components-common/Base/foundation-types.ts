import BaseFoundation from './foundation';

/**
 * 从 BaseFoundation 的子类中提取出对应的 Adapter 类型
 * @example
 * ```
 * // 假设 BubbleFoundation extends BaseFoundation<BubbleAdapter>
 * type BubbleAdapterType = ExtractAdapter<BubbleFoundation>; // BubbleAdapterType 就是 BubbleAdapter
 * ```
 */
export type ExtractAdapter<T> = T extends BaseFoundation<infer A> ? A : never;

/**
 * 从 UseFoundationOptions 中提取出对应的 Adapter 类型
 * @example
 * ```
 * // 假设 options 是 UseFoundationOptions<BubbleFoundation>
 * type BubbleAdapterType = ExtractAdapterFromOptions<typeof options>; // BubbleAdapterType 就是 BubbleAdapter
 * ```
 */
export type ExtractAdapterFromOptions<T> = T extends {
  foundationClass: new (adapter: any) => infer F;
} ? ExtractAdapter<F> : never;
