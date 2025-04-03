import { Routes } from "@angular/router";
import { ExamplePanelComponent } from './example-panel.component';
import { GetStartedComponent } from './get-started.component';
import { GlobalConfigComponent } from './global-config.component';
import { ComponentsOverviewComponent } from './overview.component';
import { ThemeGuideComponent } from './theme-guide.component';

export const routesConfig: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
    data: {},
  },
  {
    path: 'overview',
    component: ComponentsOverviewComponent,
    data: { nodisplay: true },
  },
  {
    path: 'get-start',
    component: GetStartedComponent,
    data: { nodisplay: true },
  },
  {
    path: 'theme-guide',
    component: ThemeGuideComponent,
    data: { nodisplay: true },
  },
  {
    path: 'global-config',
    component: GlobalConfigComponent,
    data: { nodisplay: true },
  }
 


 






];
