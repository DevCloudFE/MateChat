import { NgModule, enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AlignBubbleShowComponent } from '../../demo-app/src/app/BubbleDemo/align-demo-show.component';
import { LoadingBubbleShowComponent } from '../../demo-app/src/app/BubbleDemo/loading-demo-show.component';
import { VariantBubbleShowComponent } from '../../demo-app/src/app/BubbleDemo/variant-demo-show.component';
import { AvatarConfigBubbleShowComponent } from '../../demo-app/src/app/BubbleDemo/avatar-config-demo-show.component';
import { BasicBubbleShowComponent } from '../../demo-app/src/app/BubbleDemo/basic-demo-show.component';
import { VariantAvatarBubbleShowComponent } from '../../demo-app/src/app/BubbleDemo/variant-avatar-demo-show.component';
// 导入Input相关的show组件
import { BasicInputShowComponent } from '../../demo-app/src/app/InputDemo/basic-demo-show.component';
import { AutoInputShowComponent } from '../../demo-app/src/app/InputDemo/auto-demo-show.component';
import { SuffixInputShowComponent } from '../../demo-app/src/app/InputDemo/suffix-demo-show.component';
import { SlotInputShowComponent } from '../../demo-app/src/app/InputDemo/slot-demo-show.component';
import { SubmitInputShowComponent } from '../../demo-app/src/app/InputDemo/submit-demo-show.component';
// 正确定义WebComponentsModule模块
@NgModule({
  imports: [
    BrowserModule,
    BasicBubbleShowComponent,
    AlignBubbleShowComponent,
    LoadingBubbleShowComponent,
    VariantBubbleShowComponent,
    AvatarConfigBubbleShowComponent,
    VariantAvatarBubbleShowComponent,
    // 添加Input相关的show组件
    BasicInputShowComponent,
    AutoInputShowComponent,
    SuffixInputShowComponent,
    SlotInputShowComponent,
    SubmitInputShowComponent
  ],
  providers: []
})
class WebComponentsModule {
  constructor() {}
  // 为WebComponent模式添加必要的引导方法
  ngDoBootstrap() {}
}

// 在生产环境中启用生产模式
// 使用字符串检查而不是process.env，避免依赖Node类型定义
const script = document.currentScript as HTMLScriptElement;
const isProduction = script?.src.includes('production') || false;
if (isProduction) {
  enableProdMode();
}

// 引导应用并注册WebComponent
platformBrowserDynamic()
  .bootstrapModule(WebComponentsModule)
  .then(({ injector }) => {
    console.log('Angular WebComponentsModule 引导成功');

    try {
      // 将Bubble组件转换为webcomponent
      const BubbleWebComponent = createCustomElement(BasicBubbleShowComponent, {
        injector: injector
      });
      const LoadingBubbleWebComponent = createCustomElement(LoadingBubbleShowComponent, {
        injector: injector
      });
      const VariantBubbleWebComponent = createCustomElement(VariantBubbleShowComponent, {
        injector: injector
      });
      const ConfigBubbleWebComponent = createCustomElement(AvatarConfigBubbleShowComponent, {
        injector: injector
      });
      const AlignBubbleWebComponent = createCustomElement(AlignBubbleShowComponent, {
        injector: injector
      });
      const VariantAvatarWebComponent = createCustomElement(VariantAvatarBubbleShowComponent, {
        injector: injector
      });

      // 将Input组件转换为webcomponent
      const BasicInputWebComponent = createCustomElement(BasicInputShowComponent, {
        injector: injector
      });
      const AutoInputWebComponent = createCustomElement(AutoInputShowComponent, {
        injector: injector
      });
      const SuffixInputWebComponent = createCustomElement(SuffixInputShowComponent, {
        injector: injector
      });
      const SlotInputWebComponent = createCustomElement(SlotInputShowComponent, {
        injector: injector
      });
      const SubmitInputWebComponent = createCustomElement(SubmitInputShowComponent, {
        injector: injector
      });

      // 注册Bubble相关webcomponent
      customElements.define('mc-ng-bubble-basic', BubbleWebComponent);
      customElements.define('mc-ng-bubble-loading', LoadingBubbleWebComponent);
      customElements.define('mc-ng-bubble-align', AlignBubbleWebComponent);
      customElements.define('mc-ng-bubble-variant', VariantBubbleWebComponent);
      customElements.define('mc-ng-bubble-avatar-config', ConfigBubbleWebComponent);
      customElements.define('mc-ng-bubble-variant-avatar', VariantAvatarWebComponent);
      
      // 注册Input相关webcomponent
      customElements.define('mc-ng-input-basic', BasicInputWebComponent);
      customElements.define('mc-ng-input-auto', AutoInputWebComponent);
      customElements.define('mc-ng-input-suffix', SuffixInputWebComponent);
      customElements.define('mc-ng-input-slot', SlotInputWebComponent);
      customElements.define('mc-ng-input-submit', SubmitInputWebComponent);
    } catch (error) {
      console.error('创建WebComponent时出错:', error);
    }
  })
  .catch((err) => {
    console.error('Error creating web component:', err);
  });
