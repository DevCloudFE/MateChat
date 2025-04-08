import type { App } from 'vue';
import McMention from './Mention.vue';

McMention.install = (app: App) => {
  app.component('McMention', McMention);
};

export { McMention };
