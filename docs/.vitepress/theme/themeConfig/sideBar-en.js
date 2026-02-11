export default {
  '/en/components/': [
    { text: 'Theme', link: '/en/components/theme' },
    {
      text: 'General',
      items: [{ text: 'Introduction', link: '/en/components/introduction' }],
    },
    {
      text: 'Layout',
      items: [
        { text: 'Header', link: '/en/components/header' },
        { text: 'Layout', link: '/en/components/layout' },
      ],
    },
    {
      text: 'Conversation',
      items: [{ text: 'Bubble', link: '/en/components/bubble' }],
    },
    {
      text: 'Input',
      items: [
        { text: 'Input', link: '/en/components/input' },
        { text: 'Prompt', link: '/en/components/prompt' },
        { text: 'Mention', link: '/en/components/mention' },
      ],
    },
    {
      text: 'Developing',
      items: [
        { text: 'MarkDown Card', link: '/components/markDownCard/demo' },
        { text: 'FileList', link: '/en/components/fileList' },
      ],
    },
  ],
  '/components-ng/': [
    {
      text: '通用',
      items: [
        { text: 'Introduction 介绍', link: '/components-ng/introduction/demo' },
        {
          text: 'List 列表',
          link: '/components-ng/list/demo',
          children: [
            {
              text: 'Introduction',
              link: '/components-ng/list/demo.md',
            },
            {
              text: 'Demos',
              link: '/components-ng/list/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/list/api.md',
            },
          ],
        },
      ],
    },
    {
      text: '布局',
      items: [
        {
          text: 'Header 头部',
          link: '/components-ng/header/demo',
          children: [
            {
              text: 'Introduction',
              link: '/components-ng/header/demo.md',
            },
            {
              text: 'Demos',
              link: '/components-ng/header/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/header/api.md',
            },
          ],
        },
      ],
    },
    {
      text: '会话',
      items: [
        {
          text: 'Bubble 气泡',
          link: '/components-ng/bubble/demo',
          children: [
            {
              text: 'Introduction',
              link: '/components-ng/bubble/demo.md',
            },
            {
              text: 'Demos',
              link: '/components-ng/bubble/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/bubble/api.md',
            },
          ],
        },
        {
          text: 'Toolbar 工具栏',
          link: '/components-ng/toolbar/demo',
          children: [
            {
              text: 'Introduction',
              link: '/components-ng/toolbar/demo.md',
            },
            {
              text: 'Demos',
              link: '/components-ng/toolbar/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/toolbar/api.md',
            },
          ],
        },
      ],
    },
    {
      text: '输入',
      items: [
        {
          text: 'Input 输入',
          link: '/components-ng/input/demo',
          children: [
            {
              text: 'Demos',
              link: '/components-ng/input/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/input/api.md',
            },
          ],
        },
        {
          text: 'Mention 快捷操作',
          link: '/components-ng/mention/demo',
          children: [
            {
              text: 'Demos',
              link: '/components-ng/mention/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/mention/api.md',
            },
          ],
        },
      ],
    },
    {
      text: '演进中',
      items: [
        {
          text: 'MarkDown 卡片',
          link: '/components-ng/markdownCard/demo',
          children: [
            {
              text: 'Demos',
              link: '/components-ng/markdownCard/demo.md',
            },
            {
              text: 'API Reference',
              link: '/components-ng/markdownCard/api.md',
            },
          ],
        },
        {
          text: 'Attachment 附件',
          link: '/components-ng/attachment/demo',
          children: [
            { text: 'Demos', link: '/components-ng/attachment/demo.md' },
            { text: 'API Reference', link: '/components-ng/attachment/api.md' },
          ],
        },
      ],
    },
  ],
  '/en/design/': [
    { text: 'Intro', link: '/en/design/intro' },
    {
      text: 'Basic',
      items: [
        { text: 'Color', link: '/en/design/color' },
        { text: 'Font', link: '/en/design/font' },
      ],
    },
  ],
  '/en/use-guide-ng/': [
    { text: '快速开始', link: '/use-guide-ng/introduction' },
  ],
  '/en/use-guide/': [
    { text: 'Start', link: '/en/use-guide/introduction' },
    { text: 'On-demand Import', link: '/use-guide/require' },
    { text: 'i18n', link: '/use-guide/i18n' },
    { text: 'Theming', link: '/use-guide/theme' },
    {
      text: 'Create an application using Cli',
      items: [
        { text: 'Quick start', link: '/use-guide/solution' },
        { text: 'Theme', link: '/use-guide/cli-theme' },
      ],
    },
    {
      text: 'Model Intergration',
      items: [
        { text: 'OpenAI', link: '/use-guide/model/openai' },
        { text: 'DeepSeek', link: '/use-guide/model/deepseek' },
        { text: 'Ohter', link: '/use-guide/model/other' },
      ],
    },
    {
      text: 'Other',
      items: [
        { text: 'How to Use', link: '/use-guide/access' },
        { text: 'Contributing', link: '/use-guide/contributing' },
        { text: 'FAQ', link: '/use-guide/faq' },
      ],
    },
  ],
  '/en/playground/': [{ text: 'Demo', link: '/en/playground/playground' }],
};
