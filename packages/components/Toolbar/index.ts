import type { App } from 'vue';
import McToolbar from './Toolbar.vue';

export * from './toolbar.types';

McToolbar.install = (app: App) => {
  app.component('McToolbar', McToolbar);
};

export { McToolbar };
