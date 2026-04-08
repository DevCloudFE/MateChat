---
name: matechat-vue
description: Provides comprehensive guidance for MateChat Vue 3 component library including AI chat/agent UI components, installation, API reference, and demo examples. Use when building AI chat interfaces with Vue 3, implementing conversation bubbles, input components, or any MateChat UI components.
---

## When to use this skill

**ALWAYS use this skill when the user mentions:**
- "MateChat", "MateChat Vue", "matechat-vue"
- Building AI chat interfaces with Vue 3
- Using chat UI components like Bubble, Input, Prompt, Layout, Markdown, etc.
- "MateChat components", "AI chat UI", "AI Agent UI"
- Requests to "implement a [component] with MateChat"
- Requests for MateChat component API or configuration
- Building conversational AI interfaces

## How to use this skill

This skill is organized to provide comprehensive guidance for MateChat Vue 3 components, with automatic documentation updates.

### 1. Identify the User's Need

- **Component Usage** → See Component Categories below
- **API Reference** → `references/components/<component>/api.md`
- **Demo Examples** → `references/components/<component>/demo.md`
- **Use Guide** → `references/use-guide/` (installation, configuration, on-demand import, themes, i18n, CLI, etc.)

### 2. Component Categories

**对话组件 (Conversation Components)**
- **Bubble** - 气泡组件，用于承载对话内容
  - API: `references/components/bubble/api.md`
  - Demo: `references/components/bubble/demo.md`

**输入组件 (Input Components)**
- **Input** - 输入组件，用于用户输入消息
  - API: `references/components/input/api.md`
  - Demo: `references/components/input/demo.md`
- **Textarea** - 文本域组件
  - API: `references/components/textarea/api.md`
  - Demo: `references/components/textarea/demo.md`
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
- **FileList** - 文件列表组件
  - API: `references/components/fileList/api.md`
  - Demo: `references/components/fileList/demo.md`

**展示组件 (Display Components)**
- **MarkdownCard** - Markdown卡片组件，用于渲染Markdown内容
  - API: `references/components/markDownCard/api.md`
  - Demo: `references/components/markDownCard/demo.md`
- **Introduction** - 介绍组件
  - API: `references/components/introduction/api.md`
  - Demo: `references/components/introduction/demo.md`

### 3. Use Guide Documentation

The `references/use-guide/` directory contains comprehensive guides for using MateChat:

**Getting Started (入门指南)**
- **introduction.md** - Introduction to MateChat quick start guide，include installation etc.

**Configuration (配置)**
- **theme.md** - Theme customization guide
- **require.md** - Requirements and dependencies, on-demand import guide
- **i18n.md** - Internationalization guide

**CLI Usage (CLI使用)**
- **solution.md** - Cli install and create a project with MateChat Cli
- **cli/multi-round-chat.md** - Multi-round chat with CLI
- **cli-theme.md** - CLI theme configuration

**Model Integration (模型集成)**
- **model/deepseek.md** - DeepSeek model integration
- **model/openai.md** - OpenAI model integration
- **model/other.md** - Other model integrations

**Other Resources (其他资源)**
- **access.md** - Access control
- **faq.md** - Frequently asked questions
- **contributing.md** - Contributing guide
- **changelog.md** - Change log

**To use guide documentation:**
1. Identify the topic from the user's request
2. Load the corresponding guide file from `references/use-guide/`
3. Follow the instructions and best practices in that guide

### 4. Installation

**Using npm**:

```bash
npm install @matechat/core
```

### 5. Basic Setup

**Full Import**:

```javascript
import { createApp } from 'vue'
import MateChat from '@matechat/core'
import App from './App.vue'

const app = createApp(App)
app.use(MateChat)
app.mount('#app')
```

**On-Demand Import**:

```javascript
import { McBubble, McInput } from '@matechat/core'
```

### 6. Quick Start Example

```vue
<template>
  <div class="chat-container">
    <McBubble 
      :content="message" 
      :avatarConfig="avatarConfig"
      align="left"
    />
    <McInput 
      :value="userInput"
      placeholder="Type your message..."
      @submit="handleSend"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { McBubble, McInput } from '@matechat/core'

const message = ref('Hello! How can I help you?')
const userInput = ref('')
const avatarConfig = {
  imgSrc: '/logo.svg',
  name: 'AI'
}

const handleSend = () => {
  console.log('Send message:', userInput.value)
  userInput.value = ''
}
</script>
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

This skill includes an automatic documentation update mechanism to keep component documentation synchronized with the latest MateChat release.

## Best Practices

1. **Use on-demand import**: Import only the components you need to reduce bundle size
2. **Use Composition API**: Prefer Composition API for better code organization
3. **Handle events properly**: Use proper event handlers for component interactions
4. **Customize themes**: Use theme variables for customization
5. **Follow design specs**: Follow MateChat design specifications
6. **Use TypeScript**: Leverage TypeScript for better type safety

## Component Selection Guide

**For building a chat interface:**
- Start with `Layout` for overall structure
- Use `Header` for navigation
- Use `Bubble` for messages
- Use `Input` or `Textarea` for user input
- Use `List` for conversation history

**For file handling:**
- Use `Attachment` for file upload
- Use `FileList` for displaying uploaded files

**For rich content:**
- Use `MarkdownCard` for rendering Markdown content
- Use `Mention` for @mentions in input

**For quick actions:**
- Use `Prompt` for quick prompt suggestions
- Use `Toolbar` for action buttons

## Resources

- **Official Documentation**: https://matechat.gitcode.com/use-guide/introduction.html
- **GitCode Repository**: https://gitcode.com/DevCloudFE/MateChat
- **NPM Package**: https://www.npmjs.com/package/@matechat/core

## Keywords

MateChat, matechat-vue, Vue 3, Vue3, AI chat, chat UI, Agent UI, conversation UI, bubble, input, prompt, layout, attachment, file list, markdown card, mention, toolbar, 对话组件, 聊天界面, 气泡, 输入框, 提示词, 布局, 附件, 文件列表, Markdown卡片
