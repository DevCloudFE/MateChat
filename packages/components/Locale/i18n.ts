import { ref, reactive, computed, ComputedRef, Ref } from "vue";

export type LocaleMessages = Record<string, any>; 

export interface McI18nOptions {
  locale: string;
  messages: LocaleMessages;
}

export function createMcI18n(options: McI18nOptions) {
  return new McI18n(options);
}

export class McI18n {
  globalConfig: Ref<any> = ref({});
  locale = ref('zh-cn');
  defaultMessages: LocaleMessages = reactive({});
  mergedMessages: LocaleMessages = reactive({});
  messages: ComputedRef<LocaleMessages>;
  globalLocale: ComputedRef<string>;

  constructor(options: McI18nOptions) {
    this.locale.value = options.locale;
    this.defaultMessages = reactive(options.messages);
    // 合并默认内置文案、用户自定义文案、用户全局配置文案
    // 优先级：用户全局配置文案 > 用户自定义文案 > 默认文案
    this.messages = computed(() => {
      let messages = deepMerge(options.messages, this.mergedMessages);
      messages = deepMerge(messages, this.globalConfig.value.customLocaleMessages);
      return messages;
    });
    this.globalLocale = computed(() => {
      return this.globalConfig.value.locale;
    });
  }

  /** 切换语言 */
  use = (locale: string) => {
    this.locale.value = locale;
  }

  /** 翻译函数 */
  t = (path: string, params = {}) => {
    // 全局配置语言优先
    const local = this.globalLocale.value ?? this.locale.value;
    const localeMessage = this.messages.value[local];
    return get(path, params, localeMessage);
  }


  /** 覆盖、合并国际化翻译 */
  mergeLocaleMessages = (locale: string, messages: LocaleMessages) => {
    if(!this.mergedMessages[locale]) {
      this.mergedMessages[locale] = messages;
      return this.mergedMessages;
    }
    this.mergedMessages[locale] = deepMerge(this.mergedMessages[locale], messages);
    return deepMerge(this.mergedMessages[locale], messages);
  }

  /** 全局配置 */
  setGlobalLocale = (config: any) => {
    this.globalConfig.value = config;
  };
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
