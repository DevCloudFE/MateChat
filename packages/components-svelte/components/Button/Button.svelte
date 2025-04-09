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
    icon: null,
    suffix: null,
  };

  let iconSlotContainer;
  let expandSlotContainer;

  const btnClick = (e) => {
    if (disabled) return;
    onClick(e);
  };

  onMount(() => {
    if (slots.suffix && expandSlotContainer) {
      expandSlotContainer.appendChild(slots.suffix); 
    }
    if (slots.icon && iconSlotContainer) {
      iconSlotContainer.appendChild(slots.icon); 
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
    {#if slots.icon}
      <div class="icon-slot" bind:this={iconSlotContainer}></div>
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
  $button-gradient-bg: linear-gradient(
    90deg,
    #93d6f9,
    #abee88,
    #fdc68d,
    #fa9d8e,
    #f48ae1
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
      -webkit-filter: blur(4px);
      filter: blur(4px);
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
      background: $button-gradient-bg;
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
      background: $button-gradient-bg;
      filter: blur(4px);
      z-index: -1;
    }
  }

  .icon-slot {
    margin-right: 4px;
  }

  .mc-button--sm {
    height: map-get($button-size, sm);
    padding: 0 12px;
    font-size: 12px;
  }
  .mc-button--md {
    height: map-get($button-size, md);
    padding: 8px 16px;
    font-size: 14px;
  }
  .mc-button--lg {
    height: map-get($button-size, lg);
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
