import type { App } from 'vue';
import McToolCall from './ToolCall.vue';

McToolCall.install = (app: App) => {
  app.component('McToolCall', McToolCall);
};

export { McToolCall };
