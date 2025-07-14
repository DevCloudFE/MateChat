import { computed, onMounted, ref, onUnmounted } from 'vue';
import { ListDirection } from './list-types';
import type { ListProps, ListItemData } from './list-types';
import { LazyLoadThreshold, InputTagNames, ArrowUp, ArrowDown, Enter } from './const';

export function useList(props: ListProps, emits: (event: 'select' | 'loadMore', ...args: any[]) => void) {
  let listenDom;
  const preSelectIndex = ref(props.enableShortKey ? 0 : -1);
  const onItemClick = (item: ListItemData) => {
    if (item.disabled) {
      return;
    }
    if (props.selectable) {
      for (let i = 0; i < props.data.length; i++) {
        props.data[i].active = props.data[i].value === item.value;
      }
    }
    emits('select', { ...item });
  };

  const onListScroll = (e: Event) => {
    if (!props.enableLazyLoad || props.direction !== ListDirection.Vertical) {
      return;
    }
    const targetEl = e.target as HTMLElement;
    const scrollHeight = targetEl.scrollHeight;
    const clientHeight = targetEl.clientHeight;
    const scrollTop = targetEl.scrollTop;

    if (scrollHeight - clientHeight - scrollTop < LazyLoadThreshold) {
      emits('loadMore', e);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === ArrowUp) {
      preSelectIndex.value = preSelectIndex.value === 0 ? props.data.length - 1 : preSelectIndex.value - 1;
    }
    if (e.code === ArrowDown) {
      preSelectIndex.value = preSelectIndex.value === props.data.length - 1 ? 0 : preSelectIndex.value + 1;
    }
    if (e.code === Enter) {
      if (props.selectable) {
        onItemClick(props.data[preSelectIndex.value]);
      }
    }
  };

  onMounted(() => {

    if (props.inputEl) {
      const el = props.inputEl.$el ?? props.inputEl;
      if (InputTagNames.includes(el.tagName)) {
        listenDom = el;
      } else {
        listenDom = el.querySelector('textarea') || el.querySelector('input') || document;
      }
    } else {
      listenDom = document;
    }
    if (props.enableShortKey) {
      listenDom.addEventListener('keydown', onKeyDown);
    }
  });

  onUnmounted(() => {
    listenDom.removeEventListener('keydown', onKeyDown);
  });

  return { preSelectIndex, onItemClick, onListScroll };
}

export function useListRender(props: ListProps) {
  const listClasses = computed(() => ({
    'mc-list': true,
    'mc-list-horizontal': props.direction === ListDirection.Horizontal,
    'mc-list-nowrap': props.direction === ListDirection.Horizontal && !props.autoWrap,
  }));

  return { listClasses };
}
