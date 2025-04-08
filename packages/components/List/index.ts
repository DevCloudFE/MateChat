import type { App } from 'vue';
import McList from './List.vue';

export * from './list-types';

McList.install = (app: App) => {
  app.component('McList', McList);
};

export { McList };
