import type { App } from 'vue';
import McFileList from './FileList.vue';

McFileList.install = (app: App) => {
  app.component('McFileList', McFileList);
};

export { McFileList };
