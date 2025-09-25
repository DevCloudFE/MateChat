import type { App } from 'vue';
import McChatInput from './ChatInput.vue';

McChatInput.install = (app: App) => {
  app.component('McChatInput', McChatInput);
};

export { McChatInput };
