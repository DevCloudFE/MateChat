import type { App } from 'vue';
import McBubble from './Bubble.vue';

McBubble.install = (app: App) => {
  app.component('McBubble', McBubble);
};

export { McBubble };
