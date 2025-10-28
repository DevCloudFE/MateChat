import { NgModule, enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AlignBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/align-demo-show.component';
import { LoadingBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/loading-demo-show.component';
import { VariantBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/variant-demo-show.component';
import { AvatarConfigBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/avatar-config-demo-show.component';
import { BasicBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/basic-demo-show.component';
import { VariantAvatarBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/variant-avatar-demo-show.component';
import { AvatarPlusBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/avatar-plus-demo-show.component';
import { CustomBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/custom-demo-show.component';
// 导入Input相关的show组件
import { BasicInputShowComponent } from '../../demo-app/src/app/show/Input/basic-demo-show.component';
import { ButtonInputShowComponent } from '../../demo-app/src/app/show/Input/button-demo-show.component';
import { AutoInputShowComponent } from '../../demo-app/src/app/show/Input/auto-demo-show.component';
import { AutoSizeInputShowComponent } from '../../demo-app/src/app/show/Input/auto-size-demo-show.component';
import { SuffixInputShowComponent } from '../../demo-app/src/app/show/Input/suffix-demo-show.component';
import { SlotInputShowComponent } from '../../demo-app/src/app/show/Input/slot-demo-show.component';
import { SubmitInputShowComponent } from '../../demo-app/src/app/show/Input/submit-demo-show.component';

// 导入MarkdownCard相关的show组件
import { MarkdownCodeOperatorShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-code-operator-show.component';
import { MarkdownEmojeShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-emoje-show.component';
import { MarkdownMermaidShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-mermaid-show.component';
import { MarkdownTypingShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-typing-show.component';
import { MarkdownBasicShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-basic-show.component';
import { MarkdownThinkingShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-thinking-show.component';

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
    AvatarPlusBubbleShowComponent,
    CustomBubbleShowComponent,
    // 添加Input相关的show组件
    BasicInputShowComponent,
    AutoInputShowComponent,
    SuffixInputShowComponent,
    SlotInputShowComponent,
    SubmitInputShowComponent,
    // 添加MarkdownCard相关的show组件
    MarkdownCodeOperatorShowComponent,
    MarkdownEmojeShowComponent,
    MarkdownMermaidShowComponent,
    MarkdownTypingShowComponent,
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
      
      // 将新创建的Bubble组件转换为webcomponent
      const AvatarPlusBubbleWebComponent = createCustomElement(AvatarPlusBubbleShowComponent, {
        injector: injector
      });
      const CustomBubbleWebComponent = createCustomElement(CustomBubbleShowComponent, {
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
      const ButtonInputWebComponent = createCustomElement(ButtonInputShowComponent, {
        injector: injector
      });
      const AutoSizeInputWebComponent = createCustomElement(AutoSizeInputShowComponent, {
        injector: injector
      });

      // 将MarkdownCard组件转换为webcomponent
      const MarkdownCodeOperatorWebComponent = createCustomElement(MarkdownCodeOperatorShowComponent, {
        injector: injector
      });
      const MarkdownEmojeWebComponent = createCustomElement(MarkdownEmojeShowComponent, {
        injector: injector
      });
      const MarkdownMermaidWebComponent = createCustomElement(MarkdownMermaidShowComponent, {
        injector: injector
      });
      const MarkdownTypingWebComponent = createCustomElement(MarkdownTypingShowComponent, {
        injector: injector
      });
      const MarkdownBasicWebComponent = createCustomElement(MarkdownBasicShowComponent, {
        injector: injector
      });
      const MarkdownThinkingWebComponent = createCustomElement(MarkdownThinkingShowComponent, {
        injector: injector
      });



      // 注册Bubble相关webcomponent
      customElements.define('mc-ng-bubble-basic', BubbleWebComponent);
      customElements.define('mc-ng-bubble-loading', LoadingBubbleWebComponent);
      customElements.define('mc-ng-bubble-align', AlignBubbleWebComponent);
      customElements.define('mc-ng-bubble-variant', VariantBubbleWebComponent);
      customElements.define('mc-ng-bubble-avatar-config', ConfigBubbleWebComponent);
      customElements.define('mc-ng-bubble-variant-avatar', VariantAvatarWebComponent);
      customElements.define('mc-ng-bubble-avatar-plus', AvatarPlusBubbleWebComponent);
      customElements.define('mc-ng-bubble-custom', CustomBubbleWebComponent);
      
      // 注册Input相关webcomponent
      customElements.define('mc-ng-input-button', ButtonInputWebComponent);
      customElements.define('mc-ng-input-basic', BasicInputWebComponent);
      customElements.define('mc-ng-input-auto-size', AutoSizeInputWebComponent);
      customElements.define('mc-ng-input-auto', AutoInputWebComponent);
      customElements.define('mc-ng-input-suffix', SuffixInputWebComponent);
      customElements.define('mc-ng-input-slot', SlotInputWebComponent);
      customElements.define('mc-ng-input-submit', SubmitInputWebComponent);

      customElements.define('mc-ng-markdown-basic', MarkdownBasicWebComponent);
      customElements.define('mc-ng-markdown-code-operator', MarkdownCodeOperatorWebComponent);
      customElements.define('mc-ng-markdown-emoje', MarkdownEmojeWebComponent);
      customElements.define('mc-ng-markdown-mermaid', MarkdownMermaidWebComponent);
      customElements.define('mc-ng-markdown-typing', MarkdownTypingWebComponent);
      customElements.define('mc-ng-markdown-thinking', MarkdownThinkingWebComponent);
    } catch (error) {
      console.error('创建WebComponent时出错:', error);
    }
  })
  .catch((err) => {
    console.error('Error creating web component:', err);
  });
