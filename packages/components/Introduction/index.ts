import type { App } from 'vue';
import McIntroduction from './Introduction.vue';

McIntroduction.install = (app: App) => {
  app.component('McIntroduction', McIntroduction);
};

export { McIntroduction };
