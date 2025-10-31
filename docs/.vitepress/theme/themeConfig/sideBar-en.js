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
