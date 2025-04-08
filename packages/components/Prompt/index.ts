import type { App } from 'vue';
import McPrompt from './Prompt.vue';

McPrompt.install = (app: App) => {
  app.component('McPrompt', McPrompt);
};

export { McPrompt };
