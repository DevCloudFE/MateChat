import { dark, light } from '@/constant';
import { useThemeStore } from '@/store';
import { ThemeServiceInit, galaxyTheme, infinityTheme } from 'devui-theme';
import { onMounted } from 'vue';

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
    'infinityTheme',
  );

  const applyTheme = () => {
    if (themeService) {
      const theme = themeStore.theme === 'light' ? lightTheme : darkTheme;
      themeService.applyTheme(theme);
    }
  };
  const themeChange = () => {
    if (themeService) {
      themeStore.theme = themeService.currentTheme.isDark ? 'dark' : 'light';
    }
  };

  onMounted(() => {
    themeChange();
    themeService?.eventBus?.add('themeChanged', themeChange);
  });

  return { themeService, applyTheme };
}
