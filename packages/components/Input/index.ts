import type { App } from 'vue';
import McInput from './Input.vue';

McInput.install = (app: App) => {
  app.component('McInput', McInput);
};

export { McInput };
