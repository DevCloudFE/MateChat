import { infinityTheme, galaxyTheme } from "devui-theme";
import type { CustomThemeConfig } from "@/global-config-types";

export const lightThemeConfig: CustomThemeConfig = {
  data: {
    "devui-feedback-overlay-bg": "#ffffff",
    "devui-icon-hover-bg": "#ebebeb",
    "mc-icon-hover-bg": "rgba(25, 25, 25, 0.05)",
    "mc-float-block-shadow": "rgba(213, 213, 213, 0.25)",
    "mc-global-bg":
      "linear-gradient(to bottom, #D0C9FF 0%, #E6D6F0 8%, #F1DBEA 12%, #C8DCFB 40%, #ABC6F6 60%, #87AEFE 90%)",
  },
};

export const darkThemeConfig: CustomThemeConfig = {
  data: {
    "devui-icon-hover-bg": "#393a3e",
    "mc-icon-hover-bg": "rgba(206, 209, 219, 0.05)",
    "mc-float-block-shadow": "rgba(0, 0, 0, 0.25)",
  },
};

export const CustomThemeDataConfig: CustomThemeConfig = {
  id: "custom-theme",
  name: "Custom Theme",
  data: {
    "devui-brand": "#F7A2AD",
    "mc-global-bg": "linear-gradient(to bottom, #FFDDE1, #EE9CA7)",
  },
};

export const lightTheme = {
  ...infinityTheme,
  data: { ...infinityTheme.data, ...lightThemeConfig.data },
};

export const darkTheme = {
  ...galaxyTheme,
  data: { ...galaxyTheme.data, ...darkThemeConfig.data },
};
