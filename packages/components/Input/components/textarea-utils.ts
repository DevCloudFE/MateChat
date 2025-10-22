/**
 * Textarea height calculation utilities
 * Based on DevUI Vue and react-component
 */

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'word-break',
  'white-space',
];

const HIDDEN_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`;

interface TextareaHeight {
  height: string;
  minHeight?: string;
  overflowY?: string;
}

function getBoxStyle(targetElement: HTMLTextAreaElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize =
    Number.parseFloat(style.getPropertyValue('padding-top')) +
    Number.parseFloat(style.getPropertyValue('padding-bottom'));

  const borderSize =
    Number.parseFloat(style.getPropertyValue('border-top-width')) +
    Number.parseFloat(style.getPropertyValue('border-bottom-width'));

  const contextStyle = SIZING_STYLE.map(
    (name) => `${name}:${style.getPropertyValue(name)}`
  ).join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

/**
 * 计算 textarea 的高度
 * @param targetElement - 目标 textarea 元素
 * @param minRows - 最小行数
 * @param maxRows - 最大行数
 */
export function computeTextareaHeight(
  targetElement: HTMLTextAreaElement,
  minRows = 1,
  maxRows?: number
): TextareaHeight {
  const { contextStyle, paddingSize, borderSize, boxSizing } = getBoxStyle(targetElement);

  const tempTextarea = document.createElement('textarea');
  tempTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  tempTextarea.value = targetElement.value || targetElement.placeholder || '';

  document.body.appendChild(tempTextarea);

  let height = tempTextarea.scrollHeight;
  const result: TextareaHeight = {
    height: `${height}px`
  };

  if (minRows !== undefined || maxRows !== undefined) {
    tempTextarea.value = ' ';
    const singleRowHeight = tempTextarea.scrollHeight - paddingSize;

    if (minRows !== undefined) {
      let minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
      result.minHeight = `${minHeight}px`;
    }

    if (maxRows !== undefined) {
      let maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }

      if (height > maxHeight) {
        height = maxHeight;
        result.overflowY = 'auto';
      } else {
        result.overflowY = 'hidden';
      }
    }
  }

  result.height = `${height}px`;

  tempTextarea.remove();

  return result;
}
