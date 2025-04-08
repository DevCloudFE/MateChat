import { cloneVNode, defineComponent, withDirectives, ref } from 'vue';
import type { SetupContext } from 'vue';
import { getFirstValidChild } from './use-popper-trigger';

export default defineComponent({
  setup(_, ctx: SetupContext) {
    const { slots, attrs, expose } = ctx;
    const triggerEl = ref();

    expose({ triggerEl });

    return () => {
      const defaultSlot = slots.default?.(attrs);
      if (!defaultSlot) {
        return null;
      }

      const firstValidChild = getFirstValidChild(defaultSlot);
      if (!firstValidChild) {
        return null;
      }

      return withDirectives(cloneVNode(firstValidChild, attrs), [
        [
          {
            mounted(el) {
              triggerEl.value = el;
            },
            updated(el) {
              triggerEl.value = el;
            },
            unmounted() {
              triggerEl.value = null;
            },
          },
        ],
      ]);
    };
  },
});
