import { enableProdMode, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Theme } from '@matechat/common/MarkdownCard/common/mdCard.types';
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
// 导入Header相关show组件
import { HeaderBasicShowComponent } from '../../demo-app/src/app/show/Header/header-baisc-show.component';
import { HeaderCustomOperationShowComponent } from '../../demo-app/src/app/show/Header/header-custom-operation-show.component';
import { HeaderLogoClickShowComponent } from '../../demo-app/src/app/show/Header/header-logo-click-show.component';
import { AutoInputShowComponent } from '../../demo-app/src/app/show/Input/auto-demo-show.component';
import { AutoSizeInputShowComponent } from '../../demo-app/src/app/show/Input/auto-size-demo-show.component';
// 导入Input相关的show组件
import { BasicInputShowComponent } from '../../demo-app/src/app/show/Input/basic-demo-show.component';
import { ButtonInputShowComponent } from '../../demo-app/src/app/show/Input/button-demo-show.component';
import { FormatContentInputShowComponent } from '../../demo-app/src/app/show/Input/format-content-demo-show.component';
import { FormatInputShowComponent } from '../../demo-app/src/app/show/Input/format-input-demo-show.component';
import { SlotInputShowComponent } from '../../demo-app/src/app/show/Input/slot-demo-show.component';
import { SubmitInputShowComponent } from '../../demo-app/src/app/show/Input/submit-demo-show.component';
import { SuffixInputShowComponent } from '../../demo-app/src/app/show/Input/suffix-demo-show.component';
import { ThemeTagShowComponent } from '../../demo-app/src/app/show/Input/theme-tag-demo-show.component';
import { AlignDemoShowComponent } from '../../demo-app/src/app/show/Introduction/align-demo-show.component';

