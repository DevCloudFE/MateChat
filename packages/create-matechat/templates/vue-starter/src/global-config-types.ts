import type { LangType } from "@/types";

export enum DisplayShape {
  Immersive = "Immersive", // 沉浸式
  Assistant = "Assistant", // 助手式
}

export enum ThemeEnum {
  Dark = "dark",
  Light = "light",
  Custom = 'custom', // 自定义主题
}

export interface IGlobalConfig {
  displayShape: DisplayShape;
  logoPath?: string; // 左上角logo图标路径
  title?: string; // logo下方标识 欢迎页 title
  subTitle?: string; // 欢迎语
  language?: LangType; // 国际化 配置后不展示切换语言按钮
  theme?: ThemeEnum; // 主题 配置后不展示切换主题按钮
}
