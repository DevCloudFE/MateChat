<template>
  <div class="camera-container" @click="openCamera">
    <img src="/camera.svg" alt="Camera" class="camera-icon" />
    <span>相机</span>
  </div>
  
  <!-- 相机组件弹窗 -->
  <Camera 
    v-if="showCamera" 
    :visible="showCamera" 
    @close="closeCamera" 
    @capture="handleCapture" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Camera from './camera.vue';

// 控制相机组件的显示与隐藏
const showCamera = ref(false);

// 打开相机
const openCamera = () => {
  showCamera.value = true;
};

// 关闭相机
const closeCamera = () => {
  showCamera.value = false;
};

// 处理拍照结果
const handleCapture = (imageData: string) => {
  // 这里可以根据需要处理拍照结果，例如上传图片或添加到消息中
  console.log('Captured image data:', imageData);
  closeCamera();
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.camera-container {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 30px;
  color: $devui-text;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;

  .camera-icon {
    width: 14px;
    height: 14px;
  }

  span {
    font-size: $devui-font-size-sm;
  }

  &:hover {
    background-color: var(--devui-icon-hover-bg);
  }
}

@media screen and (max-width: 520px) {
  .camera-container span {
    display: none;
  }
}
</style>