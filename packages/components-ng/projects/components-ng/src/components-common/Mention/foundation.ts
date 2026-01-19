import { MentionProps, SearchChangeEvent, Trigger } from './common/mention-types';
import { MentionSeparator, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Escape } from './common/mention-constants';
import BaseFoundation, { DefaultAdapter } from '../Base/foundation';
import { computePosition, offset, autoUpdate } from '@floating-ui/dom';
import { debounce, isObject } from 'lodash-es';

export interface MentionAdapter extends DefaultAdapter {
  updateModelValue: (val: boolean) => void;
  searchChange: (event: SearchChangeEvent) => void;
  activeIndexChange: (index: number) => void;
  toggleChange: (val: boolean) => void;
}

export class MentionFoundation extends BaseFoundation<MentionAdapter> {
  private props: MentionProps;
  private inputEl: HTMLInputElement | HTMLTextAreaElement | null = null;
  private originEl: HTMLElement | null = null;
  private overlayEl: HTMLElement | null = null;
  private currentTrigger: string = '';
  private currentSearchValue: string = '';
  private currentTriggerIndex: number = -1;
  private currentCursorIndex: number = -1;
  private autoUpdateCleanup: (() => void) | null = null;

  constructor(adapter: MentionAdapter) {
    super({ ...adapter });
    this.props = {
      modelValue: false,
      prefix: [],
      fitHostWidth: true,
      optionsCount: 0,
      ...this.getProps()
    };
    
    // 创建防抖版本的handleInput方法
    this.handleInput = debounce(this.handleInput, 300);
  }

  // 更新配置选项
  updateOptions(options: Partial<MentionProps>) {
    this.props = { ...this.props, ...options };
    this.updateOverlayPosition();
  }

  // 设置输入元素
  setInputEl(el: HTMLInputElement | HTMLTextAreaElement | null) {
    this.inputEl = el;
  }

  // 设置原点元素
  setOriginEl(el: HTMLElement | null) {
    this.originEl = el;
    this.updateOverlayPosition();
  }

  // 设置覆盖层元素
  setOverlayEl(el: HTMLElement | null) {
    this.overlayEl = el;
    this.updateOverlayPosition();
  }

  // 初始化事件
  initEvents() {
    if (this.inputEl) {
      this.inputEl.addEventListener('input', this.handleInput);
      this.inputEl.addEventListener('keydown', this.handleKeyDown as EventListener);
      this.inputEl.addEventListener('click', this.handleClick);
    }
    // 监听文档点击事件，用于处理点击外部关闭下拉菜单
    document.addEventListener('click', this.handleDocumentClick);
  }

  // 销毁事件
  override destroy() {
    if (this.inputEl) {
      this.inputEl.removeEventListener('input', this.handleInput);
      this.inputEl.removeEventListener('keydown', this.handleKeyDown as EventListener);
      this.inputEl.removeEventListener('click', this.handleClick);
    }
    // 移除文档点击事件监听
    document.removeEventListener('click', this.handleDocumentClick);
    // 清理autoUpdate
    if (this.autoUpdateCleanup) {
      this.autoUpdateCleanup();
      this.autoUpdateCleanup = null;
    }
    this.inputEl = null;
    this.originEl = null;
    this.overlayEl = null;
  }

  // 重置Mention状态
  resetMention() {
    this.currentTrigger = '';
    this.currentSearchValue = '';
    this.currentTriggerIndex = -1;
    this.currentCursorIndex = -1;
    this.updateModelValue(false);
  }

  // 更新模型值
  private updateModelValue(val: boolean) {
    if (this.props.modelValue !== val) {
      this.props.modelValue = val;
      this._adapter.updateModelValue(val);
      this._adapter.toggleChange(val);
    }
  }

