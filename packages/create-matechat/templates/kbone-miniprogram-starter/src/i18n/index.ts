import { createI18n } from 'vue-i18n';
import EN from './en-us';
import CN from './zh-cn';

const i18n = createI18n({
  locale: 'zh-cn',
  legacy: false,
  globalInjection: true,
  messages: {
    'zh-cn': CN,
    'en-us': EN,
  },
});

export default i18n;
