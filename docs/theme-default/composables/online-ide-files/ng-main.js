export default `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

ThemeServiceInit(
  {
    'galaxy-theme': galaxyTheme, // 暗黑主题
    'infinity-theme': infinityTheme,
  },
  'infinity-theme'
);
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));`;
