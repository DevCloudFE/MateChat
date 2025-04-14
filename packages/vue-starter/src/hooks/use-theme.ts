import { onMounted } from "vue";
import { useThemeStore } from "@/store";

export function useTheme() {
  const themeStore = useThemeStore();
  const themeService = (window as any).devuiThemeService;

  const themeChange = () => {
    if (themeService) {
      themeStore.theme = themeService.currentTheme.isDark ? "dark" : "light";
    }
  };

  onMounted(() => {
    themeChange();
    if (themeService && themeService.eventBus) {
      themeService.eventBus.add("themeChanged", themeChange);
    }
  });
}
