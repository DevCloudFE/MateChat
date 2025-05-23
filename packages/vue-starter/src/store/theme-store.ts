import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref("light");

  return { theme };
});
