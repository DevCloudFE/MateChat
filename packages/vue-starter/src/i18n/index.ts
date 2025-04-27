import { createI18n } from "vue-i18n";
import CN from "./zh-cn";
import EN from "./en-us";

const i18n = createI18n({
  locale: "zh-cn",
  legacy: false,
  globalInjection: true,
  messages: {
    "zh-cn": CN,
    "en-us": EN,
  },
});

export default i18n;
