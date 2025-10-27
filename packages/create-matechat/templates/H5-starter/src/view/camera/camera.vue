<template>
  <div class="camera-modal" v-if="visible" @click="handleBackdropClick">
    <div class="camera-header">
      <button class="close-button" @click="handleClose">×</button>
      <h3>相机</h3>
      <div class="spacer"></div>
    </div>
    
    <div class="camera-preview-container">
      <video ref="videoElement" autoplay playsinline muted></video>
      <canvas ref="canvasElement" class="hidden"></canvas>
      
      <!-- 相机加载指示器 -->
      <div v-if="loading" class="camera-loading">
        <div class="spinner"></div>
        <p>相机加载中...</p>
      </div>
      
      <!-- 权限错误提示 -->
      <div v-if="permissionError" class="camera-error">
        <p>无法访问相机，请检查权限设置</p>
        <button class="retry-button" @click="initCamera">重试</button>
      </div>
    </div>
    
    <div class="camera-controls">
      <button class="capture-button" @click="captureImage" :disabled="loading || permissionError">
        <div class="capture-circle"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { usePageState } from '@/store/pageState';

const { setIsCameraPage } = usePageState();

onMounted(() => {
  setIsCameraPage(true);
});

onUnmounted(() => {
  setIsCameraPage(false);
});

// Props
const props = defineProps<{
  visible: boolean;
}>();

// Emits
const emit = defineEmits<{
  close: [];
  capture: [imageData: string];
}>();

// Refs
const videoElement = ref<HTMLVideoElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const stream = ref<MediaStream | null>(null);

// States
const loading = ref(false);
const permissionError = ref(false);

// 初始化相机
const initCamera = async () => {
  if (!props.visible || !videoElement.value) return;
  
  loading.value = true;
  permissionError.value = false;
  
  try {
    // 检查是否为安全上下文（HTTPS）
    const isSecureContext = window.isSecureContext;
    console.log('是否为安全上下文(HTTPS):', isSecureContext);
    
    if (!isSecureContext) {
      console.error('错误: 应用运行在非安全上下文环境(HTTP)，getUserMedia API 在非HTTPS环境下被浏览器限制');
      permissionError.value = true;
      loading.value = false;
      // 向用户显示明确的错误信息
      alert('相机访问错误：\n\n为保护您的隐私安全，浏览器要求必须在HTTPS安全连接下才能访问相机功能。\n\n请切换到HTTPS环境或使用localhost开发服务器。');
      return; // 停止后续的相机初始化流程
    }
    
    // 停止之前的流（如果存在）
    if (stream.value) {
      stream.value.getTracks().forEach(track => track.stop());
    }
    
    // 先尝试使用简单的配置
    try {
      // 简单配置 - 更容易成功获取相机
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      console.log('成功获取相机流（简单配置）');
    } catch (simpleError) {
      console.log('尝试简单配置失败，尝试使用完整配置:', simpleError);
      // 尝试使用原始的完整配置
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // 使用后置摄像头
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      console.log('成功获取相机流（完整配置）');
    }
    
    // 设置视频源
    if (videoElement.value) {
      videoElement.value.srcObject = stream.value;
      
      // 等待视频元数据加载完成后，设置canvas尺寸
      videoElement.value.onloadedmetadata = () => {
        if (canvasElement.value && videoElement.value) {
          canvasElement.value.width = videoElement.value.videoWidth;
          canvasElement.value.height = videoElement.value.videoHeight;
          console.log(`设置canvas尺寸: ${canvasElement.value.width}x${canvasElement.value.height}`);
        }
      };
    }
    
    // 获取设备信息用于调试
    const videoTracks = stream.value.getVideoTracks();
    console.log(`成功获取${videoTracks.length}个视频轨道`);
    if (videoTracks.length > 0) {
      const trackSettings = videoTracks[0].getSettings();
      console.log('相机设置:', trackSettings);
    }
  } catch (error) {
    console.error('Camera initialization error:', error);
    permissionError.value = true;
    
    // 更详细的错误信息
    if (error instanceof DOMException) {
      let errorMsg = '';
      switch (error.name) {
        case 'NotAllowedError':
          errorMsg = '用户拒绝了相机权限';
          break;
        case 'NotFoundError':
          errorMsg = '没有找到可用的相机设备';
          break;
        case 'NotReadableError':
          errorMsg = '相机设备被其他应用占用';
          break;
        case 'OverconstrainedError':
          errorMsg = '无法满足相机参数要求';
          break;
        case 'SecurityError':
          errorMsg = '安全错误，可能是浏览器策略限制';
          break;
        default:
          errorMsg = `相机错误: ${error.message}`;
      }
      console.error('相机错误详情:', error.name, '-', errorMsg);
    }
  } finally {
    loading.value = false;
  }
};

// 捕获图像
const captureImage = () => {
  if (!canvasElement.value || !videoElement.value || loading.value || permissionError.value) return;
  
  // 在canvas上绘制当前视频帧
  const ctx = canvasElement.value.getContext('2d');
  if (ctx) {
    ctx.drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height);
    
    // 将canvas内容转换为base64格式的图片数据
    const imageData = canvasElement.value.toDataURL('image/jpeg', 0.9);
    
    // 发送捕获的图像数据
    emit('capture', imageData);
  }
};

// 关闭相机
const handleClose = () => {
  stopCamera();
  emit('close');
};

// 停止相机流
const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }
};

// 点击背景关闭相机（可选功能）
const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    handleClose();
  }
};

// 组件挂载时添加监听器
onMounted(() => {
  // 为了兼容性，检查浏览器是否支持getUserMedia
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia is not supported in this browser');
    permissionError.value = true;
  } else {
    console.log('浏览器支持getUserMedia API');
    // 当组件挂载并且visible为true时初始化相机
    if (props.visible) {
      initCamera();
    }
    
    // 尝试列出可用的媒体输入设备（需要用户授权）
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        console.log('可用媒体设备数量:', devices.length);
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('可用相机设备数量:', videoDevices.length);
        videoDevices.forEach((device, index) => {
          console.log(`相机设备 ${index + 1}:`, device.label || '未命名设备');
        });
      })
      .catch(err => {
        console.log('获取设备列表失败（需要相机权限）:', err);
      });
  }
});

// 组件卸载时停止相机
onUnmounted(() => {
  stopCamera();
});

// 使用watch监听visible属性变化
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    initCamera();
  } else {
    stopCamera();
  }
});
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.camera-header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  
  .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h3 {
    margin: 0 auto;
    font-size: 18px;
    font-weight: 500;
  }
  
  .spacer {
    width: 32px;
  }
}

.camera-preview-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  canvas.hidden {
    display: none;
  }
  
  .camera-loading {
    position: absolute;
    color: white;
    text-align: center;
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    
    p {
      margin: 0;
      font-size: 16px;
    }
  }
  
  .camera-error {
    position: absolute;
    color: white;
    text-align: center;
    padding: 20px;
    
    p {
      margin: 0 0 16px;
      font-size: 16px;
    }
    
    .retry-button {
      background-color: var(--devui-primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  }
}

.camera-controls {
  display: flex;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  
  .capture-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    .capture-circle {
      width: 70px;
      height: 70px;
      border: 3px solid white;
      border-radius: 50%;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border: 3px solid white;
        border-radius: 50%;
      }
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .camera-header {
    padding: 12px;
    
    h3 {
      font-size: 16px;
    }
  }
  
  .camera-controls {
    padding: 20px;
    
    .capture-button .capture-circle {
      width: 60px;
      height: 60px;
      
      &::before {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>