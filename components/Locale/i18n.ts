import { ref, reactive } from "vue";

export type LocaleMessages = Record<string, any>; 

export interface McI18nOptions {
  locale: string;
  messages: LocaleMessages;
}

export function createMcI18n(options: McI18nOptions) {
  return new McI18n(options);
}

export class McI18n {
  locale = ref('zh-cn');
  messages: LocaleMessages = reactive({});

  constructor(options: McI18nOptions) {
    this.locale.value = options.locale;
    this.messages = reactive(options.messages);
  }

  /** 切换语言 */
  use = (locale: string) => {
    this.locale.value = locale;
  }

  /** 翻译函数 */
  t = (path: string, params = {}) => {
    const localeMessage = this.messages[this.locale.value];
    return get(path, params, localeMessage);
  }


  /** 覆盖、合并国际化翻译 */
  mergeLocaleMessages = (locale: string, messages: LocaleMessages) => {
    if(!this.messages[locale]) {
      this.messages[locale] = messages;
      return this.messages;
    }
    this.messages[locale] = deepMerge(this.messages[locale], messages);
    return deepMerge(this.messages[locale], messages);
  }
}

export function get(path: string, params: any, messages: LocaleMessages) {
  const keys = path.split('.');
  let value = messages || {};
  keys.forEach((key) => {
    value = value[key] ?? path;
  });

  if (typeof value == 'function') {
    return value(params);
  }

  return value.replace(/{(\w+)}/g, (_, placeholder: string) => {
    return params[placeholder] ?? `{${placeholder}}`;
  });
}

export function deepMerge(target: LocaleMessages, source: LocaleMessages) {
  const result = { ...target };
  for(const key in source) {
    if(Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceVal = source[key];
      const targetVal = target[key];
      if (typeof sourceVal === 'object' && sourceVal !== null) {
        if (typeof targetVal === 'object' && targetVal !== null) {
          result[key] = deepMerge(targetVal, sourceVal);
        } else {
          result[key] = {...sourceVal};
        }
      } else {
        result[key] = sourceVal;
      }
    }
  }
  return result;
}
