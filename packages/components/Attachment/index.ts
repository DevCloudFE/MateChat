import type { App } from 'vue';
import McAttachment from './Attachment.vue';

McAttachment.install = (app: App) => {
  app.component('McAttachment', McAttachment);
};

export { McAttachment };
