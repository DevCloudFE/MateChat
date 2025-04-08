# Angular 适配组件生成提示词

以下是一个用于生成 Angular 适配组件的提示词模板。通过提供 Svelte 组件的相关信息，AI 将自动生成 Angular 适配组件代码。

## 提示词模板

请根据以下格式填写提示词：

```
我有一个 Svelte 组件，文件路径为 `{svelteComponentPath}`。该组件的 props 包括：
{propsList}

该组件的事件包括：
{eventsList}

该组件的插槽包括：
{slotsList}

请为该 Svelte 组件生成一个 Angular 适配组件，要求：
1. Angular 组件的 `@Input` 属性与 Svelte 组件的 props 保持一致。svelte组件的props就是组件中定义的export let 相关变量。
2. Angular 组件的 `@Output` 事件通过 `EventEmitter` 转发到 Svelte 组件。
3. Angular 组件的插槽通过 `@ViewChild` 获取模板内容，并通过 props 的 `slots` 属性传递给 Svelte 组件。
4. Angular 组件在 `ngAfterViewInit` 生命周期中初始化 Svelte 组件，并在 `ngOnDestroy` 生命周期中销毁 Svelte 组件。
5. Angular 组件的模板文件中包含用于插槽的容器。
6. 生成的 Angular 组件文件包括 `.ts`、`.html` 和 `.scss` 和 `.module.ts` 文件。
```

## 示例

以下是一个示例提示词：

```
我有一个 Svelte 组件，文件路径为 `@components-js/Button/Button.svelte`。该组件的 props 包括：
- label: 按钮文本，默认值为 "Default Label"
- icon: 按钮图标类名，默认值为空字符串
- size: 按钮大小，支持 "sm"、"md"、"lg"，默认值为 "md"
- loading: 是否显示加载状态，布尔值，默认值为 false
- disabled: 是否禁用按钮，布尔值，默认值为 false
- styleType: 按钮样式类型，默认值为 "border-gradient"
- shape: 按钮形状，支持 "capsule"、"round"、"circle"，默认值为 "capsule"
- width: 按钮宽度，默认值为空字符串

该组件的事件包括：
- onClick: 按钮点击事件

该组件的插槽包括：
- suffix: 按钮后缀插槽

请为该 Svelte 组件生成一个 Angular 适配组件，要求：
1. Angular 组件的 `@Input` 属性与 Svelte 组件的 props 保持一致。
2. Angular 组件的 `@Output` 事件通过 `EventEmitter` 转发到 Svelte 组件。
3. Angular 组件的插槽通过 `@ViewChild` 获取模板内容，并通过 props 的 `slots` 属性传递给 Svelte 组件。
4. Angular 组件在 `ngAfterViewInit` 生命周期中初始化 Svelte 组件，并在 `ngOnDestroy` 生命周期中销毁 Svelte 组件。
5. Angular 组件的模板文件中包含用于插槽的容器。
6. 生成的 Angular 组件文件包括 `.ts`、`.html` 和 `.module.ts` 文件。
7. 不需要scss文件，因为svelte组件中已经包含样式了
```

