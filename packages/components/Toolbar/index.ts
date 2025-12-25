import type { App } from 'vue';
import McToolbar from './Toolbar.vue';
import McCopyIcon from './icon/CopyIcon.vue';
import McDeleteIcon from './icon/DeleteIcon.vue';
import McDislikeIcon from './icon/DislikeIcon.vue';
import McLikeIcon from './icon/LikeIcon.vue';
import McRefreshIcon from './icon/RefreshIcon.vue';
import McShareIcon from './icon/ShareIcon.vue';

export * from './toolbar.types';

McToolbar.install = (app: App) => {
  app.component('McToolbar', McToolbar);
  app.component('McCopyIcon', McCopyIcon);
  app.component('McDeleteIcon', McDeleteIcon);
  app.component('McLikeIcon', McLikeIcon);
  app.component('McDislikeIcon', McDislikeIcon);
  app.component('McRefreshIcon', McRefreshIcon);
  app.component('McShareIcon', McShareIcon);
};

export {
  McToolbar,
  McCopyIcon,
  McDeleteIcon,
  McLikeIcon,
  McDislikeIcon,
  McRefreshIcon,
  McShareIcon,
};
