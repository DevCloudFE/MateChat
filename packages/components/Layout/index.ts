import type { App } from 'vue';
import McLayoutAside from './Aside.vue';
import McLayoutContent from './Content.vue';
import McLayoutHeader from './Header.vue';
import McLayout from './Layout.vue';
import McLayoutSender from './Sender.vue';

McLayout.install = (app: App) => {
  app.component('McLayoutAside', McLayoutAside);
  app.component('McLayoutContent', McLayoutContent);
  app.component('McLayoutHeader', McLayoutHeader);
  app.component('McLayout', McLayout);
  app.component('McLayoutSender', McLayoutSender);
};

export { McLayoutAside, McLayoutContent, McLayoutHeader, McLayout, McLayoutSender };
