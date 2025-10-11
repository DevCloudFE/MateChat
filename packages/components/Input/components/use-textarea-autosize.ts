import { ref, type Ref } from 'vue';
import type { TextareaAutoSize } from '../input-types';
import { DEFAULT_AUTOSIZE } from '../input-types';
import { computeTextareaHeight } from './textarea-utils';

interface UseTextareaAutosizeOptions {
  textareaRef: Ref<HTMLTextAreaElement | null>;
  autosize: TextareaAutoSize;
}

interface UseTextareaAutosizeReturn {
  textareaStyle: Ref<Record<string, string>>;
  updateTextareaStyle: () => void;
}

export function useMcTextareaAutosize(
  options: UseTextareaAutosizeOptions
): UseTextareaAutosizeReturn {
  const { textareaRef, autosize } = options;

  const textareaStyle = ref<Record<string, string>>({});

  const getAutosizeConfig = () => {
    return typeof autosize === 'boolean'
      ? DEFAULT_AUTOSIZE
      : autosize;
  };

  const updateTextareaStyle = () => {
    if (!textareaRef.value || autosize === false) {
      textareaStyle.value = {};
      return;
    }

    const config = getAutosizeConfig();
    const result = computeTextareaHeight(
      textareaRef.value,
      config.minRows,
      config.maxRows
    );

    textareaStyle.value = {
      ...result,
      resize: 'none',
    };
  };

  return {
    textareaStyle,
    updateTextareaStyle,
  };
}
