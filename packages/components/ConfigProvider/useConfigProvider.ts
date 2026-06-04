import { inject, InjectionKey, provide } from 'vue';
import { useMcI18n } from '@matechat/core/Locale';
import { ConfigProviderProps } from './types';

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProps> = Symbol('McConfigProvider');

export const defaultPrefixClassName = 'mc';

export const provideMcConfig = (config: ConfigProviderProps) => {
  return provide(CONFIG_PROVIDER_KEY, config);
};

export const useMcConfigInject = () => {
  return inject(CONFIG_PROVIDER_KEY, null);
};

export default function useConfigProvider(props: ConfigProviderProps, sign?: string) {
  provideMcConfig(props);

  const i18n = useMcI18n();
  i18n.setGlobalLocale(props);
  console.log('sign', sign);
};

