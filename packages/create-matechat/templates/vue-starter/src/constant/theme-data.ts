import {
  infinityTheme,
  galaxyTheme,
} from "devui-theme";
import type { CustomThemeConfig } from "@/global-config-types";

export const lightThemeConfig = {
  devui: {
    "devui-feedback-overlay-bg": "#ffffff",
    "devui-icon-hover-bg": "#ebebeb",
  },
  matechat: {
    "mc-icon-hover-bg": "rgba(25, 25, 25, 0.05)",
    "mc-float-block-shadow": "rgba(213, 213, 213, 0.25)",
    "mc-global-bg":
      "linear-gradient(to bottom, rgba(208,201,255,1) 0%, rgba(230,214,240,1) 10%, rgba(200,220,251,1) 40%, rgba(171,198,246,1) 60%, rgba(135,174,254,1) 90%)",
  },
};

export const darkThemeConfig = {
  devui: {
    "devui-icon-hover-bg": "#393a3e",
  },
  matechat: {
    "mc-icon-hover-bg": "rgba(206, 209, 219, 0.05)",
    "mc-float-block-shadow": "rgba(0, 0, 0, 0.25)",
  },
};

export const CustomThemeDataConfig: CustomThemeConfig = {
  id: "custom-theme",
  name: "Custom Theme",
  devui: {
    "devui-brand": "#49ad49",
  },
  matechat: {
    "mc-global-bg": "linear-gradient(to bottom, #bfe7bf, #e4f4ee, #c8e6f5)",
  },
};

export const lightTheme = {
  ...infinityTheme,
  data: { ...infinityTheme.data, ...lightThemeConfig.matechat },
};

export const darkTheme = {
  ...galaxyTheme,
  data: { ...galaxyTheme.data, ...darkThemeConfig.matechat },
};
