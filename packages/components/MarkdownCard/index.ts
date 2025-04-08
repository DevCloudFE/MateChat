import type { App } from 'vue';
import McMarkdownCard from './mdCard.vue';

McMarkdownCard.install = (app: App) => {
  app.component('McMarkdownCard', McMarkdownCard);
};

export { McMarkdownCard };