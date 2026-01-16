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
  }

  // 销毁事件
  override destroy() {
    if (this.inputEl) {
      this.inputEl.removeEventListener('input', this.handleInput);
      this.inputEl.removeEventListener('keydown', this.handleKeyDown as EventListener);
      this.inputEl.removeEventListener('click', this.handleClick);
    }
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
    if (!this.props.modelValue || !this.inputEl) return;

    switch (event.key) {
      case ArrowUp:
        event.preventDefault();
        this.handleArrowKey(-1);
        break;
      case ArrowDown:
        event.preventDefault();
        this.handleArrowKey(1);
        break;
      case Escape:
        event.preventDefault();
        this.resetMention();
        break;
      case MentionSeparator:
        this.resetMention();
        break;
      default:
        // 其他按键不做处理
        break;
    }
  };

  // 处理点击事件
  private handleClick = () => {
    if (!this.inputEl) return;

    // 点击事件只需要重置提及状态，不需要触发新的提及
    // 提及功能应该只在用户输入触发词时才触发
    this.resetMention();
  };

  // 检查前缀匹配
  private checkPrefixMatch(value: string, cursorPosition: number): { trigger: string; triggerIndex: number; searchValue: string } | null {
    if (!this.props.prefix || this.props.prefix.length === 0) return null;

    const beforeCursor = value.substring(0, cursorPosition);

    // 检查所有前缀
    for (const prefixItem of this.props.prefix) {
      const trigger = typeof prefixItem === 'string' ? prefixItem : prefixItem.key;
      const onlyInputStart = isObject(prefixItem) && (prefixItem as Trigger).onlyInputStart;

      // 检查是否在输入开始处（如果设置了onlyInputStart）
      if (onlyInputStart) {
        const triggerIndex = beforeCursor.lastIndexOf(trigger);
        if (triggerIndex === 0) {
          // 当光标在触发词后面（包括紧跟触发词和触发词后有内容的情况），认为是提及触发
          // 这样可以在删除触发词后的内容时仍然显示弹窗
          if (cursorPosition >= triggerIndex + trigger.length) {
            const searchValue = beforeCursor.substring(trigger.length);
            return { trigger, triggerIndex, searchValue };
          }
        }
      } else {
        // 检查是否存在触发词
        const triggerIndex = beforeCursor.lastIndexOf(trigger);
        if (triggerIndex !== -1) {
          // 当光标在触发词后面（包括紧跟触发词和触发词后有内容的情况），认为是提及触发
          // 这样可以在删除触发词后的内容时仍然显示弹窗，无论触发词前面是什么字符
          if (cursorPosition >= triggerIndex + trigger.length) {
            const searchValue = beforeCursor.substring(triggerIndex + trigger.length);
            return { trigger, triggerIndex, searchValue };
          }
        }
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

      // 设置位置：使用@floating-ui/dom计算位置，与Angular版本保持一致
      computePosition(this.originEl, this.overlayEl, {
        strategy: 'fixed',
        placement: 'top-start', // 将位置改为顶部开始
        middleware: [offset(10)],
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
                middleware: [offset(10)],
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