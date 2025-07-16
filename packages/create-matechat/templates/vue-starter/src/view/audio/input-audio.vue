<template>
  <d-popover :content="$t('audio') + $t('underDevelop')" trigger="hover" :position="['top']" style="color: var(--devui-text)">
    <span class="input-audio-container">
      <svg fill="none" width="16" height="16" viewBox="0 0 16 16">
        <g id="microphone">
          <path
            id="Vector"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.4 3.3334C5.4 1.89746 6.56406 0.733398 8 0.733398C9.43594 0.733398 10.6 1.89746 10.6 3.3334V8.00006C10.6 9.43601 9.43594 10.6001 8 10.6001C6.56406 10.6001 5.4 9.43601 5.4 8.00006V3.3334ZM8 1.9334C7.22681 1.9334 6.6 2.5602 6.6 3.3334V8.00006C6.6 8.77326 7.22681 9.40007 8 9.40007C8.7732 9.40007 9.4 8.77326 9.4 8.00006V3.3334C9.4 2.5602 8.7732 1.9334 8 1.9334ZM3.33334 6.06673C3.66471 6.06673 3.93334 6.33536 3.93334 6.66673V8.00006C3.93334 10.246 5.75405 12.0667 8 12.0667C10.246 12.0667 12.0667 10.246 12.0667 8.00006V6.66673C12.0667 6.33536 12.3353 6.06673 12.6667 6.06673C12.998 6.06673 13.2667 6.33536 13.2667 6.66673V8.00006C13.2667 10.7059 11.2262 12.9351 8.6 13.2329V14.0667H10.6667C10.998 14.0667 11.2667 14.3354 11.2667 14.6667C11.2667 14.9981 10.998 15.2667 10.6667 15.2667H5.33334C5.00197 15.2667 4.73334 14.9981 4.73334 14.6667C4.73334 14.3354 5.00197 14.0667 5.33334 14.0667H7.4V13.2329C4.77384 12.9351 2.73334 10.7059 2.73334 8.00006V6.66673C2.73334 6.33536 3.00197 6.06673 3.33334 6.06673Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </span>
  </d-popover>
</template>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.input-audio-container {
  display: flex;
  align-items: center;
  gap: 4px;
  color: $devui-text;
  cursor: pointer;

  .input-audio-text {
    font-size: $devui-font-size-sm;
  }
}
</style>
