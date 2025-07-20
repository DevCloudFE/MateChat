import { defineStore } from "pinia";
import { ref } from "vue";
import { useTheme } from "@/hooks";
import { CustomThemeDataConfig } from "@/constant/theme-data";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref("light");

  const { genCustomThemeData, createCustomTheme } = useTheme();

  const DefaultCustomTheme = createCustomTheme({
    id: "custom",
    name: "Custom Theme",
    data: genCustomThemeData(CustomThemeDataConfig),
  });

  const currentCustomTheme = ref(DefaultCustomTheme);

  return { theme, currentCustomTheme };
});
