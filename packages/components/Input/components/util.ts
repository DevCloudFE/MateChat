export function insertText(text: string) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}


export const handlePaste = (e: any) => {
  e.preventDefault();
  const text = e.clipboardData?.getData("text/plain") ||'';
  const sanitizedText = text.replace(/[\r\n]+/g, ' ');
  if (sanitizedText) {
    insertText(sanitizedText);
  }
}

// 使光标移动到文案末尾
export const moveCursorToTextEnd = (inputWarp: HTMLElement) => {
  if (inputWarp) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputWarp);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}

