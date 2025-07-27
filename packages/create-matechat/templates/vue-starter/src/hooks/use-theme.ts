import { useThemeStore } from "@/store";
import {
  ThemeServiceInit,
  Theme,
  CustomThemeUtils,
  ThemeService,
} from "devui-theme";
import { onMounted } from "vue";
import type { IEffect, IColorDef } from "devui-theme";
import { lightTheme, darkTheme, CustomThemeDataConfig } from "@/constant";

let themeService: ThemeService | null = null;

const THEME_MAP: Record<string, string> = {
  "infinity-theme": "light",
  "galaxy-theme": "dark",
};

const ID_TO_THEME: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export function useTheme() {
  const themeStore = useThemeStore();

  const initTheme = () => {
    themeService = ThemeServiceInit(
      {
        "infinity-theme": lightTheme,
        "galaxy-theme": darkTheme,
      },
      "infinity-theme"
    );
  };

  const applyTheme = (currentTheme?: Theme) => {
    if (themeService) {
      const theme =
        ID_TO_THEME[themeStore.theme] || themeStore.currentCustomTheme || createCustomThemeFromConfig(CustomThemeDataConfig);
      themeService.applyTheme(currentTheme || theme);
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

  const createCustomThemeFromConfig = (config: any): Theme => {
    return new Theme({
      ...config,
      data: Object.assign(
        {},
        genCustomThemeData(config.devui),
        config.matechat
      ),
    });
  };

  const themeChange = () => {
    if (themeService) {
      themeStore.theme = THEME_MAP[themeService.currentTheme.id] || "custom";
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
    return CustomThemeUtils.genThemeData(colorChanges, isDark, effect);
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
    initTheme,
    applyTheme,
    applyThemeWithCustom,
    createCustomTheme,
    genCustomThemeData,
    createCustomThemeFromConfig,
  };
}
