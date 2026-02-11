export function copyToClipboard(text: any) {
  if (typeof text !== 'string') {
    return Promise.reject();
  }

  // 现代浏览器优先使用 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        return fallbackCopyTextToClipboard(text); // 降级处理
      });
  }

  // 低版本浏览器直接使用降级方案
  return fallbackCopyTextToClipboard(text);
}

export function fallbackCopyTextToClipboard(text: string) {
  return new Promise((resolve, reject) => {
    // 创建隐藏的 textarea 元素
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // 样式：隐藏且不影响布局
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    textarea.style.zIndex = '-1000';

    // 解决 iOS 下无法选中的问题
    textarea.setAttribute('readonly', '');

    document.body.appendChild(textarea);

    try {
      // 选中内容（兼容 iOS）
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length); // 移动端必须

      // 执行复制
      const success = document.execCommand('copy');
      if (success) {
        resolve(null);
      } else {
        reject();
      }
    } catch (err) {
      reject();
    } finally {
      // 移除临时元素
      document.body.removeChild(textarea);
    }
  });
}
