import type { App } from 'vue';
import { createMcI18n } from './i18n';
import enUs from './lang/en-us';
import zhCn from './lang/zh-cn';

const McDefaultMessages = {
  'en-us': enUs,
  'zh-cn': zhCn,
};

const McI18n = createMcI18n({
  locale: 'zh-cn',
  messages: McDefaultMessages,
});

export function useMcI18n() {
  return McI18n;
}

export const McLocale = {
  install: (app: App) => {
    app.config.globalProperties.McI18n = McI18n;
  }
};

export default McI18n;
