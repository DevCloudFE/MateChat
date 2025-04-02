import type { App } from 'vue';
import McButton from './Button.vue';

McButton.install = (app: App) => {
  app.component('McButton', McButton);
};

export { McButton };
