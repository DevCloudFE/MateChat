export type LocaleMessages = Record<string, any>;

export type CustomLocaleMessages = Record<string, LocaleMessages>;

export interface ThemeConfig {
  [key: string]: any;
}

/**
 * 组件 Props 接口定义
 */
export interface ConfigProviderProps {
  customLocaleMessages?: CustomLocaleMessages;
  locale?: string;
  theme?: ThemeConfig;
  prefixClassName?: string;
  [key: string]: any;
}
