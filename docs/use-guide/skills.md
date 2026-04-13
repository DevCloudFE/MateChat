# Skill: matechat-vue

`matechat-vue` 是 MateChat Vue 3 组件库的 Agent Skill，帮助开发者快速构建 AI 智能应用界面。通过自然语言描述，Agent Skill 将自动获取MateChat相关使用文档，完成开发任务。

## 安装 MateChat Skills

方式一：使用`skills`工具安装

CLI会列出支持的Agent列表，选择你需要安装到的Agent即可
```bash
npx skills add DevCloudFE/MateChat --skill matechat-vue
```

方式二：克隆仓库到本地，将 [matechat-vue](https://gitcode.com/DevCloudFE/MateChat/tree/dev/.trae/skills/matechat-vue) 技能的文件夹复制到你的Agent对应的skills目录下

## 安装和配置 MateChat

描述你的需求，例如：
- “帮我在项目中安装和配置MateChat”
- “参考MateChat快速开始指南，安装和配置MateChat组件库。”
- “参考MateChat 自定义主题文档，自定义MateChat主题样式”

<img src="/png/skill-install-matechat.png" />

## 使用 MateChat 组件

描述你的需求，例如：

- “如何使用 MateChat 的 Input 组件？”
- ”参考MateChat Input组件的Demo中的自定义发送按钮示例，实现自定义发送按钮的功能。”
- “参考MateChat Markdown组件API，配置深度思考效果”

Skill 会参考 MateChat 相关使用文档和Demo示例，生成对应的代码。

<img src="/png/skill-input.png" />

## 最佳实践：一句话生成AI智能助手

提示词: “参考MateChat快速开始指南，使用MateChat生成一个AI智能助手应用。”

优先推荐使用 [MateChat Cli](https://matechat.gitcode.com/use-guide/solution.html) 创建模板应用。
