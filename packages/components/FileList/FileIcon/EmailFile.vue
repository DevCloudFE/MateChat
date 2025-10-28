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
    <mask id="mask_14" width="28" height="22" x="2" y="5" maskUnits="userSpaceOnUse" mask-type="outline">
		<g filter="url(#pixso_custom_mask_type_outline)">
			<use xlink:href="#use_14" />
		</g>
	</mask>
	<defs>
		<g id="use_14">
			<rect id="蒙版" width="28" height="22" x="2" y="5" rx="4" fill="rgb(255,136,0)" />
			<rect id="蒙版" width="27" height="21" x="2.5" y="5.5" rx="4" stroke="rgb(223,225,230)" stroke-opacity="0" stroke-width="1" />
		</g>
		<filter id="pixso_custom_mask_type_outline">
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 255 0 " />
		</filter>
		<linearGradient id="paint_linear_0" x1="14.3386717" x2="14.3386717" y1="0" y2="11.6952209" gradientUnits="userSpaceOnUse">
			<stop stop-color="rgb(246,247,253)" offset="0" stop-opacity="1" />
			<stop stop-color="rgb(233,237,250)" offset="1" stop-opacity="1" />
		</linearGradient>
		<linearGradient id="paint_linear_1" x1="16" x2="16" y1="3" y2="17" gradientUnits="userSpaceOnUse">
			<stop stop-color="rgb(246,247,253)" offset="0" stop-opacity="1" />
			<stop stop-color="rgb(233,237,250)" offset="1" stop-opacity="1" />
		</linearGradient>
	</defs>
	<g id="邮件">
		<rect id="矩形" width="32" height="32" x="0" y="0" rx="4" fill="rgb(238,240,245)" fill-opacity="0" />
		<rect id="矩形" width="31" height="31" x="0.5" y="0.5" rx="4" stroke="rgb(151,151,151)" stroke-opacity="0" stroke-width="1" />
		<g id="矩形" mask="url(#mask_14)">
			<use xlink:href="#use_14" />
			<path id="形状" d="M0.341524 1.75256L11.7046 11.6952L0.999972 0C0.711642 0 0.43735 0.124481 0.247408 0.341492C-0.116239 0.757141 -0.074125 1.38889 0.341524 1.75256ZM27.6773 0C28.2296 0 28.6773 0.447723 28.6773 1C28.6773 1.28836 28.5528 1.56268 28.3358 1.75256L16.9727 11.6952L27.6773 0Z" opacity="0" fill="url(#paint_linear_0)" fill-opacity="0" fill-rule="evenodd" transform="matrix(1,0,0,-1,1.66125,27.4999)" />
			<path id="形状" d="M0.341524 1.75256L11.7046 11.6952L0.999972 0C0.711642 0 0.43735 0.124481 0.247408 0.341492C-0.116239 0.757141 -0.074125 1.38889 0.341524 1.75256ZM27.6773 0C28.2296 0 28.6773 0.447723 28.6773 1C28.6773 1.28836 28.5528 1.56268 28.3358 1.75256L16.9727 11.6952L27.6773 0Z" opacity="0" fill-rule="evenodd" stroke="rgb(255,255,255)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="matrix(1,0,0,-1,1.66125,27.4999)" />
			<path id="矩形" d="M2.66145 3L29.3386 3C30.2619 3 30.692 4.14454 29.9971 4.75258L18.634 14.6952C17.1259 16.0148 14.8741 16.0148 13.366 14.6952L2.00294 4.75258C1.30804 4.14454 1.73808 3 2.66145 3Z" fill="url(#paint_linear_1)" fill-opacity="0" fill-rule="evenodd" />
			<path id="矩形" d="M29.3386 3C30.2619 3 30.692 4.14454 29.9971 4.75258L18.634 14.6952C17.1259 16.0148 14.8741 16.0148 13.366 14.6952L2.00294 4.75258C1.30804 4.14454 1.73808 3 2.66145 3L29.3386 3Z" fill-rule="evenodd" stroke="rgb(255,255,255)" stroke-width="1.5" />
			<path id="矢量 789" d="M0 0L15.5563 0" stroke="rgb(255,255,255)" stroke-width="1.5" transform="matrix(0.707107,-0.707107,0.707107,0.707107,3,26)" />
			<path id="矢量 789" d="M0 0L15.5563 0" stroke="rgb(255,255,255)" stroke-width="1.5" transform="matrix(-0.707107,-0.707107,-0.707107,0.707107,29,26)" />
		</g>
	</g>
  </svg>
</template>