---
name: ng-demo-creator
description: 自动为 MateChat 的 Angular 组件生成 demo 展示组件，并将其注册为 WebComponent
---

# ng-demo-creator 技能

## 功能说明

此技能用于自动为 MateChat 的 Angular 组件生成 demo 展示组件，并将其注册为 WebComponent，简化组件演示和集成流程。

### 主要功能

1. **扫描组件并生成demo组件**：递归扫描指定目录下的 Angular 组件，根据组件元数据和用户需求自动生成对应的 demo 组件
2. **生成 show 组件**：为每个 demo 组件生成对应的 show 组件，包含完整的导入语句、组件封装结构和自动构建的 URLs 路径
3. **注册 WebComponent**：自动将生成的 show 组件注册到 web-components.ts 文件中，确保组件可在非 Angular 环境中使用

## 使用方法

### 工作路径

- **ng组件读取路径**： 指定要读取的angular组件的路径，例如：`packages/components-ng/projects/components-ng/src`
- **demo路径**： 指定要生成 demo 组件的组件路径，例如：`packages/components-ng/projects/demo-app/src/app/demo`
- **show路径**： 指定要生成 show 组件的目录路径，例如：`packages/components-ng/projects/demo-app/src/app/show`
- **web-components注册路径**： 指定要注册 web-components.ts 文件的路径，例如：`packages/components-ng/projects/components-ng/src/web-components.ts`

## 工作原理

1. **扫描 ng 组件**：递归扫描指定的 Angular 组件目录下的所有 `.component.ts` 文件，获取组件元数据
2. **生成 demo 组件**：递归扫描 demo 目录下的所有 `.component.ts` 文件，识别组件结构和依赖。根据用户需求，生成对应的 demo 组件。
3. **生成 show 组件**：为每个 demo 组件生成对应的 show 组件，包含：
   - 从 demo 组件中提取的所有必要导入语句
   - 标准的组件封装结构，集成 AngularDemoComponent
   - 自动构建的源代码 URLs 路径，支持 HTML 和 TS 文件
4. **更新 web-components.ts**：将生成的 show 组件按照命名规则注册为 WebComponent，使用 Map 结构避免重复注册

## 示例

### 输入输出示例

#### 输入
帮我生成一个 MarkdownCard 组件的 demo，用于展示 MarkdownCard 组件的基本用法

#### 输出：demo 组件

**路径**：`demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.ts`

**内容**：
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule } from '@matechat/ng'; // demo组件使用@matechat/ng引入ng组件

@Component({
    selector: 'markdown-basic-demo',
    standalone: true,
    imports: [CommonModule, MarkdownCardModule],
    template: `<mc-markdown-card [content]="'# Hello World'" ></mc-markdown-card>`
})
export class MarkdownBasicDemoComponent {}
```

#### 输出：生成的 show 组件

**路径**：`show/MarkdownCard/markdown-basic-show.component.ts`

**内容**：
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownBasicDemoComponent } from '../../../demo/MarkdownCardDemo/markdown-basic/markdown-basic.component'; // show组件使用相对路径引入demo组件

@Component({
    selector: 'markdown-basic-show',
    standalone: true,
    imports: [CommonModule, MarkdownModule, AngularDemoComponent, MarkdownBasicDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-basic-demo></markdown-basic-demo>
    </mc-angular-demo>
    `
})
export class MarkdownBasicShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.ts' },
        { type: 'SCSS', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.scss' }, // 可选，demo组件有scss样式才添加
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
```

#### 输出：更新的 web-components.ts

**路径**：`packages/components-ng/projects/components-ng/src/web-components.ts`

**新增内容**：
```ts
import { MarkdownBasicShowComponent } from '../../demo-app/src/app/show/MarkdownCard/markdown-basic-show.component';

// 在 WebComponentsModule 的 imports 数组中添加 MarkdownBasicShowComponent
@NgModule({
    imports: [MarkdownBasicShowComponent]
})

// 定义需要注册的WebComponent映射，使用Map避免重复注册
const webComponentsMap = new Map<string, any>([
    // MarkdownCard组件
    ['mc-ng-markdown-basic', MarkdownBasicShowComponent],
]);
```

## 技术细节

### 命名规则

- **Show 组件类名**：`{DemoComponentName}ShowComponent`（例如：`MarkdownBasicDemoComponent` → `MarkdownBasicShowComponent`）
- **Show 组件选择器**：`{demo-component-name}-show`（例如：`markdown-basic-demo` → `markdown-basic-show`）
- **WebComponent 名称**：`mc-ng-{demo-component-name}`（例如：`markdown-basic` → `mc-ng-markdown-basic`）

### 目录结构

- **输入**：`demo/{ComponentName}Demo/{demo-component-name}/`
- **输出**：`show/{ComponentName}/{demo-component-name}-show.component.ts`

### 依赖处理

- 自动从 demo 组件中提取所有导入语句，包括 `@matechat/ng` 模块
- 确保 AngularDemoComponent 和 BaseShowComponent 被正确导入
- 保持与 demo 组件相同的模块依赖结构

### 源码路径构建

- 自动构建源码文件的 URLs 路径，支持 HTML 和 TS 文件
- 路径格式：`/demo/{ComponentName}Demo/{demo-component-name}/{demo-component-name}.component.{html|ts}`

## 注意事项

1. **组件格式要求**：确保所有 demo 组件使用 `standalone: true` 格式
2. **文件存在性**：确保 web-components.ts 文件存在且格式正确
3. **路径正确性**：确保指定的目录路径存在且符合项目结构
4. **备份建议**：执行脚本前建议备份相关文件，特别是 web-components.ts
5. **依赖完整性**：确保项目中已安装所有必要的依赖包

## 故障排除

### 常见问题

1. **找不到 demo 组件**
   - 检查 `--demo-dir` 参数是否正确
   - 确认 demo 目录下存在 `.component.ts` 文件

2. **生成的组件路径错误**
   - 检查项目目录结构是否符合预期格式
   - 确认 `--show-dir` 参数指向正确的输出目录

3. **WebComponent 注册失败**
   - 检查 web-components.ts 文件格式是否正确
   - 确认文件具有正确的写入权限

4. **依赖解析错误**
   - 检查 demo 组件中的导入语句是否正确
   - 确认所有依赖模块都已安装

### 解决方法

- **参数验证**：使用 `--help` 查看完整的命令参数说明
- **路径检查**：使用绝对路径而非相对路径，确保路径准确性
- **日志查看**：详细查看脚本执行输出的错误信息
- **权限检查**：确保对输出目录和文件具有写入权限
- **依赖安装**：执行 `npm install` 确保所有依赖都已正确安装

## 最佳实践

1. **增量更新**：在添加新的 demo 组件后运行此工具，而非每次都重新生成所有组件
2. **代码规范**：遵循项目的代码风格和命名规范，确保生成的组件与现有代码一致
3. **测试验证**：生成组件后，运行项目测试确保组件能正常工作
4. **版本控制**：将生成的组件纳入版本控制，便于追踪变更

## 限制

1. **仅支持 standalone 组件**：当前版本仅支持 `standalone: true` 格式的 Angular 组件
2. **目录结构要求**：要求严格遵循指定的目录结构格式
3. **文件命名规范**：要求 demo 组件文件遵循标准的命名规范
4. **依赖解析**：仅解析直接导入的依赖，不处理间接依赖