  // 处理输入事件
  handleInput = () => {
    if (!this.inputEl) return;

    const value = this.inputEl.value;
    const cursorPosition = this.inputEl.selectionStart || 0;

    // 检查是否匹配触发词
    const matchResult = this.checkPrefixMatch(value, cursorPosition);
    if (matchResult) {
      const { trigger, triggerIndex, searchValue } = matchResult;
      this.currentTrigger = trigger;
      this.currentSearchValue = searchValue;
      this.currentTriggerIndex = triggerIndex;
      this.currentCursorIndex = cursorPosition;

      // 触发搜索变化事件
      this._adapter.searchChange({
        value: searchValue,
        trigger,
        triggerIndex,
        cursorIndex: cursorPosition
      });

      // 当有匹配的触发词时，就显示弹窗
      // 这样可以确保在用户输入过程中，弹窗始终显示，直到用户选择了一个选项或者点击了其他地方
      this.updateModelValue(true);

      // 这里不再直接调用updateOverlayPosition，而是通过watch modelValue的nextTick来调用，确保overlayEl已渲染完成
    } else {
      // 没有匹配的触发词，关闭选择面板
      this.resetMention();
    }
  };

  // 处理键盘事件
  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.inputEl) return;

    switch (event.key) {
      case ArrowUp:
        if (this.props.modelValue) {
          event.preventDefault();
          this.handleArrowKey(-1);
        }
        break;
      case ArrowDown:
        if (this.props.modelValue) {
          event.preventDefault();
          this.handleArrowKey(1);
        }
        break;
      case ArrowLeft:
      case ArrowRight:
        // 左右箭头键：延迟检查是否需要触发提及
        setTimeout(() => {
          this.handleInput();
        });
        break;
      case Escape:
        event.preventDefault();
        this.resetMention();
        break;
      case MentionSeparator:
        // 只有在面板打开时才阻止空格的默认行为
        if (this.props.modelValue) {
          this.resetMention();
        }
        break;
      default:
        // 其他按键不做处理
        break;
    }
  };

  // 处理点击事件
  private handleClick = () => {
    if (!this.inputEl) return;

    // 点击事件触发提及检查
    this.handleInput();
  };

  // 处理文档点击事件
  private handleDocumentClick = (e: Event) => {
    if (this.originEl) {
      if (this.props.modelValue) {
        // 如果下拉菜单是打开的，检查点击是否发生在originEl外部
        if (!this.originEl.contains(e.target as HTMLElement)) {
          this.resetMention();
        }
      } else {
        // 如果下拉菜单是关闭的，检查点击是否发生在originEl内部
        if (this.originEl.contains(e.target as HTMLElement)) {
          this.handleInput();
        }
      }
    }
  };

  // 检查前缀匹配
  private checkPrefixMatch(value: string, cursorPosition: number): { trigger: string; triggerIndex: number; searchValue: string } | null {
    if (!this.props.prefix || this.props.prefix.length === 0) return null;

    const text = value.replace(/[\r\n]/g, MentionSeparator);
    const beforeCursor = text.substring(0, cursorPosition);

    // 检查所有前缀
    for (const prefixItem of this.props.prefix) {
      let trigger = '';
      let onlyInputStart = false;

      if (typeof prefixItem === 'string') {
        trigger = prefixItem;
      } else if (isObject(prefixItem)) {
        trigger = prefixItem.key;
        onlyInputStart = Boolean(prefixItem.onlyInputStart);
      } else {
        continue;
      }

      // 查找最后一个触发词的位置
      const triggerIndex = beforeCursor.lastIndexOf(trigger);
      // 查找最后一个分隔符的位置
      const separatorPos = beforeCursor.lastIndexOf(MentionSeparator);
      // 触发词到光标的字符串
      const mentionStr = beforeCursor.substring(triggerIndex, cursorPosition);
      // 提及字符串的最后一个字符
      const lastMentionChar = mentionStr.charAt(mentionStr.length - 1);

      // 条件判断：
      // 1. 触发词位置有效
      // 2. 如果设置了onlyInputStart，触发词必须在输入开始处
      // 3. 触发词位置必须在最后一个分隔符之后
      // 4. 提及字符串的最后一个字符不能是分隔符
      if (triggerIndex < 0 || 
          (triggerIndex > 0 && onlyInputStart) || 
          triggerIndex < separatorPos || 
          lastMentionChar === MentionSeparator) {
        continue;
      } else {
        const searchValue = mentionStr.slice(trigger.length);
        return { trigger, triggerIndex, searchValue };
      }
    }

    return null;
  }

  // 处理箭头键
  private handleArrowKey(direction: number) {
    let newIndex = (this.getCurrentActiveIndex() + direction) % this.props.optionsCount;
    if (newIndex < 0) {
      newIndex = this.props.optionsCount - 1;
    }
    this._adapter.activeIndexChange(newIndex);
  }

  // 获取当前活动索引
  private getCurrentActiveIndex(): number {
    // 默认返回0，实际实现可能需要根据adapter获取
    return 0;
  }

  // 处理选择事件
  private handleSelect() {
    if (!this.inputEl || this.currentTriggerIndex === -1) return;

    const value = this.inputEl.value;
    const beforeTrigger = value.substring(0, this.currentTriggerIndex);
    const afterCursor = value.substring(this.currentCursorIndex);

    // 这里需要根据实际选择的项进行替换，暂时使用示例实现
    const selectedValue = `${beforeTrigger}@selected ${afterCursor}`;
    this.inputEl.value = selectedValue;

    // 设置光标位置
    const newCursorPosition = beforeTrigger.length + '@selected '.length;
    this.inputEl.setSelectionRange(newCursorPosition, newCursorPosition);

    // 关闭选择面板
    this.resetMention();

    // 触发input事件以更新绑定值
    this.inputEl.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // 更新覆盖层位置
  updateOverlayPosition(): Promise<{ top: string; left: string; width: string; } | undefined> {
    return new Promise((resolve) => {
      if (!this.originEl || !this.overlayEl) {
        resolve(undefined);
        return;
      }

      // 设置宽度
      if (this.props.fitHostWidth) {
        const originRect = this.originEl.getBoundingClientRect();
        this.overlayEl.style.width = `${originRect.width}px`;
      } else {
        this.overlayEl.style.width = '';
      }

      // 清理之前的autoUpdate
      if (this.autoUpdateCleanup) {
        this.autoUpdateCleanup();
        this.autoUpdateCleanup = null;
      }

      // 设置位置：使用@floating-ui/dom计算位置，与Vue版本保持一致
      computePosition(this.originEl, this.overlayEl, {
        strategy: 'fixed',
        placement: 'top-start',
        middleware: [offset(4)],
      }).then(({ x, y }) => {
        this.overlayEl!.style.top = `${y}px`;
        this.overlayEl!.style.left = `${x}px`;
        this.overlayEl!.style.position = 'fixed';
        
        // 返回位置信息，用于Vue组件同步样式
        resolve({
          top: `${y}px`,
          left: `${x}px`,
          width: this.props.fitHostWidth ? `${this.originEl!.getBoundingClientRect().width}px` : ''
        });
        
        // 设置autoUpdate，自动处理滚动和调整大小事件
        this.autoUpdateCleanup = autoUpdate(
          this.originEl!,
          this.overlayEl!,
          () => {
            if (this.originEl && this.overlayEl) {
              // 当fitHostWidth为true时，更新宽度
              if (this.props.fitHostWidth) {
                const originRect = this.originEl.getBoundingClientRect();
                this.overlayEl.style.width = `${originRect.width}px`;
              }
              
              computePosition(this.originEl, this.overlayEl, {
                strategy: 'fixed',
                placement: 'top-start',
                middleware: [offset(4)],
              }).then(({ x, y }) => {
                this.overlayEl!.style.top = `${y}px`;
                this.overlayEl!.style.left = `${x}px`;
              });
            }
          }
        );
      }).catch(() => {
        // 处理计算位置失败的情况
        resolve(undefined);
      });
    });
  }

  // 获取当前搜索值
  getCurrentSearchValue(): string {
    return this.currentSearchValue;
  }

  // 获取当前触发词
  getCurrentTrigger(): string {
    return this.currentTrigger;
  }
}