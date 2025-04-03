import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'ng-devui/button';
import { TranslateModule } from '@ngx-translate/core';
import { DDemoNavModule } from 'devui-commons/src/demo-nav/d-demo-nav.module';
import { AutofocusComponent } from './autofocus/autofocus.component';
import { ButtonDemoComponent } from './button-demo.component';
import { ButtonDesignComponent } from './button-design.component';
import { CombinationComponent } from './combination/combination.component';
import { CommonComponent } from './common/common.component';
import { DangerComponent } from './danger/danger.component';
import { GroupsComponent } from './groups/groups.component';
import { IconComponent } from './icon/icon.component';
import { LoadingComponent } from './loading/loading.component';
import { PrimaryComponent } from './primary/primary.component';
import { SizeComponent } from './size/size.component';
import { TextComponent } from './text/text.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    DDemoNavModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      {
        path: 'design',
        component: ButtonDesignComponent,
      },
      { path: 'demo', component: ButtonDemoComponent },
    ]),
  ],
  exports: [ButtonDemoComponent],
  declarations: [
    ButtonDemoComponent,
    ButtonDesignComponent,
    CommonComponent,
    IconComponent,
    LoadingComponent,
    PrimaryComponent,
    DangerComponent,
    TextComponent,
    CombinationComponent,
    AutofocusComponent,
    SizeComponent,
    GroupsComponent,
  ],
})
export class ButtonDemoModule {}