// 导入Introduction相关的show组件
import { BasicDemoShowComponent } from '../../demo-app/src/app/show/Introduction/basic-demo-show.component';
import { DescriptionDemoShowComponent } from '../../demo-app/src/app/show/Introduction/description-demo-show.component';
import { SlotDemoShowComponent } from '../../demo-app/src/app/show/Introduction/slot-demo-show.component';
import { LayoutContentDemoShowComponent } from '../../demo-app/src/app/show/Layout/content-demo-show.component';
// 导入Layout相关的show组件
import { LayoutDemoShowComponent } from '../../demo-app/src/app/show/Layout/layout-demo-show.component';
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
// 添加Prompt相关的show组件
import { BasicPromptShowComponent } from '../../demo-app/src/app/show/Prompt/prompt-basic-show.component';
import { DataPromptShowComponent } from '../../demo-app/src/app/show/Prompt/prompt-data-show.component';
import { DirectionPromptShowComponent } from '../../demo-app/src/app/show/Prompt/prompt-direction-show.component';
import { IconPromptShowComponent } from '../../demo-app/src/app/show/Prompt/prompt-icon-show.component';
import { VariantPromptShowComponent } from '../../demo-app/src/app/show/Prompt/prompt-variant-show.component';
// 导入toolbar相关show组件
import { ToolbarBasicShowComponent } from '../../demo-app/src/app/show/Toolbar/toolbar-basic-show.component';
import { ToolbarSizeShowComponent } from '../../demo-app/src/app/show/Toolbar/toolbar-size-show.component';
import { ToolbarSlotShowComponent } from '../../demo-app/src/app/show/Toolbar/toolbar-slot-show.component';
import { ToolbarUseIconShowComponent } from '../../demo-app/src/app/show/Toolbar/toolbar-use-icon-show.component';

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
    // 添加 header 相关show组件
    HeaderBasicShowComponent,
    HeaderLogoClickShowComponent,
    HeaderCustomOperationShowComponent,
    // 添加 toolbar 相关show组件
    ToolbarBasicShowComponent,
    ToolbarSizeShowComponent,
    ToolbarSlotShowComponent,
    ToolbarUseIconShowComponent,
    // 添加Prompt相关的show组件
    BasicPromptShowComponent,
    DirectionPromptShowComponent,
    DataPromptShowComponent,
    VariantPromptShowComponent,
    IconPromptShowComponent,
    // 添加Layout相关的show组件
    LayoutDemoShowComponent,
    LayoutContentDemoShowComponent,
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
      // 定义需要注册的WebComponent映射，使用Map避免重复注册
      const webComponentsMap = new Map<string, any>([
        // Attachment组件
        ['mc-ng-attachment-basic', AttachmentBasicShowComponent],
        ['mc-ng-attachment-drag', AttachmentDragShowComponent],
        ['mc-ng-attachment-valid', AttachmentValidShowComponent],

        // Bubble组件
        ['mc-ng-bubble-basic', BasicBubbleShowComponent],
        ['mc-ng-bubble-loading', LoadingBubbleShowComponent],
        ['mc-ng-bubble-align', AlignBubbleShowComponent],
        ['mc-ng-bubble-variant', VariantBubbleShowComponent],
        ['mc-ng-bubble-avatar-config', AvatarConfigBubbleShowComponent],
        ['mc-ng-bubble-variant-avatar', VariantAvatarBubbleShowComponent],
        ['mc-ng-bubble-avatar-plus', AvatarPlusBubbleShowComponent],
        ['mc-ng-bubble-custom', CustomBubbleShowComponent],
        ['mc-ng-bubble-custom-action', CustomActionDemoShowComponent],

        // Input组件
        ['mc-ng-input-button', ButtonInputShowComponent],
        ['mc-ng-input-basic', BasicInputShowComponent],
        ['mc-ng-input-auto-size', AutoSizeInputShowComponent],
        ['mc-ng-input-auto', AutoInputShowComponent],
        ['mc-ng-input-suffix', SuffixInputShowComponent],
        ['mc-ng-input-slot', SlotInputShowComponent],
        ['mc-ng-input-submit', SubmitInputShowComponent],
        ['mc-ng-input-format-content', FormatContentInputShowComponent],
        ['mc-ng-input-format-input', FormatInputShowComponent],
        ['mc-ng-input-theme-tag', ThemeTagShowComponent],

        // Layout组件
        ['mc-ng-layout-demo', LayoutDemoShowComponent],
        ['mc-ng-layout-content-demo', LayoutContentDemoShowComponent],
        // MarkdownCard组件
        ['mc-ng-markdown-basic', MarkdownBasicShowComponent],
        ['mc-ng-markdown-code-operator', MarkdownCodeOperatorShowComponent],
        ['mc-ng-markdown-emoje', MarkdownEmojeShowComponent],
        ['mc-ng-markdown-mermaid', MarkdownMermaidShowComponent],
        ['mc-ng-markdown-typing', MarkdownTypingShowComponent],
        ['mc-ng-markdown-thinking', MarkdownThinkingShowComponent],
        ['mc-ng-markdown-content', MarkdownContentShowComponent],
        ['mc-ng-markdown-math', MarkdownMathShowComponent],
        ['mc-ng-markdown-plantuml', MarkdownPlantumlShowComponent],
        ['mc-ng-markdown-theme', MarkdownThemeShowComponent],
        ['mc-ng-markdown-header', MarkdownHeaderShowComponent],
        ['mc-ng-markdown-xss', MarkdownXssShowComponent],

        // Mention组件
        ['mc-ng-mention-basic', BasicMentionComponent],
        ['mc-ng-mention-custom-style', CustomStyleMentionComponent],

        // Introduction组件
        ['mc-ng-introduction-basic', BasicDemoShowComponent],
        ['mc-ng-introduction-description', DescriptionDemoShowComponent],
        ['mc-ng-introduction-slot', SlotDemoShowComponent],
        ['mc-ng-introduction-align', AlignDemoShowComponent],

        // List组件
        ['mc-ng-list-basic', BasicListShowComponent],
        ['mc-ng-list-display', DisplayListShowComponent],
        ['mc-ng-list-custom', CustomListShowComponent],
        ['mc-ng-list-shortcut', ShortcutListShowComponent],
        ['mc-ng-list-lazyload', LazyloadListShowComponent],
        // Prompt组件
        ['mc-ng-prompt-basic', BasicPromptShowComponent],
        ['mc-ng-prompt-direction', DirectionPromptShowComponent],
        ['mc-ng-prompt-data', DataPromptShowComponent],
        ['mc-ng-prompt-variant', VariantPromptShowComponent],
        ['mc-ng-prompt-icon', IconPromptShowComponent],

        // header组件
        ['mc-ng-header-basic', HeaderBasicShowComponent],
        ['mc-ng-header-logo-click', HeaderLogoClickShowComponent],
        ['mc-ng-header-custom-operation', HeaderCustomOperationShowComponent],

        // 注册 Toolbar相关webComponent
        ['mc-ng-toolbar-basic', ToolbarBasicShowComponent],
        ['mc-ng-toolbar-size', ToolbarSizeShowComponent],
        ['mc-ng-toolbar-slot', ToolbarSlotShowComponent],
        ['mc-ng-toolbar-use-icon', ToolbarUseIconShowComponent],
      ]);

      // 遍历Map并注册所有WebComponent
      webComponentsMap.forEach((component, tagName) => {
        // 检查是否已经注册过该组件
        if (!customElements.get(tagName)) {
          const customElement = createCustomElement(component, {
            injector: injector,
          });
          customElements.define(tagName, customElement);
        }
      });
    } catch (error) {
      console.error('创建WebComponent时出错:', error);
    }
  })
  .catch((err) => {
    console.error('Error creating web component:', err);
  });
