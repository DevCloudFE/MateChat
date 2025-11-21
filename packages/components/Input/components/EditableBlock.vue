<template>
  <div 
    ref="editableDivRef"
    class="editable-container"
    :class="{'mc-input-disabled': props.disabled}"
    :contenteditable="!props.disabled"
    spellcheck="false"
    :placeholder="props.placeholder"
    @input="handleDivInput"
    @keydown="handleDivKeydown"
    @paste="handleDivPaste"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @blur="onBlur"
    @focus="onFocus"
  >
    <!-- 前置标签 -->
    <span v-if="tipTag.onTipTag" class="ai-input-prefix-wrapper" contenteditable="false">
      <i class="icon-code-editor-close" @click="closeTipTag"></i>
      <slot name="tipTagIcon">
        <span :class="['tip-tag-icon', 'icon-default']"></span>
      </slot>
      <span id="ai-input-prefix" class="ai-input-prefix">{{tipTag.tipTagText}}</span>
    </span>
    <template v-for="(part, index) in localTemplateParts">
      <template v-if="part.type === 'text'">
        {{ part.content }}
      </template>
      <InputTag v-else-if="part.type === 'input'" :key="`input${index}`" :content="part.content" :placeholder="part.placeholder" :disabled="props.disabled" @change="handleDivInput"/>

    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,onMounted, nextTick, PropType } from "vue";
import InputTag from "./InputTag.vue";
import { insertText, moveCursorToTextEnd } from "./util";
import { SubmitShortKey } from "../input-types";

const emits = defineEmits(['send', "input", 'blur', 'focus', 'onBlockKeyArrowUp']);
const props = defineProps({
  templateParts: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
  maxLength: {
    type: Number,
    default: 2000,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  submitShortKey: {
    type: [String, null] as PropType<SubmitShortKey | null>,
    default: SubmitShortKey.Enter,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});

const tipTag = ref({
  onTipTag: false,
  tipTagText: '',
  clearInput: false
});

const editableDivRef : any= ref(null);
const localTemplateParts :any = ref([...props.templateParts]);
watch(() => props.templateParts, (newParts) => {
  localTemplateParts.value = [...newParts];
});

const clearInput = () => {
  const inputWarp = editableDivRef.value;
  if (inputWarp) {
    inputWarp.innerHTML = '';
    handleDivInput();
  }
};

const setInput = (text:string) => {
  const inputWarp = editableDivRef.value;
  if (inputWarp) {
    inputWarp.innerHTML = '';
    inputWarp.textContent = text;
    inputWarp.focus();
    moveCursorToTextEnd(inputWarp);
  }
}

const handleSend = () => {
  const prompt = (editableDivRef.value as any)?.textContent;
  if (prompt.length > props.maxLength) {
    return;
  }
  emits('send', prompt);
  clearInput();
}

const focusInput = () => {
  editableDivRef.value?.focus();
  moveCursorToTextEnd(editableDivRef.value);
}

const onBlur = (e: FocusEvent) => {
  emits('blur', e);
}

const onFocus = (e: FocusEvent) => {
  emits('focus', e);
}

const isComposing = ref(false);
const handleCompositionStart = () => {
  isComposing.value = true;
}

const handleCompositionEnd = () => {
  isComposing.value = false;
  handleDivInput();
}

const handleDivInput = () => {
  if(!isComposing.value){
    processInput();
  }
}

const getCurrentInputValue = () => {
  let prompt = (editableDivRef.value as any)?.textContent;
  // 前置标签TipTag的文本需要去除掉
  if(tipTag.value.onTipTag){
    const prefixSpan = editableDivRef.value?.querySelector('.ai-input-prefix-wrapper');
    if(prefixSpan){
      const prefixText = prefixSpan.textContent || '';
      prompt = prompt.replace(prefixText, ' ');
    }
  }
  return prompt;
}

const processInput = () => {
  setTimeout(() => {
    const prompt = getCurrentInputValue();
    emits('input', prompt);
  }, 50);
}

const handleDivKeydown = (e: KeyboardEvent) => {
  const shiftKey = props.submitShortKey === SubmitShortKey.Enter ? !e.shiftKey : props.submitShortKey === SubmitShortKey.ShiftEnter ? e.shiftKey : false;
  if (e.key === 'Enter' && shiftKey) {
    e.preventDefault();
    handleSend();
  }
  if(['ArrowLeft', 'ArrowRight','Backspace','Delete'].includes(e.key)){
    const selection = window.getSelection();
    if (!selection?.rangeCount || !selection.isCollapsed) {
      return
    }

    const range = selection.getRangeAt(0);
    const { startContainer: node, startOffset} = range;
    const direction = e.key === 'ArrowLeft' || e.key === 'Backspace' ? 'previous': 'next';
    const targetNode = findSiblingNode(node, startOffset, direction);
    if(targetNode && targetNode.nodeType === Node.ELEMENT_NODE){
      const editSpanDom = targetNode.querySelector('.input-custom-item');
      if(!editSpanDom){
        return;
      }
      e.preventDefault();
      editSpanDom.contentEditable = 'true';
      if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
        const newRange = document.createRange();

        newRange.setStart(editSpanDom, direction === 'previous' ? editSpanDom.childNodes.length : 0);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }else if(e.key === 'Backspace' || e.key === 'Delete'){
        if(editSpanDom.textContent.trim()){
          const newRange = document.createRange();
          newRange.setStart(editSpanDom, direction === 'previous' ? editSpanDom.childNodes.length : 0);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);

        }else{
          targetNode.remove();
        }
      }
    }
  }
  if(e.key === 'ArrowUp'){
    isCursorAtStart() ? emits('onBlockKeyArrowUp', e) : null;
  }
} 

