import type { App } from 'vue';
import McConfigProvider from './ConfigProvider.vue';
import useConfigProvider, { useMcConfigInject } from './useConfigProvider';

export type { ConfigProviderProps } from './types.ts';

McConfigProvider.install = (app: App) => {
  app.component('McConfigProvider', McConfigProvider);
};

export { McConfigProvider, useConfigProvider, useMcConfigInject };
