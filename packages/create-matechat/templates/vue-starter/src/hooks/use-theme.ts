import { dark, light } from "@/constant";
import { useThemeStore } from "@/store";
import {
  ThemeServiceInit,
  galaxyTheme,
  infinityTheme,
  Theme,
  CustomThemeService,
} from "devui-theme";
import { onMounted } from "vue";
import type { IEffect, IColorDef } from "devui-theme";

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
    colorChanges: Array<IColorDef> | Record<string, string>,
    isDark = false,
    effect: IEffect = "hsl"
  ) => {
    if (!Array.isArray(colorChanges)) {
      colorChanges = transformColorArray(colorChanges);
    }
    const matechatThemeService = new CustomThemeService();
    return matechatThemeService.genThemeData(colorChanges, isDark, effect);
  };

  const transformColorArray = (
    colorObject: Record<string, string>
  ): Array<IColorDef> => {
    return Object.keys(colorObject).map((key) => ({
      colorName: key,
      color: colorObject[key],
    }));
  };

  onMounted(() => {
    themeChange();
    themeService?.eventBus?.add("themeChanged", themeChange);
  });

  return {
    themeService,
    applyTheme,
    applyThemeWithCustom,
    createCustomTheme,
    genCustomThemeData,
  };
}
