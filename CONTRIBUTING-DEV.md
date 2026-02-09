# MateChat 多框架组件开发指南

## 1. 项目概述

MateChat 是一个支持多框架（Vue 3 和 Angular）的 AI 组件库，采用 monorepo 架构进行统一管理，旨在提供跨框架一致的组件体验和开发效率。

## 2. 项目结构

### 2.1 核心目录结构

```
MateChat/
├── docs/                     # 文档站点
│   ├── components/           # Vue 组件文档
│   ├── components-ng/        # Angular 组件文档
│   ├── theme-default/        # 文档主题
│   └── use-guide/            # 使用指南
├── packages/                 # 组件库源码
│   ├── components/           # Vue 3 组件库
│   │   ├── Attachment/       # 附件组件
│   │   ├── Bubble/           # 气泡组件
│   │   ├── FileList/         # 文件列表组件
│   │   ├── Header/           # 头部组件
│   │   ├── Input/            # 输入框组件
│   │   └── ...               # 其他组件
│   └── components-ng/        # Angular 组件库
│       └── projects/
│           ├── components-ng/ # Angular 组件源码
│           │   └── src
│           │        ├── Base/                # 基础组件
│           │        ├── Bubble/              # 气泡组件
│           │        ├── Input/               # 输入框组件
│           │        ├── ...
│           │        └── components-common/   # 跨框架公共逻辑
│           └── demo-app/                     # Angular 示例应用
├── CONTRIBUTING.md           # 贡献指南
├── CONTRIBUTING-DEV.md       # 开发者文档
└── package.json              # 项目根配置
```

## 3. 开发环境搭建

### 3.1 系统要求

| 依赖项         | 版本要求                | 说明                   |
|--------------|---------------------|----------------------|
| Node.js      | >= 22.12.0          | 核心运行环境              |
| npm          | >= 10.9.0           | 包管理工具               |
| Angular CLI  | >= 20.3.9           | 仅 Angular 开发需要       |

### 3.2 安装依赖

```bash
# 安装项目依赖
pnpm install
```

## 4. Vue 组件开发

### 4.1 组件结构规范

每个 Vue 组件需遵循以下目录结构：

```
ComponentName/              # 组件名称（大驼峰）
├── components/             # 子组件目录（可选）
├── index.ts                # 组件入口文件
├── ComponentName.vue       # 主组件文件（大驼峰）
├── componentName-types.ts  # 类型定义文件（小驼峰 + types）
├── componentName.scss      # 样式文件（小驼峰）
└── *.ts                    # 辅助文件（如常量、工具函数等）
```

### 4.2 快速开始

#### 4.2.1 创建新组件

```bash
# 在 packages/components 目录下创建新组件
cd packages/components
mkdir NewComponent
```

#### 4.2.2 编写组件

1. 创建 `NewComponent.vue` 主组件文件，实现组件模板、逻辑和样式引用
2. 创建 `index.ts` 导出组件
3. 创建 `componentName-types.ts` 定义组件类型
4. 创建 `componentName.scss` 编写组件样式

#### 4.2.3 导出组件

在 `packages/components/index.ts` 中导出新组件：

```typescript
export { default as NewComponent } from "./NewComponent";
```

#### 4.2.4 本地开发

```bash
# 启动 Vue 文档站点，支持热更新
npm run docs:dev
```

## 5. Angular 组件开发

### 5.1 组件结构规范

每个 Angular 组件需遵循以下目录结构：

```
ComponentName/              # 组件名称（大驼峰）
├── index.ts                # 组件入口文件
├── componentName.component.ts # 组件类文件（小驼峰 + component）
├── componentName.component.html # 模板文件（小驼峰 + component）
├── componentName.component.scss # 样式文件（小驼峰 + component）
├── componentName.component.spec.ts # 测试文件（小驼峰 + component + spec）
├── componentName.module.ts # 组件模块文件（小驼峰 + module）
└── componentName-types.ts  # 类型定义文件（可选，小驼峰 + types）
```

### 5.2 快速开始

#### 5.2.1 常用开发命令

```bash
# 运行 Angular 示例应用，支持热更新，适用于组件开发初期
pnpm run demo:ng

# 启动文档站点，用于预览组件最终效果
pnpm run docs:dev
```

#### 5.2.2 创建新组件

```bash
# 进入 Angular 组件源码目录
cd packages/components-ng/projects/components-ng/src
mkdir NewComponent
```

#### 5.2.3 编写组件

1. 创建组件类文件 `componentName.component.ts`
2. 创建模板文件 `componentName.component.html`
3. 创建样式文件 `componentName.component.scss`
4. 创建模块文件 `componentName.module.ts`
5. 编写测试文件 `componentName.component.spec.ts`

#### 5.2.4 导出组件

