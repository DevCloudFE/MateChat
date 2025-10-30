import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const isExpand = ref(true);

  return { isExpand };
});
