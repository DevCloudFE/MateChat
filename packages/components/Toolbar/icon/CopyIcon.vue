<template>
  <div class="mc-action-item">
    <svg
      v-if="copied"
      :width="width"
      :height="height"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Sketch.</desc>
      <defs>
          <polygon id="path-1" points="6.53553391 9.77817459 12.1923882 4.12132034 13.6066017 5.53553391 6.53553391 12.6066017 3 9.07106781 4.41421356 7.65685425 6.53553391 9.77817459"></polygon>
      </defs>
      <g id="status/whiteBG/correct" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <mask id="mask-2" fill="white">
              <use xlink:href="#path-1"></use>
          </mask>
          <use id="Mask" fill="#3DCCA6" xlink:href="#path-1"></use>
      </g>
    </svg>
    <svg
      v-else
      :width="width"
      :height="height"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      @click="handleClick"
    >
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="API-starter-图标入库" transform="translate(-592.000000, -204.000000)">
          <g id="方格备份-16" transform="translate(560.000000, 180.000000)">
            <text id="图标" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" line-spacing="16" fill="#71757F">
              <tspan x="27.136" y="61">复制</tspan>
            </text>
          </g>
          <path
            d="M604.5,206 C605.279696,206 605.920449,206.594888 605.993133,207.35554 L606,207.5 L606,214.5 C606,215.279696 605.405112,215.920449 604.64446,215.993133 L604.5,216 L604,216 L604,216.5 C604,217.279696 603.405112,217.920449 602.64446,217.993133 L602.5,218 L595.5,218 C594.671573,218 594,217.328427 594,216.5 L594,216.5 L594,209.5 C594,208.671573 594.671573,208 595.5,208 L595.5,208 L596,208 L596,207.5 C596,206.720304 596.594888,206.079551 597.35554,206.006867 L597.5,206 L604.5,206 Z M602.5,209 L595.5,209 C595.223858,209 595,209.223858 595,209.5 L595,209.5 L595,216.5 C595,216.776142 595.223858,217 595.5,217 L595.5,217 L602.5,217 C602.776142,217 603,216.776142 603,216.5 L603,216.5 L603,209.5 C603,209.223858 602.776142,209 602.5,209 L602.5,209 Z M604.5,207 L597.5,207 C597.25454,207 597.050392,207.176875 597.008056,207.410124 L597,207.5 L597,208 L602.5,208 C603.279696,208 603.920449,208.594888 603.993133,209.35554 L604,209.5 L604,215 L604.5,215 C604.74546,215 604.949608,214.823125 604.991944,214.589876 L605,214.5 L605,207.5 C605,207.25454 604.823125,207.050392 604.589876,207.008056 L604.5,207 Z"
            id="形状结合"
            fill="currentColor"
            fill-rule="nonzero"
          ></path>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconComponentProps } from '../toolbar.types';

const props = defineProps(IconComponentProps);

const copied = ref(false);

const handleClick = async () => {
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 3000);
  try {
    await copyToClipboard(props.text);
  } catch (error) {}
};

/**
 * 复制文本到剪贴板（兼容多浏览器）
 * @param {string} text - 要复制的文本内容
 * @returns {Promise<string>} - 成功返回"success"，失败返回错误信息
 */
function copyToClipboard(text) {
  // 校验输入
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

/**
 * 降级复制方案（基于 execCommand）
 * @param {string} text - 要复制的文本
 * @returns {Promise<string>}
 */
function fallbackCopyTextToClipboard(text: string) {
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
</script>

<style scoped lang="scss">
@import '../toolbar.scss';
</style>
