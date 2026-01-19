import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, SimpleChanges, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import BaseComponent from '../../Base/base.component';
import { LocaleService } from '../../Locale';

import { handlePaste, insertText, moveCursorToTextEnd } from '../../components-common/Input/common/util';
import { InputTagFoundation } from '../../components-common/Input/input-tag-foundation';
import { InputTagComponent } from '../InputTag/input-tag.component';
import { DisplayType, FormatContentItem, SubmitShortKey, ThemeTagItem, TimeToViewRender } from '../../components-common/Input/common/types';
// import { PopoverModule } from 'ng-devui/popover';

@Component({
  selector: 'mc-editable-block',
  standalone: true,
  imports: [CommonModule, InputTagComponent],
  templateUrl: './editable-block.component.html',
  styleUrls: ['./editable-block.component.scss'],
})export class EditableBlockComponent extends BaseComponent<InputTagFoundation> {

  themeTag: ThemeTagItem = {
    themeTagText: '',
    clearInput: false,
    popoverContent: '',
    type: 'themeTag',
  };
  
  @Input() disabled: boolean = false;
  @Input() displayType: DisplayType = DisplayType.Simple;
  @Input() placeholder: string = '';

  @Input() templateParts: any[] = [];
  @Input() maxLength: number | null = 2000;
  @Input() submitShortKey: SubmitShortKey | null | string =
      SubmitShortKey.Enter;
  @Input() autofocus: boolean = false;

  @Output() send = new EventEmitter<string>();
  @Output() input = new EventEmitter<string>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() onBlockKeyArrowUp = new EventEmitter<KeyboardEvent>();
  @ViewChild('editableDivRef') editableDivRef!: ElementRef<HTMLDivElement>;
  @ContentChild('themeTag') themeTagTemplate: TemplateRef<any> | null = null;
  localTemplateParts: any = [...this.templateParts];

  constructor(private localeService: LocaleService) { super(); }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['templateParts']) {
      this.localTemplateParts = [...changes['templateParts'].currentValue];
    }
  }

  ngOnInit() {
    if (this.autofocus && this.editableDivRef?.nativeElement && !this.disabled) {
      this.onFocusInput();
    }
  }

  clearInput() {
    const inputWarp = this.editableDivRef?.nativeElement;
    if (inputWarp) {
      inputWarp.innerHTML = '';
      this.handleDivInput();
    }
  }

  getInput(){
    return this.getCurrentInputValue();
  }

  handleSend() {
    const prompt = (this.editableDivRef?.nativeElement as any)?.textContent;
    if (this.maxLength && prompt.length > this.maxLength) {
      return;
    }
    this.send.emit(prompt);
    this.clearInput();
  }

  focusInput() {
    this.editableDivRef?.nativeElement.focus();
    moveCursorToTextEnd(this.editableDivRef?.nativeElement);
  }

  onFocus($event: FocusEvent) {
    this.focus.emit($event);
  }
  onBlur($event: FocusEvent) {
    this.blur.emit($event);
  }

  isComposing: boolean = false;

  handleCompositionEnd($event: CompositionEvent) {
    this.isComposing = false;
    this.handleDivInput();
  }
  handleCompositionStart($event: CompositionEvent) {
    this.isComposing = true;
  }
  handleDivPaste(e: any) {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData?.getData('text/plain');
    insertText(text);
    this.handleDivInput();
  }
  handleDivKeydown(e: KeyboardEvent) {
    const shiftKey = this.submitShortKey === SubmitShortKey.Enter ? !e.shiftKey : this.submitShortKey === SubmitShortKey.ShiftEnter ? e.shiftKey : false;
    if (e.key === 'Enter' && shiftKey) {
      e.preventDefault();
      this.handleSend();
    }
    if(['ArrowLeft', 'ArrowRight','Backspace','Delete'].includes(e.key)){
      const selection = window.getSelection();
      if (!selection?.rangeCount || !selection.isCollapsed) {
        return
      }

      const range = selection.getRangeAt(0);
      const { startContainer: node, startOffset} = range;
      const direction = e.key === 'ArrowLeft' || e.key === 'Backspace' ? 'previous': 'next';
      const targetNode: any = this.findSiblingNode(node, startOffset, direction);
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
      this.isCursorAtStart() ? this.onBlockKeyArrowUp.emit(e) : null;
    }
  }

  isCursorAtStart(){
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

  findSiblingNode(node:any, startOffset: number, direction: 'previous' | 'next'){
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


  handleDivInput() {
    if(!this.isComposing) {
      this.processInput();
    }
  }

  getCurrentInputValue() {
    let prompt = (this.editableDivRef?.nativeElement as any)?.textContent;
    // 前置标签TipTag的文本需要去除掉
    if(this.themeTag.themeTagText){
      const prefixSpan = this.editableDivRef?.nativeElement?.querySelector('.ai-input-prefix-wrapper');
      if(prefixSpan){
        prompt = prompt.replace(prefixSpan.textContent || '', ' ');
      }
    }
    return prompt;
  }

  processInput() {
    setTimeout(() => {
      const prompt = this.getCurrentInputValue();
      this.input.emit(prompt);
    }, TimeToViewRender);
  }

  setInputTag(key: string, placeholder: string, defaultValue?: string) {
    if(this.disabled) {
      return;
    }
    this.localTemplateParts.push({
      key,
      type: 'input',
      placeholder,
      content: defaultValue,
    });
    this.onFocusInput();
    this.handleDivInput();
  }
  
  setMixTags(mixTagConfig:FormatContentItem[]) {
    if(this.disabled) {
      return;
    }
    this.localTemplateParts = [...mixTagConfig];
    this.onFocusInput();
    this.handleDivInput();
  }

  setText(text:string) {
    if(this.disabled) {
      return;
    }
    this.localTemplateParts.push({
      key: 'text',
      type: 'text',
      content: text,
    });
    this.onFocusInput();
    this.handleDivInput();
  }
  
  openTipTag(themeTagText:string, popoverContent:string, clearInput?: boolean){
    if(this.disabled) {
      return;
    }
    this.themeTag = {
      themeTagText,
      popoverContent,
      clearInput: clearInput || false,
      type: 'themeTag'
    };

  }
 
  closeTipTag() {
    if(this.themeTag.themeTagText && this.themeTag.clearInput){
      this.clearInput();
    }else{
      this.themeTag = {
        themeTagText: '',
        popoverContent: '',
        clearInput: false,
        type: 'themeTag'
      };
      this.processInput();
    }
  }

  onFocusInput() {
    this.focusInput();
  }

}