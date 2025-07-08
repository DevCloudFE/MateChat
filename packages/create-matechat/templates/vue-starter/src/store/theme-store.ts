import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sweetTheme } from 'devui-theme';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light');
  const currentCustomTheme = ref(sweetTheme);

  return { theme, currentCustomTheme };
});
