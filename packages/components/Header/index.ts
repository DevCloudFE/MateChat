import type { App } from 'vue';
import McHeader from './Header.vue';

McHeader.install = (app: App) => {
  app.component('McHeader', McHeader);
};

export { McHeader };
