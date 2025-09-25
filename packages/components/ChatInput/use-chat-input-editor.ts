/**
 * @description
 * 该文件导出一个 Vue 组合式函数 `useChatInputEditor`，为富文本聊天输入框编辑器提供核心逻辑。
 * 它基于 ProseMirror 构建，并负责处理编辑器的设置、Schema、插件和状态管理。
 * 该组合式函数接收 props 和事件处理函数作为参数，并返回可在 Vue 组件中使用的响应式引用 (refs) 和方法。
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ChatInputEditorController, type EditorControllerOptions } from './editor-controller';

/**
 * useChatInputEditor 组合式函数的入参。
 * 直接复用控制器 EditorControllerOptions 的定义。
 */
export interface UseChatInputEditorOptions extends EditorControllerOptions { }


/**
 * useChatInputEditor
 *
 * 一个薄包装的组合式函数，内部委托给 ChatInputEditorController。
 * 负责：
 * - 提供 `editorRef` 作为挂载点
 * - 在 Vue 生命周期钩子中创建/销毁控制器
 * - 监听 props 变更并触发控制器的重配置/同步
 *
 * 返回值包含控制常用动作的方法，与组件实例暴露的方法一致：
 * - `clearInput()` 清空
 * - `focus()` 聚焦
 * - `getContent()` 获取当前 markdown
 */
export const useChatInputEditor = ({ props, onSubmit, onUpdateModelValue, onKeydown }: UseChatInputEditorOptions) => {
  const editorRef = ref<HTMLDivElement | null>(null);
  let controller: ChatInputEditorController | null = null;

  onMounted(() => {
    if (!editorRef.value) return;
    controller = new ChatInputEditorController({ props, onSubmit, onUpdateModelValue, onKeydown });
    controller.mount(editorRef.value);
    controller.updateEditable();
    if (props.autofocus) controller.focus();
  });

  onBeforeUnmount(() => {
    controller?.destroy();
    controller = null;
  });

  watch(
    () => props.modelValue,
    (newValue) => {
      controller?.applyExternalModel(newValue);
    },
  );

  watch(
    () => props.submitKey,
    () => {
      controller?.reconfigurePlugins();
    },
  );

  watch(
    () => props.disabled,
    () => {
      controller?.updateEditable();
      controller?.reconfigurePlugins();
    },
  );

  watch(
    () => props.placeholder,
    () => {
      controller?.reconfigurePlugins();
    },
  );

  return {
    editorRef,
    clearInput: () => controller?.clearInput(),
    focus: () => controller?.focus(),
    getContent: () => controller?.getContent() ?? (props.modelValue ?? ''),
  };
};
