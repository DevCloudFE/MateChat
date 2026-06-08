export type LocaleMessages = Record<string, any>;

export type CustomLocaleMessages = Record<string, LocaleMessages>;

export interface CustomThemeConfig {
  id?: string; // 主题id
  name?: string; // 主题名称
  data?: Record<string, string>; // 主题数据
  isDark?: boolean; // 是否为暗黑主题
  autoDeduction?: boolean; // 是否自动推导主题
  customData?: Record<string, string>; // 自定义主题数据
  [key: string]: any; // 其他自定义字段
};

/**
 * 组件 Props 接口定义
 */
export interface ConfigProviderProps {
  customLocaleMessages?: CustomLocaleMessages;
  locale?: string;
  theme?: string | CustomThemeConfig;
  [key: string]: any;
}
