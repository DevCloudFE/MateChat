<template>
    <div ref="mcButton" :class="$attrs.class" class="mc-button-vue">
    </div>
    <div ref="slot">
        <slot name="suffix"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits, useSlots } from 'vue';
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
                    suffix: slots.suffix ? slot.value : null,
                },
                onClick: (event: MouseEvent) => {
                    emit('click', event);
                },
            },
        });
    }
});

onBeforeUnmount(() => {
    if (nativeComponent) {
        nativeComponent?.destroy();
        nativeComponent = null;
    }
});
</script>

<style scoped lang="scss"></style>