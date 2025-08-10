<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number | string;
    title?: string;
    class?: string;
  }>(),
  {
    size: 32,
  },
);
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" customFrame="#000000"
    role="img"
    :aria-label="props.title"
    :class="props.class"
  >
    <mask id="mask_2" width="24" height="28" x="4" y="2" maskUnits="userSpaceOnUse" mask-type="outline">
		<g filter="url(#pixso_custom_mask_type_outline)">
			<use xlink:href="#use_2" />
		</g>
	</mask>
	<defs>
		<g id="use_2">
			<path id="蒙版" d="M7 2L20 2L28 10L28 27C28 28.6569 26.6569 30 25 30L7 30C5.34315 30 4 28.6569 4 27L4 5C4 3.34315 5.34315 2 7 2Z" fill="rgb(242,48,48)" fill-rule="evenodd" />
			<path id="蒙版" d="M20 2L7 2C5.34315 2 4 3.34315 4 5L4 27C4 28.6569 5.34315 30 7 30L25 30C26.6569 30 28 28.6569 28 27L28 10L20 2ZM19.5858 3L27 10.4142L27 27C27 27.1577 26.9824 27.3113 26.9472 27.4607C26.9217 27.5687 26.8871 27.6745 26.8432 27.7782C26.7974 27.8867 26.7429 27.9896 26.6798 28.0869C26.6037 28.2041 26.5152 28.3132 26.4142 28.4142C26.3132 28.5152 26.2041 28.6037 26.0869 28.6797C25.9896 28.7429 25.8867 28.7974 25.7782 28.8432C25.6745 28.8871 25.5687 28.9217 25.4607 28.9472C25.3113 28.9824 25.1577 29 25 29L7 29C6.84229 29 6.68872 28.9824 6.53931 28.9472C6.43131 28.9217 6.32548 28.8871 6.22182 28.8432C6.11331 28.7973 6.01038 28.7428 5.91305 28.6797C5.79586 28.6037 5.68677 28.5152 5.58579 28.4142C5.48479 28.3132 5.39628 28.2041 5.32027 28.0869C5.25715 27.9896 5.20265 27.8867 5.15676 27.7782C5.11292 27.6745 5.07827 27.5687 5.05282 27.4607C5.01761 27.3113 5 27.1577 5 27L5 5C5 4.84228 5.01761 4.68871 5.05282 4.53929C5.07827 4.4313 5.11292 4.32547 5.15676 4.22182C5.20266 4.1133 5.25717 4.01037 5.32031 3.91303C5.39631 3.79585 5.4848 3.68677 5.58579 3.58579C5.68677 3.4848 5.79585 3.39631 5.91303 3.32031C6.01037 3.25717 6.1133 3.20266 6.22182 3.15676C6.32547 3.11292 6.4313 3.07827 6.53929 3.05282C6.68871 3.01761 6.84228 3 7 3L19.5858 3Z" fill="rgb(223,225,230)" fill-opacity="0" fill-rule="evenodd" />
		</g>
		<filter id="pixso_custom_mask_type_outline">
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 255 0 " />
		</filter>
	</defs>
	<g id="流程图">
		<rect id="矩形" width="32" height="32" x="0" y="0" fill="rgb(0,0,0)" fill-opacity="0" />
		<rect id="矩形" width="31" height="31" x="0.5" y="0.5" stroke="rgb(151,151,151)" stroke-opacity="0" stroke-width="1" />
		<g id="编组 2" mask="url(#mask_2)">
			<use xlink:href="#use_2" />
			<path id="路径" d="M28 10L21.5 10C20.6716 10 20 9.32843 20 8.5L20 2L28 10Z" fill="rgb(250,167,163)" fill-rule="evenodd" />
			<path id="路径" d="M28 10L21.5 10C20.6716 10 20 9.32843 20 8.5L20 2L21 3L21 8.5C21 8.56903 21.0122 8.63301 21.0366 8.69194C21.061 8.75087 21.0976 8.80474 21.1464 8.85355C21.1953 8.90237 21.2491 8.93898 21.3081 8.96339C21.367 8.9878 21.431 9 21.5 9L27 9L28 10Z" fill="rgb(223,225,230)" fill-opacity="0" fill-rule="evenodd" />
			<path id="路径" d="M6.54991 5L2.5 5C1.11929 5 -1.09279e-07 3.88071 -1.09279e-07 2.5C-1.09279e-07 1.11929 1.11929 0 2.5 0L12 0L6.54991 5Z" fill="rgb(216,216,216)" fill-opacity="0" fill-rule="evenodd" transform="matrix(-1,0,0,1,23.5,13)" />
			<path id="路径" d="M6.54991 5L2.5 5C1.11929 5 -1.09279e-07 3.88071 -1.09279e-07 2.5C-1.09279e-07 1.11929 1.11929 0 2.5 0L12 0" fill-rule="evenodd" stroke="rgb(255,255,255)" stroke-width="1.5" transform="matrix(-1,0,0,1,23.5,13)" />
			<path id="路径备份" d="M8.64563 5L2.5 5C1.11929 5 -1.09278e-07 3.88071 -1.09278e-07 2.5C-1.09278e-07 1.11929 1.11929 0 2.5 0L11.9084 0L8.64563 5Z" fill="rgb(216,216,216)" fill-opacity="0" fill-rule="evenodd" transform="matrix(1,0,0,-1,9,23)" />
			<path id="路径备份" d="M8.64563 5L2.5 5C1.11929 5 -1.09278e-07 3.88071 -1.09278e-07 2.5C-1.09278e-07 1.11929 1.11929 0 2.5 0L11.9084 0" fill-rule="evenodd" stroke="rgb(255,255,255)" stroke-width="1.5" transform="matrix(1,0,0,-1,9,23)" />
			<rect id="矩形" width="3" height="3" x="20.5" y="21.5" rx="1.5" fill="rgb(18,119,255)" fill-opacity="0" />
			<rect id="矩形" width="3" height="3" x="20.5" y="21.5" rx="1.5" stroke="rgb(255,255,255)" stroke-width="1.5" />
			<rect id="矩形备份 16" width="3" height="3" x="0" y="0" rx="1.5" fill="rgb(216,216,216)" fill-opacity="0" transform="matrix(0.707107,0.707107,-0.707107,0.707107,10.5,10.8787)" />
			<rect id="矩形备份 16" width="3" height="3" x="0" y="0" rx="1.5" stroke="rgb(255,255,255)" stroke-width="1.5" transform="matrix(0.707107,0.707107,-0.707107,0.707107,10.5,10.8787)" />
		</g>
	</g>
  </svg>
</template>