import { ref, watch } from 'vue';
import { CustomThemeUtils, ColorHierarchyMap } from 'devui-theme';
import type { IEffect, IColorDef } from 'devui-theme';
import { ConfigProviderProps, CustomThemeConfig } from './types';

export default function useTheme(props: ConfigProviderProps) {
  if (!props.theme) {
    return;
  }
  const globalTheme = ref(props.theme);
  const wind = window as any;
  const themeService = wind.devuiThemeService;

  if (!themeService) {
    console.warn('Missing devui-theme dependency or devui-theme not initialized!');
    return;
  }

  const splitDataByThemeKeys = (configData: any, colors: any) => {
    const colorKeys = Object.keys(colors);
    const devuiData: any = {};
    const customData: any = {};

    for (const key in configData) {
      if (configData.hasOwnProperty(key)) {
        if (colorKeys.includes(key)) {
          devuiData[key] = configData[key];
        } else {
          customData[key] = configData[key];
        }
      }
    }
    return { devuiData, customData };
  };
  const genCustomThemeData = (
    colorChanges: Array<IColorDef> | Record<string, string>,
    isDark = false,
    effect: IEffect = "hsl"
  ) => {
    if (!Array.isArray(colorChanges)) {
      const colorObject = colorChanges as Record<string, string>;
      colorChanges = Object.keys(colorObject).map((key: string) => ({
        colorName: key,
        color: colorObject[key],
      }));
    }
    return CustomThemeUtils.genThemeData(colorChanges, isDark, effect);
  };
  const createCustomThemeFromConfig = (config: CustomThemeConfig): CustomThemeConfig => {
    const { devuiData, customData } = splitDataByThemeKeys(
      config.data,
      ColorHierarchyMap
    );
    return {
      ...config,
      data: Object.assign({}, genCustomThemeData(devuiData), customData),
    };
  };

  const applyTheme = (theme?: CustomThemeConfig) => {
    let newTheme = theme;
    if (theme?.autoDeduction && theme?.data?.['devui-brand']) {
      newTheme = createCustomThemeFromConfig(theme);
    }
    if (newTheme) {
      themeService?.applyTheme(newTheme);
    }
  };

  const applyThemeById = (themeId: string) => {
    const theme = wind.devuiThemes?.[themeId];
    if (theme && themeId !== themeService?.currentTheme.id) {
      globalTheme.value = themeId;
      themeService?.applyTheme(theme);
    }
  };

  const changeTheme = (theme?: string | CustomThemeConfig) => {
    if (typeof theme === 'string') {
      applyThemeById(theme);
    } else {
      applyTheme(theme);
    }
  };
  
  changeTheme(globalTheme.value);

  const themeChanged = () => {
    globalTheme.value = themeService?.currentTheme?.id ?? '';
  };
  if (themeService?.eventBus) {
    themeService.eventBus.add('themeChanged', themeChanged);
  }

  watch(() => props.theme, (newTheme) => {
    changeTheme(newTheme);
  });
};
