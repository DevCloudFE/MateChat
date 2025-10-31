export default {
  '/components/': [
    {
      text: '通用',
      items: [
        { text: 'Introduction 介绍', link: '/components/introduction/demo' },
        { text: 'List 列表', link: '/components/list/demo' },
      ],
    },
    {
      text: '布局',
      items: [
        { text: 'Header 头部', link: '/components/header/demo' },
      ],
    },
    {
      text: '会话',
      items: [{ text: 'Bubble 气泡', link: '/components/bubble/demo' }],
    },
    {
      text: '输入',
      items: [
        { text: 'Input 输入', link: '/components/input/demo' },
        { text: 'Prompt 提示', link: '/components/prompt/demo' },
        { text: 'Mention 快捷操作', link: '/components/mention/demo' },
      ],
    },
    {
      text: '演进中',
      items: [
        { text: 'Layout 布局', link: '/components/layout/demo' },
        { text: 'MarkDown 卡片', link: '/components/markDownCard/demo' },
        { text: 'FileList 文件列表', link: '/components/fileList/demo' },
      ],
    },
  ],
  '/design/': [
    { text: '介绍', link: '/design/intro' },
    {
      text: '基础',
      items: [
        { text: '色彩', link: '/design/color' },
        { text: '字体', link: '/design/font' },
      ],
    },
  ],
  '/use-guide/': [
    // { text: '更新日志', link: '/use-guide/changelog' },
    { text: '快速开始', link: '/use-guide/introduction' },
    { text: '按需引入', link: '/use-guide/require' },
    { text: '国际化', link: '/use-guide/i18n' },
    { text: '自定义主题', link: '/use-guide/theme' },
    {
      text: '通过Cli创建应用',
      items: [
        { text: '快速开始', link: '/use-guide/solution' },
        { text: '主题化', link: '/use-guide/cli-theme' },
        { text: '多轮对话&深度思考', link: '/use-guide/cli/multi-round-chat' },
      ],
    },
    {
      text: '模型对接',
      items: [
        { text: 'OpenAI', link: '/use-guide/model/openai' },
        { text: 'DeepSeek', link: '/use-guide/model/deepseek' },
        { text: '其他', link: '/use-guide/model/other' },
      ],
    },
    {
      text: '其他',
      items: [
        { text: '使用MateChat的多种方式', link: '/use-guide/access' },
        { text: '贡献指南', link: '/use-guide/contributing' },
        { text: 'FAQ', link: '/use-guide/faq' },
      ],
    },
  ],
  '/playground/': [{ text: '演示', link: '/playground/playground' }],
};
