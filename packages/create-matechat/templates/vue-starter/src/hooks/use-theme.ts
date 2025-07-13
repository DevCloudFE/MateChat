import { dark, light } from "@/constant";
import { useThemeStore } from "@/store";
import {
  ThemeServiceInit,
  galaxyTheme,
  infinityTheme,
  sweetTheme,
  Theme,
} from "devui-theme";
import { onMounted } from "vue";
import { CustomThemeService } from "@/utils/customTheme";
import type { IEffect, IColorDef } from "@/utils/customTheme";

export function useTheme() {
  const themeStore = useThemeStore();
  const lightTheme = {
    ...infinityTheme,
    data: { ...infinityTheme.data, ...light },
  };
  const darkTheme = { ...galaxyTheme, data: { ...galaxyTheme.data, ...dark } };
  const themeService = ThemeServiceInit(
    {
      lightTheme,
      darkTheme,
    },
    "infinityTheme"
  );
  const themeMap: Record<string, string> = {
    "infinity-theme": "light",
    "galaxy-theme": "dark",
  };
  const idToTheme: Record<string, Theme> = {
    light: lightTheme,
    dark: darkTheme,
  };

  const applyTheme = () => {
    if (themeService) {
      const theme =
        idToTheme[themeStore.theme] || themeStore.currentCustomTheme;
      themeService.applyTheme(theme);
    }
  };

  const applyThemeWithCustom = (theme: Theme) => {
    if (themeService) {
      themeService.applyTheme(theme);
      themeStore.currentCustomTheme = theme;
    }
  };

  const createCustomTheme = (theme: Theme): Theme => {
    return new Theme(theme);
  };

  const themeChange = () => {
    if (themeService) {
      themeStore.theme = themeMap[themeService.currentTheme.id] || "custom";
    }
  };

  const genCustomThemeData = (
    colorChanges: Array<IColorDef>,
    isDark = false,
    effect: IEffect = "hsl"
  ) => {
    const matechatThemeService = new CustomThemeService();
    return matechatThemeService.genThemeData(colorChanges, isDark, effect);
  };

  onMounted(() => {
    themeChange();
    themeService?.eventBus?.add("themeChanged", themeChange);
  });

  return { themeService, applyTheme, applyThemeWithCustom, createCustomTheme, genCustomThemeData };
}
