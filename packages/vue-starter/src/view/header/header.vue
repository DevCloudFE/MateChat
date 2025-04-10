<template>
  <McHeader :logoImg="'/logo.svg'" :title="'MateChat'">
    <template #operationArea>
      <div class="operations">
        <i class="icon-helping"></i>
      </div>
    </template>
  </McHeader>
</template>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.operations {
  i {
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: $devui-global-bg;
    }
  }
}
</style>
