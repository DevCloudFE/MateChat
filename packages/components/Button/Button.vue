<template>
    <div ref="mcButton" :class="$attrs.class" class="mc-button-vue">
    </div>
    <div ref="slot">
        <slot name="suffix"></slot>
    </div>
    <div ref="iconSlot">
        <slot name="icon"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits, useSlots, watch } from 'vue';
import Button from '@components-js/Button/Button.svelte';

// 定义 Vue 组件的 props
const props = defineProps({
    styleType: {
        type: String,
    },
    label: {
        type: String,
        default: 'Default',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    shape: {
        type: String,
        default: 'capsule',
    },
    size: {
        type: String,
        default: 'md',
    },
    width: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['click']);

const mcButton = ref<HTMLElement | null>(null);
const slot = ref<HTMLElement | null>(null);
const iconSlot = ref<HTMLElement | null>(null);
let nativeComponent: Button | null = null;
const slots = useSlots();

onMounted(() => {
    if (mcButton.value) {
        nativeComponent = new Button({
            target: mcButton.value,
            props: {
                label: props.label,
                disabled: props.disabled,
                shape: props.shape,
                size: props.size,
                width: props.width,
                styleType: props.styleType,
                slots: {
                    icon: slots.icon ? iconSlot.value : null,
                    suffix: slots.suffix ? slot.value : null,
                },
                onClick: (event: MouseEvent) => {
                    emit('click', event);
                },
            },
        });
    }
});

// 监听 props 的变化并更新 Svelte 组件
watch(
    () => props,
    (newProps) => {
        if (nativeComponent) {
            nativeComponent.$set({
                label: newProps.label,
                disabled: newProps.disabled,
                shape: newProps.shape,
                size: newProps.size,
                width: newProps.width,
                slots: {
                    icon: slots.icon ? iconSlot.value : null,
                    suffix: slots.suffix ? slot.value : null,
                },
            });
        }
    },
    { deep: true } // 深度监听
);

onBeforeUnmount(() => {
    if (nativeComponent) {
        nativeComponent?.destroy();
        nativeComponent = null;
    }
});
</script>

<style scoped lang="scss"></style>