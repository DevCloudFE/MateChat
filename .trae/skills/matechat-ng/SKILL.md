---
name: matechat-ng
description: Provides comprehensive guidance for MateChat Angular component library including AI chat/agent UI components, installation, API reference, and demo examples. Use when building AI chat interfaces with Angular, implementing conversation bubbles, input components, or any MateChat Angular UI components.
---

## When to use this skill

**ALWAYS use this skill when the user mentions:**
- "MateChat Angular", "MateChat NG", "matechat-ng", "@matechat/ng"
- Building AI chat interfaces with Angular
- Using Angular chat UI components like Bubble, Input, Prompt, Layout, Markdown, etc.
- "MateChat Angular components", "AI chat UI", "AI Agent UI"
- Requests to "implement a [component] with MateChat Angular"
- Requests for MateChat Angular component API or configuration
- Building conversational AI interfaces with Angular

## How to use this skill

This skill is organized to provide comprehensive guidance for MateChat Angular components, with automatic documentation updates.

### 1. Identify the User's Need

- **Component Usage** → See Component Categories below
- **API Reference** → `references/components/<component>/api.md`
- **Demo Examples** → `references/components/<component>/demo.md`
- **Use Guide** → `references/use-guide/` (installation, configuration, themes, etc.)

### 2. Component Categories

**对话组件 (Conversation Components)**
- **Bubble** - 气泡组件，用于承载对话内容
  - API: `references/components/bubble/api.md`
  - Demo: `references/components/bubble/demo.md`

**输入组件 (Input Components)**
- **Input** - 输入组件，用于用户输入消息
  - API: `references/components/input/api.md`
  - Demo: `references/components/input/demo.md`
- **Mention** - 提及组件，支持@提及功能
  - API: `references/components/mention/api.md`
  - Demo: `references/components/mention/demo.md`

**布局组件 (Layout Components)**
- **Layout** - 布局组件，提供整体页面布局
  - API: `references/components/layout/api.md`
  - Demo: `references/components/layout/demo.md`
- **Header** - 头部组件
  - API: `references/components/header/api.md`
  - Demo: `references/components/header/demo.md`

**功能组件 (Functional Components)**
- **Prompt** - 提示词组件，用于快捷提示
  - API: `references/components/prompt/api.md`
  - Demo: `references/components/prompt/demo.md`
- **List** - 列表组件，用于展示对话列表
  - API: `references/components/list/api.md`
  - Demo: `references/components/list/demo.md`
- **Toolbar** - 工具栏组件
  - API: `references/components/toolbar/api.md`
  - Demo: `references/components/toolbar/demo.md`

**文件组件 (File Components)**
- **Attachment** - 附件组件，用于文件上传
  - API: `references/components/attachment/api.md`
  - Demo: `references/components/attachment/demo.md`

**展示组件 (Display Components)**
- **MarkdownCard** - Markdown卡片组件，用于渲染Markdown内容
  - API: `references/components/markdownCard/api.md`
  - Demo: `references/components/markdownCard/demo.md`
- **Introduction** - 介绍组件
  - API: `references/components/introduction/api.md`
  - Demo: `references/components/introduction/demo.md`

### 3. Use Guide Documentation

The `references/use-guide/` directory contains comprehensive guides for using MateChat Angular:

**Getting Started (入门指南)**
- **introduction.md** - Introduction to MateChat Angular quick start guide, include installation etc.

**To use guide documentation:**
1. Identify the topic from the user's request
2. Load the corresponding guide file from `references/use-guide/`
3. Follow the instructions and best practices in that guide

### 4. Installation

**Using npm**:

```bash
npm install @matechat/ng
```

### 5. Basic Setup

**Import Module**:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BubbleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
```

### 6. Quick Start Example

```html
<mc-bubble [content]="'Hello, MateChat'" [avatarConfig]="{ name: 'matechat' }"></mc-bubble>
```

**Complete Chat Interface Example**:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule, InputModule, MarkdownCardModule } from '@matechat/ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BubbleModule, InputModule, MarkdownCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  messages: any[] = [];
  avatarConfig = {
    imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
  };
  modelAvatar = {
    imgSrc: 'https://matechat.gitcode.com/logo.svg',
  };

  onSubmit(event: any) {
    this.messages.push({
      from: 'user',
      content: event,
    });
    
    setTimeout(() => {
      this.messages.push({
        from: 'model',
        content: event,
      });
    }, 200);
  }
}
```

```html
<div class="chat-list">
  <ng-container *ngFor="let msg of messages">
    @if (msg.from === 'user') {
      <mc-bubble 
        class="user-bubble" 
        [align]="'right'" 
        [content]="msg.content" 
        [avatarConfig]="avatarConfig">
      </mc-bubble>
    } @else if (msg.from === 'model') {
      <mc-bubble 
        class="model-bubble" 
        [align]="'left'" 
        [avatarConfig]="modelAvatar">
        <mc-markdown-card [content]="msg.content"></mc-markdown-card>
      </mc-bubble>
    }
  </ng-container>
</div>
<div class="chat-footer">
  <mc-input (submit)="onSubmit($event)"></mc-input>
</div>
```

### 7. Theme Setup

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

ThemeServiceInit(
  {
    'galaxy-theme': galaxyTheme,
    'infinity-theme': infinityTheme,
  },
  'infinity-theme'
);

bootstrapApplication(AppComponent, appConfig);
```

## API Reference

All component API documentation is available in the `references/` directory, organized by component name:

- Each component has two files:
  - `api.md` - API documentation (props, events, slots, types)
  - `demo.md` - Demo examples and usage patterns

**To use API reference:**
1. Identify the component you need help with
2. Load the corresponding API file: `references/<component>/api.md`
3. Load the demo file for examples: `references/<component>/demo.md`
4. Follow the examples and adapt to your use case

## Automatic Documentation Updates

This skill includes an automatic documentation update mechanism to keep component documentation synchronized with the latest MateChat Angular release.

## Best Practices

1. **Use standalone components**: Angular 17+ standalone components are recommended
2. **Import modules properly**: Import only the modules you need from `@matechat/ng`
3. **Handle events properly**: Use proper event handlers for component interactions
4. **Customize themes**: Use devui-theme for theme customization
5. **Use TypeScript**: Leverage TypeScript for better type safety
6. **Follow Angular style guide**: Follow Angular official style guide

## Component Selection Guide

**For building a chat interface:**
- Start with `Layout` for overall structure
- Use `Header` for navigation
- Use `Bubble` for messages
- Use `Input` for user input
- Use `List` for conversation history

**For file handling:**
- Use `Attachment` for file upload

**For rich content:**
- Use `MarkdownCard` for rendering Markdown content
- Use `Mention` for @mentions in input

**For quick actions:**
- Use `Prompt` for quick prompt suggestions
- Use `Toolbar` for action buttons

## Resources

- **Official Documentation**: https://matechat.gitcode.com/
- **GitCode Repository**: https://gitcode.com/DevCloudFE/MateChat
- **NPM Package**: https://www.npmjs.com/package/@matechat/ng

## Keywords

MateChat, matechat-ng, MateChat Angular, Angular, AI chat, chat UI, Agent UI, conversation UI, bubble, input, prompt, layout, attachment, markdown card, mention, toolbar, 对话组件, 聊天界面, 气泡, 输入框, 提示词, 布局, 附件, Markdown卡片
