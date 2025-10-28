
1、将demo目录下的组件封装一层组件，生成在show目录下。
例如：
demo目录下有一个组件`MarkdownCardDemo/markdown-basic`，

markdown-basic组件的标签名是`markdown-baisc-demo`

则在show目录下生成一个组件`MarkdownCard/markdown-basic-show.component.ts`，

markdown-basic-show.component.ts中的内容示例：
```ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownBasicDemoComponent } from '../../demo/MarkdownCardDemo/markdown-basic/markdown-basic.component';

@Component({
    selector: 'markdown-basic-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownBasicDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-basic-demo></markdown-basic-demo>
    </mc-angular-demo>
    `
})
export class MarkdownBasicShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
```

其中整体结构不变，MarkdownBasicDemoComponent修改成新的名称，<markdown-basic-demo></markdown-basic-demo>修改成新的demo组件的标签名，urls也需要修改成demo的路径如`/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.html`。

2、将生成的show组件注册成webcomponent
在`packages\components-ng\projects\components-ng\src\web-components.ts`文件下，添加注册代码示例
```ts
      const MarkdownBasicWebComponent = createCustomElement(MarkdownBasicShowComponent, {
        injector: injector
      });

      customElements.define('mc-ng-markdown-basic', MarkdownBasicWebComponent);
```

