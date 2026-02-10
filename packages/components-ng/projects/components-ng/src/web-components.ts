import { enableProdMode, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AttachmentBasicShowComponent } from '../../demo-app/src/app/show/Attachment/attachment-basic-show.component';
import { AttachmentDragShowComponent } from '../../demo-app/src/app/show/Attachment/attachment-drag-show.component';
import { AttachmentValidShowComponent } from '../../demo-app/src/app/show/Attachment/attachment-valid-show.component';
import { AlignBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/align-demo-show.component';
import { AvatarConfigBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/avatar-config-demo-show.component';
import { AvatarPlusBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/avatar-plus-demo-show.component';
import { BasicBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/basic-demo-show.component';
import { CustomActionDemoShowComponent } from '../../demo-app/src/app/show/Bubble/custom-action-demo-show.component';
import { CustomBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/custom-demo-show.component';
import { LoadingBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/loading-demo-show.component';
import { VariantAvatarBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/variant-avatar-demo-show.component';
import { VariantBubbleShowComponent } from '../../demo-app/src/app/show/Bubble/variant-demo-show.component';
import { AutoInputShowComponent } from '../../demo-app/src/app/show/Input/auto-demo-show.component';
import { AutoSizeInputShowComponent } from '../../demo-app/src/app/show/Input/auto-size-demo-show.component';
// 导入Input相关的show组件
import { BasicInputShowComponent } from '../../demo-app/src/app/show/Input/basic-demo-show.component';
import { ButtonInputShowComponent } from '../../demo-app/src/app/show/Input/button-demo-show.component';
import { SlotInputShowComponent } from '../../demo-app/src/app/show/Input/slot-demo-show.component';
import { SubmitInputShowComponent } from '../../demo-app/src/app/show/Input/submit-demo-show.component';
import { SuffixInputShowComponent } from '../../demo-app/src/app/show/Input/suffix-demo-show.component';
import { AlignDemoShowComponent } from '../../demo-app/src/app/show/Introduction/align-demo-show.component';
// 导入Introduction相关的show组件
import { BasicDemoShowComponent } from '../../demo-app/src/app/show/Introduction/basic-demo-show.component';
import { DescriptionDemoShowComponent } from '../../demo-app/src/app/show/Introduction/description-demo-show.component';
import { SlotDemoShowComponent } from '../../demo-app/src/app/show/Introduction/slot-demo-show.component';
// 添加List相关的show组件
import { BasicListShowComponent } from '../../demo-app/src/app/show/List/list-basic-show.component';
import { CustomListShowComponent } from '../../demo-app/src/app/show/List/list-custom-show.component';
import { DisplayListShowComponent } from '../../demo-app/src/app/show/List/list-display-show.component';
import { LazyloadListShowComponent } from '../../demo-app/src/app/show/List/list-lazyload-show.component';
import { ShortcutListShowComponent } from '../../demo-app/src/app/show/List/list-shortcut-show.component';

// 导入MarkdownCard相关的show组件
import { MarkdownBasicShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-basic-show.component';
import { MarkdownCodeOperatorShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-code-operator-show.component';
import { MarkdownContentShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-content-show.component';
import { MarkdownEmojeShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-emoje-show.component';
import { MarkdownHeaderShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-header-show.component';
import { MarkdownMathShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-math-show.component';
import { MarkdownMermaidShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-mermaid-show.component';
import { MarkdownPlantumlShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-plantuml-show.component';
import { MarkdownThemeShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-theme-show.component';
import { MarkdownThinkingShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-thinking-show.component';
import { MarkdownTypingShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-typing-show.component';
import { MarkdownXssShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-xss-show.component';

// 导入Mention相关的show组件
import { BasicMentionComponent } from '../../demo-app/src/app/show/Mention/basic-show.component';
import { CustomStyleMentionComponent } from '../../demo-app/src/app/show/Mention/custom-style-show.component';

// 正确定义WebComponentsModule模块
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BasicBubbleShowComponent,
    AlignBubbleShowComponent,
    LoadingBubbleShowComponent,
    VariantBubbleShowComponent,
    AvatarConfigBubbleShowComponent,
    VariantAvatarBubbleShowComponent,
    AvatarPlusBubbleShowComponent,
    CustomBubbleShowComponent,
    CustomActionDemoShowComponent,
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
    MarkdownContentShowComponent,
    MarkdownMathShowComponent,
    MarkdownPlantumlShowComponent,
    MarkdownThemeShowComponent,
    MarkdownHeaderShowComponent,
    MarkdownXssShowComponent,
    // 添加Mention相关的show组件
    BasicMentionComponent,
    CustomStyleMentionComponent,
    // 添加Introduction相关的show组件
    BasicDemoShowComponent,
    DescriptionDemoShowComponent,
    SlotDemoShowComponent,
    AlignDemoShowComponent,
    // 添加List相关的show组件
    BasicListShowComponent,
    DisplayListShowComponent,
    CustomListShowComponent,
    ShortcutListShowComponent,
    LazyloadListShowComponent,
  ],
  providers: [],
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
      const AttachmentBasicWebComponent = createCustomElement(
        AttachmentBasicShowComponent,
        {
          injector: injector,
        },
      );
      const AttachmentDragWebComponent = createCustomElement(
        AttachmentDragShowComponent,
        {
          injector: injector,
        },
      );
      const AttachmentValidWebComponent = createCustomElement(
        AttachmentValidShowComponent,
        {
          injector: injector,
        },
      );
      customElements.define(
        'mc-ng-attachment-basic',
        AttachmentBasicWebComponent,
      );
      customElements.define(
        'mc-ng-attachment-drag',
        AttachmentDragWebComponent,
      );
      customElements.define(
        'mc-ng-attachment-valid',
        AttachmentValidWebComponent,
      );
      // 将Bubble组件转换为webcomponent
      const BubbleWebComponent = createCustomElement(BasicBubbleShowComponent, {
        injector: injector,
      });
      const LoadingBubbleWebComponent = createCustomElement(
        LoadingBubbleShowComponent,
        {
          injector: injector,
        },
      );
      const VariantBubbleWebComponent = createCustomElement(
        VariantBubbleShowComponent,
        {
          injector: injector,
        },
      );
      const ConfigBubbleWebComponent = createCustomElement(
        AvatarConfigBubbleShowComponent,
        {
          injector: injector,
        },
      );
      const AlignBubbleWebComponent = createCustomElement(
        AlignBubbleShowComponent,
        {
          injector: injector,
        },
      );
      const VariantAvatarWebComponent = createCustomElement(
        VariantAvatarBubbleShowComponent,
        {
          injector: injector,
        },
      );

      // 将新创建的Bubble组件转换为webcomponent
      const AvatarPlusBubbleWebComponent = createCustomElement(
        AvatarPlusBubbleShowComponent,
        {
          injector: injector,
        },
      );

      // 将MarkdownCard相关组件转换为webcomponent
      const MarkdownContentWebComponent = createCustomElement(
        MarkdownContentShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownMathWebComponent = createCustomElement(
        MarkdownMathShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownPlantumlWebComponent = createCustomElement(
        MarkdownPlantumlShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownThemeWebComponent = createCustomElement(
        MarkdownThemeShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownHeaderWebComponent = createCustomElement(
        MarkdownHeaderShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownXssWebComponent = createCustomElement(
        MarkdownXssShowComponent,
        {
          injector: injector,
        },
      );

      customElements.define(
        'mc-ng-markdown-content',
        MarkdownContentWebComponent,
      );
      customElements.define('mc-ng-markdown-math', MarkdownMathWebComponent);
      customElements.define(
        'mc-ng-markdown-plantuml',
        MarkdownPlantumlWebComponent,
      );
      customElements.define('mc-ng-markdown-theme', MarkdownThemeWebComponent);
      customElements.define(
        'mc-ng-markdown-header',
        MarkdownHeaderWebComponent,
      );
      customElements.define('mc-ng-markdown-xss', MarkdownXssWebComponent);
      const CustomBubbleWebComponent = createCustomElement(
        CustomBubbleShowComponent,
        {
          injector: injector,
        },
      );
      const CustomActionBubbleWebComponent = createCustomElement(
        CustomActionDemoShowComponent,
        {
          injector: injector,
        },
      );

      // 将Input组件转换为webcomponent
      const BasicInputWebComponent = createCustomElement(
        BasicInputShowComponent,
        {
          injector: injector,
        },
      );
      const AutoInputWebComponent = createCustomElement(
        AutoInputShowComponent,
        {
          injector: injector,
        },
      );
      const SuffixInputWebComponent = createCustomElement(
        SuffixInputShowComponent,
        {
          injector: injector,
        },
      );
      const SlotInputWebComponent = createCustomElement(
        SlotInputShowComponent,
        {
          injector: injector,
        },
      );
      const SubmitInputWebComponent = createCustomElement(
        SubmitInputShowComponent,
        {
          injector: injector,
        },
      );
      const ButtonInputWebComponent = createCustomElement(
        ButtonInputShowComponent,
        {
          injector: injector,
        },
      );
      const AutoSizeInputWebComponent = createCustomElement(
        AutoSizeInputShowComponent,
        {
          injector: injector,
        },
      );

      // 将MarkdownCard组件转换为webcomponent
      const MarkdownCodeOperatorWebComponent = createCustomElement(
        MarkdownCodeOperatorShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownEmojeWebComponent = createCustomElement(
        MarkdownEmojeShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownMermaidWebComponent = createCustomElement(
        MarkdownMermaidShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownTypingWebComponent = createCustomElement(
        MarkdownTypingShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownBasicWebComponent = createCustomElement(
        MarkdownBasicShowComponent,
        {
          injector: injector,
        },
      );
      const MarkdownThinkingWebComponent = createCustomElement(
        MarkdownThinkingShowComponent,
        {
          injector: injector,
        },
      );
      // 将Introduction组件转换为webcomponent
      const BasicIntroductionWebComponent = createCustomElement(
        BasicDemoShowComponent,
        {
          injector: injector,
        },
      );
      const DescriptionIntroductionWebComponent = createCustomElement(
        DescriptionDemoShowComponent,
        {
          injector: injector,
        },
      );
      const SlotIntroductionWebComponent = createCustomElement(
        SlotDemoShowComponent,
        {
          injector: injector,
        },
      );
      const AlignIntroductionWebComponent = createCustomElement(
        AlignDemoShowComponent,
        {
          injector: injector,
        },
      );

      // 将List组件转换为webcomponent
      const BasicListWebComponent = createCustomElement(
        BasicListShowComponent,
        {
          injector: injector,
        },
      );
      const DisplayListWebComponent = createCustomElement(
        DisplayListShowComponent,
        {
          injector: injector,
        },
      );
      const CustomListWebComponent = createCustomElement(
        CustomListShowComponent,
        {
          injector: injector,
        },
      );
      const ShortcutListWebComponent = createCustomElement(
        ShortcutListShowComponent,
        {
          injector: injector,
        },
      );
      const LazyloadListWebComponent = createCustomElement(
        LazyloadListShowComponent,
        {
          injector: injector,
        },
      );

      // 注册Bubble相关webcomponent
      customElements.define('mc-ng-bubble-basic', BubbleWebComponent);
      customElements.define('mc-ng-bubble-loading', LoadingBubbleWebComponent);
      customElements.define('mc-ng-bubble-align', AlignBubbleWebComponent);
      customElements.define('mc-ng-bubble-variant', VariantBubbleWebComponent);
      customElements.define(
        'mc-ng-bubble-avatar-config',
        ConfigBubbleWebComponent,
      );
      customElements.define(
        'mc-ng-bubble-variant-avatar',
        VariantAvatarWebComponent,
      );
      customElements.define(
        'mc-ng-bubble-avatar-plus',
        AvatarPlusBubbleWebComponent,
      );
      customElements.define('mc-ng-bubble-custom', CustomBubbleWebComponent);
      customElements.define(
        'mc-ng-bubble-custom-action',
        CustomActionBubbleWebComponent,
      );

      // 注册Input相关webcomponent
      customElements.define('mc-ng-input-button', ButtonInputWebComponent);
      customElements.define('mc-ng-input-basic', BasicInputWebComponent);
      customElements.define('mc-ng-input-auto-size', AutoSizeInputWebComponent);
      customElements.define('mc-ng-input-auto', AutoInputWebComponent);
      customElements.define('mc-ng-input-suffix', SuffixInputWebComponent);
      customElements.define('mc-ng-input-slot', SlotInputWebComponent);
      customElements.define('mc-ng-input-submit', SubmitInputWebComponent);

      customElements.define('mc-ng-markdown-basic', MarkdownBasicWebComponent);
      customElements.define(
        'mc-ng-markdown-code-operator',
        MarkdownCodeOperatorWebComponent,
      );
      customElements.define('mc-ng-markdown-emoje', MarkdownEmojeWebComponent);
      customElements.define('mc-ng-markdown-mermaid', MarkdownMermaidWebComponent);
      customElements.define('mc-ng-markdown-typing', MarkdownTypingWebComponent);
      customElements.define('mc-ng-markdown-thinking', MarkdownThinkingWebComponent);
      
      // 将Mention组件转换为webcomponent
      const BasicMentionWebComponent = createCustomElement(BasicMentionComponent, {
        injector: injector
      });
      const CustomStyleMentionWebComponent = createCustomElement(CustomStyleMentionComponent, {
        injector: injector
      });
      
      // 注册Mention相关webcomponent
      customElements.define('mc-ng-mention-basic', BasicMentionWebComponent);
      customElements.define('mc-ng-mention-custom-style', CustomStyleMentionWebComponent);
      // 注册Introduction相关webcomponent
      customElements.define(
        'mc-ng-introduction-basic',
        BasicIntroductionWebComponent,
      );
      customElements.define(
        'mc-ng-introduction-description',
        DescriptionIntroductionWebComponent,
      );
      customElements.define(
        'mc-ng-introduction-slot',
        SlotIntroductionWebComponent,
      );
      customElements.define(
        'mc-ng-introduction-align',
        AlignIntroductionWebComponent,
      );
      // 注册List相关webcomponent
      customElements.define('mc-ng-list-basic', BasicListWebComponent);
      customElements.define('mc-ng-list-display', DisplayListWebComponent);
      customElements.define('mc-ng-list-custom', CustomListWebComponent);
      customElements.define('mc-ng-list-shortcut', ShortcutListWebComponent);
      customElements.define('mc-ng-list-lazyload', LazyloadListWebComponent);
    } catch (error) {
      console.error('创建WebComponent时出错:', error);
    }
  })
  .catch((err) => {
    console.error('Error creating web component:', err);
  });