在 `packages/components-ng/projects/components-ng/src/public-api.ts` 中导出新组件：

```typescript
export * from "./NewComponent";
```

## 6. 跨框架组件复用

为实现跨框架组件的高效复用，MateChat 设计了 `@matechat/common` 公共包，位于 `packages/components-ng/projects/components-ng/src/components-common/` 目录下，包含跨框架复用的公共逻辑、样式和类型定义。

### 6.1 组件样式复用

#### 6.1.1 样式设计原则

- 公共样式需保持框架无关性，避免使用 `ng-deep`、`v-deep`、`:host` 等框架特定语法
- 若需框架特定样式，需单独创建 `vue.scss` 或 `angular.scss` 进行适配
- 公共样式应具备通用性，避免包含组件特定的业务样式

#### 6.1.2 样式引用方式

**Vue 中使用公共样式：**

```scss
@import "@matechat/common/Bubble/common/bubble.scss";
```

**Angular 中使用公共样式：**

```scss
@import "../components-common/Bubble/common/bubble.scss";
```

### 6.2 组件逻辑复用

MateChat 跨框架组件采用「核心层 + 适配层」的分层设计模式：

- **Foundation 层（核心层）**：包含组件核心业务逻辑，如 UI 行为触发后的计算、分支判断等，不直接操作 DOM，所有 DOM 操作委托给 Adapter 层执行
- **Adapter 层（适配层）**：定义 Foundation 层所需的接口，负责组件 DOM 结构声明和所有 DOM 操作/更新逻辑，使用框架 API 实现状态管理和事件处理

#### 6.2.1 实现示例

Angular 组件继承 `BaseComponent` 基类，并传入对应的 Foundation 泛型约束，同时实现 Adapter 接口：

```typescript
@Component({
  selector: 'mc-bubble',
  standalone: true,
  imports: [CommonModule, BubbleLoadingComponent, AvatarComponent, TranslatePipe],
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent extends BaseComponent<BubbleFoundation> {
  // 组件输入属性
  @Input() content: string = '';
  @Input() loading: boolean = false;
  @Input() align: BubbleAlign = 'left';
  @Input() avatarPosition: AvatarPosition = 'side';
  @Input() variant: BubbleVariant = 'filled';
  @Input() avatarConfig?: BubbleAvatar;

  // 内容投影模板引用
  @ContentChild('avatar') avatarTemplate: TemplateRef<any> | null = null;
  @ContentChild('top') topTemplate: TemplateRef<any> | null = null;
  @ContentChild('loadingTpl') loadingTplTemplate: TemplateRef<any> | null = null;
  @ContentChild('bottom') bottomTemplate: TemplateRef<any> | null = null;
  
  // 内容投影检测
  @ContentChildren('ng-content') contentChildren: QueryList<any>;
  
  get ngContentProjected(): boolean {
    return this.contentChildren && this.contentChildren.length > 0;
  }
  
  constructor() { super(); }

  ngOnInit() {
    this.foundation = new BubbleFoundation(this.adapter);
    this.foundation.init();
  }

  override get adapter(): BubbleAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        content: this.content,
        loading: this.loading,
        align: this.align,
        avatarPosition: this.avatarPosition,
        variant: this.variant,
        avatarConfig: this.avatarConfig,
      }),
    };
  }

  // 计算属性
  get bubbleClasses(): string {
    return this.foundation.getBubbleClasses();
  }

  get isEmptyAvatar(): boolean {
    return this.foundation.getIsEmptyAvatar(this.avatarConfig);
  }
}
```

Vue中使用BubbleFoundation公共逻辑示例：
新建useBubbleFoundation.ts文件, 在vue组件中直接使用即可。
```ts
import { computed } from 'vue';
import { useFoundation, useDefaultAdapter } from '@matechat/common/Base/useFoundation';
import { BubbleFoundation, BubbleAdapter } from '@matechat/common/Bubble/foundation';
import { BubbleAvatar } from './bubble-types';

export interface UseBubbleFoundationOptions {
  props: any;
}

export function useBubbleFoundation({ props }: UseBubbleFoundationOptions) {
  // 创建适配器，将Vue组件的props和状态传递给Foundation
  const defaultAdapter = useDefaultAdapter();
  const adapter: BubbleAdapter = {
    ...defaultAdapter,
    getProps: () => props,
    getProp: (key: string) => props[key],
    getStates: () => ({}),
    getState: (key: string) => undefined,
    setState: (key: string, value: any) => {
      // Implementation of setState if needed
    },
  };

  // 使用useFoundation创建BubbleFoundation实例
  const { foundation } = useFoundation<BubbleFoundation>({
    adapter,
    foundationClass: BubbleFoundation,
  });

  // 计算气泡类名
  const bubbleClasses = computed(() => {
    return foundation.getBubbleClasses();
  });

  // 计算是否为空头像
  const isEmptyAvatar = computed(() => {
    return foundation.getIsEmptyAvatar(props.avatarConfig);
  });

  return {
    foundation,
    bubbleClasses,
    isEmptyAvatar,
  };
}

```


