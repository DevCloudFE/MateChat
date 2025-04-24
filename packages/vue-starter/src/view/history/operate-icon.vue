<template>
  <d-popover
    :is-open="isOpen"
    trigger="manually"
    :position="['bottom']"
    class="history-operate-menu"
  >
    <i
      ref="iconEl"
      :class="['icon-more-2', attrs.class]"
      @click="isOpen = !isOpen"
    ></i>
    <template #content>
      <div class="history-operate-menu-item" @click="modalVisible = true">
        删除
      </div>
    </template>
  </d-popover>
  <d-modal v-model="modalVisible" title="确认删除">
    <div>是否确认删除此条对话？</div>
    <template #footer>
      <d-modal-footer>
        <d-button variant="solid" @click="onConfirm">确认</d-button>
        <d-button @click="modalVisible = false">取消</d-button>
      </d-modal-footer>
    </template>
  </d-modal>
</template>

<script setup lang="ts">
const attrs = useAttrs();
const emits = defineEmits(["toggle-change", "delete"]);

const isOpen = ref(false);
const modalVisible = ref(false);
const iconEl = ref();

const onConfirm = () => {
  modalVisible.value = false;
  emits("delete");
};

watch(isOpen, (val) => {
  emits("toggle-change", val);
});

onMounted(() => {
  document.addEventListener("click", (e: Event) => {
    if (e.target === iconEl.value) {
      return;
    }
    isOpen.value = false;
  });
});

defineOptions({
  inheritAttrs: false,
});
</script>

<style lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.devui-popover__content.history-operate-menu {
  padding: 8px;
  color: $devui-text;
  background-color: $devui-base-bg;

  .history-operate-menu-item {
    width: 100%;
    height: 24px;
    line-height: 16px;
    padding: 4px;
    box-sizing: border-box;

    &:hover {
      color: $devui-list-item-hover-text;
      border-radius: $devui-border-radius;
      background-color: $devui-list-item-hover-bg;
      cursor: pointer;
    }
  }
}
</style>
