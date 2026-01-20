import { onMounted, ref, reactive, watch, nextTick, onBeforeUnmount } from 'vue';
import { computePosition, offset } from '@floating-ui/dom';
import { debounce, isObject } from 'lodash-es';
import type { MentionProps } from './mention-types';
import { MentionSeparator, ArrowLeft, ArrowRight, Escape } from './const';

export function useMention(props: MentionProps, emits: (event: string, ...args: any[]) => void) {
  const popperTriggerEl = ref();
  const originEl = ref();
  const overlayEl = ref<HTMLElement>();
  const overlayStyle = reactive({ top: '0px', left: '0px', width: '' });
  let inputEl: HTMLInputElement | HTMLTextAreaElement | null;
  let currentTrigger: string | null; // 当前匹配到的trigger
  let currentTriggerPos: number; // 当前匹配到的trigger的位置
  let cursorPos: number; // 光标的位置
  let inputValue: string = ''; // trigger到光标位置的字符串
  let leftRightTimer: ReturnType<typeof setTimeout> | undefined = undefined;
  let originObserver: ResizeObserver;

  const updatePosition = async () => {
    if (!originEl.value || !overlayEl.value) {
      return;
    }
    const { x, y } = await computePosition(originEl.value, overlayEl.value, {
      strategy: 'fixed',
      placement: 'top-start',
      middleware: [offset(4)],
    });
    overlayStyle.top = `${y}px`;
    overlayStyle.left = `${x}px`;
  };

  const updateOverlayWidth = () => {
    const { width } = originEl.value.getBoundingClientRect();
    overlayStyle.width = `${width}px`;
    updatePosition();
  };

  const observeOrigin = () => {
    if (props.fitHostWidth && typeof window !== 'undefined') {
      if (originEl.value) {
        originObserver = new window.ResizeObserver(updateOverlayWidth);
        originObserver.observe(originEl.value);
      }
    }
  };

  const unobserveOrigin = () => {
    if (originEl.value) {
      originObserver?.unobserve(originEl.value);
    }
  };

  watch(
    () => props.modelValue,
    (val: boolean, oldVal) => {
      if (val) {
        nextTick(updatePosition);
        observeOrigin();
        typeof window !== 'undefined' && window.addEventListener('scroll', scrollCallback, true);
      } else {
        unobserveOrigin();
        typeof window !== 'undefined' && window.removeEventListener('scroll', scrollCallback, true);
      }
      if (oldVal !== undefined) {
        emits('toggleChange', val);
      }
    },
    { immediate: true },
  );

  const resetTriggerData = () => {
    currentTrigger = null;
    currentTriggerPos = -1;
    cursorPos = -1;
    inputValue = '';
  };

  const emitModelValue = (val: boolean) => {
    emits('update:modelValue', val);
  };

  const checkMention = () => {
    if (!inputEl) {
      return;
    }
    const value = inputEl.value.replace(/[\r\n]/g, MentionSeparator) || '';
    const selectionStart = inputEl.selectionStart; // 光标位置
    if (!value.trim() || !selectionStart) {
      resetTriggerData();
      return;
    }
    for (let i = 0; i < props.prefix.length; i++) {
      const itemTrigger = props.prefix[i];
      let triggerStr = '';
      let isOnlyInputStart = false;
      if (typeof itemTrigger === 'string') {
        triggerStr = itemTrigger;
      } else if (isObject(itemTrigger)) {
        triggerStr = itemTrigger.key;
        isOnlyInputStart = Boolean(itemTrigger.onlyInputStart);
      } else {
        continue;
      }

      const startPos = value.lastIndexOf(triggerStr, selectionStart); // trigger位置
      const separatorPos = value.lastIndexOf(MentionSeparator, selectionStart); // 分隔符的位置
      const mentionStr = value.substring(startPos, selectionStart); // trigger到光标的字符串，eg：@abc
      const lastMentionStr = mentionStr.charAt(mentionStr.length - 1);
      if (startPos < 0 || (startPos > 0 && isOnlyInputStart) || startPos < separatorPos || lastMentionStr === MentionSeparator) {
        resetTriggerData();
      } else {
        currentTrigger = triggerStr;
        currentTriggerPos = startPos;
        cursorPos = selectionStart;
        inputValue = mentionStr.slice(triggerStr.length);
        return;
      }
    }
  };

  const resetMention = () => {
    checkMention();
    if (!currentTrigger) {
      emitModelValue(false);
      return;
    }
    emits('searchChange', { value: inputValue, trigger: currentTrigger, triggerIndex: currentTriggerPos, cursorIndex: cursorPos });
    emitModelValue(true);
  };

  const onInput = debounce(resetMention, 300);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === ArrowLeft || e.code === ArrowRight) {
      leftRightTimer = setTimeout(() => {
        resetMention();
        if (leftRightTimer) {
          leftRightTimer = undefined;
          clearTimeout(leftRightTimer);
        }
      });
    }
    if (e.code === Escape) {
      emitModelValue(false);
    }
  };

  const onDocumentClick = (e: Event) => {
    if (props.modelValue) {
      if (!originEl.value?.contains(e.target as HTMLElement)) {
        emitModelValue(false);
      }
    } else if (originEl.value?.contains(e.target as HTMLElement)) {
      resetMention();
    }
  };

  function scrollCallback(e: Event) {
    const scrollElement = e.target as HTMLElement;
    if (scrollElement?.contains(originEl.value)) {
      updatePosition();
    }
  }

  const initEvent = () => {
    if (originEl.value) {
      inputEl = originEl.value.querySelector('textarea') || originEl.value.querySelector('input');

      if (inputEl) {
        inputEl.addEventListener('input', onInput);
        inputEl.addEventListener('keydown', onKeyDown);
      }
    }
    document.addEventListener('click', onDocumentClick);
  };

  onMounted(() => {
    const triggerEl = popperTriggerEl.value.triggerEl;
    originEl.value = triggerEl.$el ?? triggerEl;
    initEvent();
  });

  onBeforeUnmount(() => {
    emitModelValue(false);
    inputEl?.removeEventListener('input', onInput);
    inputEl?.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onDocumentClick);
    typeof window !== 'undefined' && window.removeEventListener('scroll', scrollCallback, true);
    unobserveOrigin();
  });

  return { popperTriggerEl, overlayEl, overlayStyle };
}
