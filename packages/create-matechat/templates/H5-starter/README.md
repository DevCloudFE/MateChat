# MateChat

- 子项目包名规则: @matechat/\*
- 包名: @matechat/H5-starter

## 依赖安装

可以在本子项目根目录(packages/H5-starter)下执行：

```bash
pnpm install
```

也可以在 MateChat 根目录下执行：

```bash
// 推荐执行一次, 可能本地项目之前用npm安装的依赖, 该指令会为根项目和所有子项目安装依赖
pnpm install
// 只会对H5-starter子项目安装依赖
pnpm install --filter H5-starter
// 为子项目安装指定包
pnpm add "package-name" --filter H5-starter
```

## 启动

在根项目根目录下执行：

```bash
pnpm run dev:H5-starter
```

或者在子项目 H5-starter 目录下执行：

```bash
pnpm run dev
```

## 目录结构

├── hooks 逻辑复用
│ ├── ...
│ └── index.ts
│
├── mock-data 模拟数据
│
├── router 路由
│ ├── ...
│ └── index.ts
│
├── store 全局状态管理库
│ ├── ...
│ └── index.ts
│
├── types 全局 ts 类型
│ ├── ...
│ └── index.ts
│
├── utils 工具方法
│ ├── ...
│ └── index.ts
│
├── view 页面模块
│ ├── appendix 附件
│ ├── audio 音频
│ ├── chat-model 对话模型
│ ├── chat-process 对话过程
│ ├── chat-setting 聊天设置
│ ├── guess-you-want 猜你想问
│ ├── header 头部
│ ├── history 对话历史
│ ├── input 输入框
│ ├── online-search 联网搜索
│ ├── welcome 欢迎页
│ └── chat-view.vue 对话模块