function isCursorAtStart(){
  const selection = window.getSelection();
  if (!selection?.rangeCount) {
    return true;
  }
  const range = selection.getRangeAt(0);
  if(range.startOffset !== 0){
    return false;
  }
  let node :any= range.startContainer;
  while(node && !node.classList?.contains('editable-container')){
    if(node.previousSibling){
      return false;
    }
    node = node.parentNode;
  }
  return true;
}

function findSiblingNode(node:any, startOffset: number, direction: 'previous' | 'next'){
  if(!node){
    return null;
  }

  let current = node;
  const isEditableContainer = node.classList?.contains('editable-container');
  if(isEditableContainer){
    const childNodes = node.childNodes;
    const index = Math.min(startOffset, childNodes.length - 1);
    current = childNodes[index];
  }
  if(!isEditableContainer && direction === 'previous' &&startOffset !== 0){
    return null;
  }
  if(!isEditableContainer && direction === 'next' && startOffset !== node.textContent.length){
    return null;
  }
  let target = null;
  let sibling = current;
  while(sibling){
    sibling = direction === 'next' ? sibling.nextSibling : sibling.previousSibling;
    if(!sibling){
      continue;
    }
    // 排除注释节点和值为空的文本节点
    if(sibling.nodeType !== Node.COMMENT_NODE && (sibling.nodeType !== Node.TEXT_NODE || (sibling.nodeType === Node.TEXT_NODE && sibling.nodeValue.trim() !== ''))){
      target = sibling;
      break;
    }
    
  }
  return target;
}

const handleDivPaste = (e: any) => {
  e.preventDefault();
  const text = (e.originalEvent || e).clipboardData?.getData('text/plain');
  insertText(text);
  handleDivInput();
}

const setInputTag = (key: string, placeholder: string, defaultValue?: string) => {
  if(props.disabled) {
    return;
  }
  localTemplateParts.value.push({
    key,
    type: 'input',
    placeholder,
    content: defaultValue,
  });
  onFocusInput();
  handleDivInput();
}

const setMixTags = (mixTagConfig:any) => {
  if(props.disabled) {
    return;
  }
  localTemplateParts.value = [...mixTagConfig];
  onFocusInput();
  handleDivInput();
}

const setText = (text:string) => {
  if(props.disabled) {
    return;
  }
  localTemplateParts.value.push({
    type: 'text',
    content: text,
  })
  onFocusInput();
  handleDivInput();
}

const openTipTag = (tipTagText: string, clearInput?: boolean) => {
  if(props.disabled) {
    return;
  }
  tipTag.value = {
    onTipTag: true,
    tipTagText,
    clearInput: clearInput || false
  }
}

const closeTipTag = () => {
  if(tipTag.value.onTipTag && tipTag.value.clearInput) {
    clearInput();
  }else{
    tipTag.value = {
      onTipTag: false,
      tipTagText: '',
      clearInput: false
    }
  }
}

const onFocusInput = () => {
  nextTick(()=>{
    focusInput();
  });
}

onMounted(()=>{
  if(props.autofocus && editableDivRef.value && !props.disabled){
    onFocusInput();
  }
});

defineExpose({
  clearInput,
  getInput: getCurrentInputValue,
  focusInput,
  setMixTags,
  setText,
  setInputTag,
  openTipTag,
  closeTipTag,
});

</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.editable-container{
  outline: unset;
  min-height: calc(100% - 2px);
  line-height: 24px;
  margin-left: 8px;
  padding-top: 4px;
  word-break: break-all;
  white-space: pre-wrap;
  font-size: 14px;
  caret-color: $devui-text;
  background: $devui-form-control-bg;
  color: $devui-text;

  &.mc-input-disabled{
    background-color: $devui-disabled-bg;
    cursor: not-allowed;
  }
  & > * {
    text-indent: 0;
  }
  &[placeholder]:empty:before {
    content: attr(placeholder);
    color: #999;
    position: absolute;
    pointer-events: none;
    left: 8px;
  }

  .ai-input-prefix-wrapper {
    border-radius: 4px;
    background-color: $devui-list-item-hover-bg;
    height: 24px;
    padding: 0 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin-right: 4px;
    margin-left: 8px;
    z-index: 10;
    position: sticky;
    display: inline-block;

    &:hover {
      i {
        display: inline-block;
      }

      .tip-tag-icon {
        display: none;
      }

    }
    i {
      cursor: pointer;
      width: 16px;
      height: 16px;
      margin-right: 4px;
      vertical-align: middle;
      display: none;
    }

    .tip-tag-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      display: inline-block;
      vertical-align: text-bottom;
      background-size: 100% 100%;
      &.icon-default {
        background-image: url(''); // 补一个默认图标
      }
    }
  }
}

.en-editable-container{
  text-indent: 140px;
}

.editable-container:focus{
  border-color: #409eff;
}
</style>