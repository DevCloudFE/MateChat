<template>
    <div ref="mcButton">
    </div>
    <div ref="slot">
        <slot name="expand"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import  Button  from '@components-js/Button/Button.svelte'; 

// 定义 Vue 组件的 props
const props = defineProps({
    content: {
        type: String,
        default: 'Default Content',
    },
    styles: {
        type: Object,
        default: () => ({
            color: 'black',
            fontSize: '16px',
        }),
    },
    label: {
        type: String,
        default: 'Default Label',
    },
});

// 定义 emit 事件
const emit = defineEmits(['click']);

const mcButton = ref<HTMLElement | null>(null);
const slot = ref<HTMLElement | null>(null);
let nativeComponent: Button | null = null;

onMounted(() => {
    if (mcButton.value) {
        // 创建 NativeComponent 实例并挂载到 ref 元素上
        nativeComponent = new Button({
            target: mcButton.value,
            props: {
                content: props.content,
                styles: props.styles,
                label: props.label,
                onClick: (event: MouseEvent) => {
                    emit('click', event); // 通过 Vue 的 emit 抛出事件
                },
            },
        });
    }
});

onBeforeUnmount(() => {
    // 销毁 NativeComponent 实例
    if (nativeComponent) {
        nativeComponent.destroy();
        nativeComponent = null;
    }
});
</script>

<style scoped lang="scss">
// ::v-deep {
//     @import '../../components-js/Button/button.style.scss';
// }
</style>