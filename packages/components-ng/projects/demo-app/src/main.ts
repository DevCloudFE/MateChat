import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import '@devui-design/icons/icomoon/devui-icon.css';
 
// 使用无限主题
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