## button.svelte 组件示例
以下是svelte组件的示例：
```svelte
<script>
  import { onMount } from "svelte";

  export let label = "Default Label"; // 按钮文本
  export let icon = ""; // 按钮图标类名
  export let size = "md"; // 按钮大小，支持 sm、md、lg
  export let loading = false; // 是否显示加载状态
  export let disabled = false; // 是否禁用按钮
  export let styleType = "border-gradient"; // 按钮样式类型
  export let shape = "capsule"; // 按钮形状，支持 capsule、round、circle
  export let width = ""; // 按钮宽度
  export let onClick = (e) => {}; // 点击事件处理函数
  export let slots = {
    suffix: null,
  };

  let expandSlotContainer;

  const btnClick = (e) => {
    if (disabled) return;
    onClick(e);
  };

  onMount(() => {
    console.log("mouted", slots, expandSlotContainer);
    if (slots.suffix && expandSlotContainer) {
      expandSlotContainer.appendChild(slots.suffix); // 将传递的 DOM 节点挂载到插槽位置
    }
  });
</script>

<div class="mc-button-wrapper">
  <button
    class="mc-button {disabled
      ? 'disabled'
      : ''} button-{styleType} mc-button--{size} mc-button--{shape}"
    style={width ? `width: ${width};` : ""}
    on:click={btnClick}
  >
    {#if loading}
      <i class="loading-icon"></i>
    {/if}
    {#if icon}
      <i class="icon {icon}"></i>
    {/if}
    <slot>
      <span class="mc-button-content">{label}</span></slot
    >
    {#if slots.suffix}
      <div class="suffix-slot" bind:this={expandSlotContainer}></div>
    {/if}
  </button>
</div>

<style lang="scss">
  @import "@devui-design/icons/icomoon/devui-icon.css";
  @import "devui-theme/styles-var/devui-var.scss";

  $button-size: (
    sm: 28px,
    md: 32px,
    lg: 40px,
  );

  @each $size, $value in $button-size {
    .mc-button--#{$size} {
      height: $value;
    }
  }

  .mc-button-wrapper {
    position: relative;
    z-index: 0;
  }

  .mc-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: map-get($button-size, md);
    padding: 8px 16px;
    color: $devui-text;
    border: none;
    border-radius: 100px;
    white-space: nowrap;
    cursor: pointer;

    .icon {
      margin-right: 4px;
    }
  }

  .mc-button.disabled {
    background-color: $devui-disabled-bg;
    color: $devui-disabled-text;
    cursor: not-allowed;
  }

  .button-border-none {
    color: #fff;
    background-color: #191919;
  }

  .button-border-black {
    color: #191919;
    background-color: #fff;
    border: 1px solid #191919;
  }

  .button-border-blue {
    border: 1px solid #97c6fb;
    background-color: $devui-base-bg;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 100px;
      background: linear-gradient(90deg, #97c6fb, #97c6fb);
      -webkit-filter: blur(8px);
      filter: blur(8px);
      z-index: -1;
    }
  }

  .button-border-gradient {
    color: $devui-text;
    background-color: $devui-base-bg;
    &::after {
      content: "";
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: 100px;
      background: linear-gradient(
        90deg,
        #93d6f9,
        #abee88,
        #fdc68d,
        #fa9d8e,
        #f48ae1
      );
      z-index: -1;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 100px;
      background: linear-gradient(
        90deg,
        #93d6f9,
        #abee88,
        #fdc68d,
        #fa9d8e,
        #f48ae1
      );
      filter: blur(6px);
      z-index: -1;
    }
  }

  .mc-button--sm {
    height: 24px;
    padding: 0 12px;
    font-size: 12px;
  }
  .mc-button--md {
    height: map-get($button-size, md);
    padding: 8px 16px;
    font-size: 14px;
  }
  .mc-button--lg {
    height: 40px;
    padding: 12px 20px;
    font-size: 16px;
  }

  .mc-button--capsule {
    border-radius: 100px;
  }
  .mc-button--round {
    border-radius: 4px;
    &::after {
      border-radius: 4px;
    }
  }

  .mc-button--circle {
    border-radius: 50%;

    &.mc-button--sm {
      width: map-get($button-size, sm);
    }
    &.mc-button--md {
      width: map-get($button-size, md);
    }
    &.mc-button--lg {
      width: map-get($button-size, lg);
    }
  }
</style>

```

## 输出示例

以下是根据上述提示词生成的 Angular 适配组件代码：

### `button.component.ts`

```typescript
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import Button from '@components-js/Button/Button.svelte';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements AfterViewInit, OnDestroy {
  @Input() label = 'Default Label';
  @Input() icon = '';
  @Input() size = 'md';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() styleType = 'border-gradient';
  @Input() shape = 'capsule';
  @Input() width = '';
  @Input() suffixTemplate: TemplateRef<any>;

  @Output() btnClick = new EventEmitter<MouseEvent>();

  @ViewChild('buttonContent', { static: true }) buttonContent: ElementRef;
  @ViewChild('suffixContainer', { static: true }) suffixContainer: ElementRef;

  private nativeButton: Button;

  ngAfterViewInit(): void {
    this.nativeButton = new Button({
      target: this.buttonContent.nativeElement,
      props: {
        label: this.label,
        icon: this.icon,
        size: this.size,
        loading: this.loading,
        disabled: this.disabled,
        styleType: this.styleType,
        shape: this.shape,
        width: this.width,
        slots: {
          suffix: this.suffixContainer?.nativeElement || null,
        },
        onClick: (event: MouseEvent) => {
          this.btnClick.emit(event);
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.nativeButton) {
      this.nativeButton.$destroy();
    }
  }
}
```

### `button.component.html`

```html
<div #buttonContent></div>
<div #suffixContainer>
  <ng-container *ngIf="suffixTemplate">
    <ng-container *ngTemplateOutlet="suffixTemplate"></ng-container>
  </ng-container>
</div>
```

### `button.component.scss`

```scss
/* 样式文件保持空白 */
```