### 6.3 公共逻辑复用

公共逻辑包括 `interface`、`type`、`enum`、工具函数等 API 定义，统一存放在 `@matechat/common` 包中对应的组件目录下。

#### 6.3.1 使用示例

```typescript
// 引入公共工具函数
import MdParserUtils from "../components-common/MarkdownCard/common/parser";

// 使用公共工具函数
MdParserUtils.clearElementChildren(existingElement);
```

## 7. 文档编写

### 7.1 Vue 组件文档

#### 7.1.1 创建文档文件

在 `docs/components/{component-name}/` 目录下创建以下文件：

- `api.md` - 组件 API 文档，包括属性、事件、插槽等
- `demo.md` - 组件示例代码，展示组件的各种用法

#### 7.1.2 文档格式

遵循 VitePress 文档格式，使用 Markdown 编写，支持代码高亮和组件演示。

### 7.2 Angular 组件文档

#### 7.2.1 创建文档文件

在 `docs/components-ng/{component-name}/` 目录下创建以下文件：

- `api.md` - 组件 API 文档
- `demo.md` - 组件示例代码

#### 7.2.2 创建 Demo 组件

1. 在 `packages/components-ng/projects/demo-app/src/app/demo/` 目录下创建 Demo 目录，命名规则为 `{ComponentName}Demo`
2. 在 Demo 目录下创建具体演示组件，如 `markdown-basic`（基础用法）
3. 开发调试阶段，可在 `demo-app/src/app/app.html` 中引入该 Demo 组件，运行 `npm run demo:ng` 进行热更新调试

#### 7.2.3 生成 WebComponent

根据 `demo-prompt.md` 提示词生成 Demo 组件，并注册为 WebComponent，以便在文档中使用。

#### 7.2.4 在文档中使用 Demo

在 `demo.md` 中使用注册好的 WebComponent：

```markdown
### 基本用法
  
基本用法只需传入 content 属性即可。

<mc-ng-markdown-basic></mc-ng-markdown-basic>
```

#### 7.2.5 预览文档

```bash
# 启动文档站点
npm run docs:dev
```

## 8. 构建与测试

### 8.1 构建 Vue 组件

```bash
# 构建 Vue 组件库
npm run build:lib
```

### 8.2 构建 Angular 组件

```bash
# 构建 Angular 组件库
pnpm run build:ng
```

## 9. 常见问题与解决方案

### 9.1 跨框架迁移注意事项

| 问题描述 | 解决方案 |
|---------|---------|
| Vue 和 Angular 组件结构不一致 | 根据 Angular 组件规范调整子组件结构 |
| Vue 特殊指令（如 `v-if`、`v-for`） | 使用 Angular 对应语法替换（如 `*ngIf`、`*ngFor`） |
| Vue Watch 函数 | 使用 Angular `ngOnChanges` 生命周期钩子监听输入属性变化 |
| 样式语法差异 | 提取公共样式到 `@matechat/common`，并为各框架创建适配样式 |

### 9.2 迁移步骤

1. **DOM 结构迁移**：将 Vue render 函数转换为 Angular 模板语法，包括 DOM 结构、属性绑定和事件绑定
2. **样式与工具迁移**：提取 Vue 组件的公共样式和工具函数到 `@matechat/common`，Angular 组件直接引入使用
3. **组件状态迁移**：将 Vue 的 `ref`/`reactive` 状态替换为 Angular 的类属性
4. **生命周期迁移**：将 Vue 生命周期钩子转换为 Angular 对应生命周期
5. **API 定义迁移**：将 Vue 组件的 API 定义提取到 `@matechat/common`，Angular 组件保持一致的 API 定义

## 10. 最佳实践

1. 遵循组件单一职责原则，每个组件只负责一个功能
2. 优先使用公共样式和逻辑，减少跨框架重复代码
3. 保持组件 API 跨框架一致性，降低用户学习成本
4. 为组件编写完整的文档和测试用例
5. 遵循各框架的最佳实践和编码规范
6. 定期更新依赖，确保使用最新稳定版本

## 11. 贡献流程

1. Fork 仓库并创建特性分支
2. 开发组件或修复 bug
3. 编写测试用例和文档
4. 运行构建和测试命令确保代码质量
5. 提交 PR 并描述变更内容
6. 等待代码 review 和合并

通过遵循本开发指南，您可以高效地参与 MateChat 组件库的开发，确保跨框架组件的一致性和质量。