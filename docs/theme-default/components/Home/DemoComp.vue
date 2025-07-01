<template>
  <div class="comp-container">
    <div class="title">应用案例</div>
    <div class="content">
      <div class="case">
        <div class="label">
          <img src="/logo.svg" data-src="/png/home/demoLogo.png" />
          InsCode AI IDE
        </div>
        <div class="desc">
          InsCode AI IDE 是由 CSDN 、GitCode 和华为云 CodeArts IDE 联合开发的 AI
          跨平台集成开发环境。使用MateChat灵活丰富的组件资源，InsCode快速完成了IDE AI插件的设计搭建，为开发者提供高效、便捷的IDE编程体验。
        </div>
      </div>
      <div class="video-container">
        <video
          ref="vDemoRef"
          class="top"
          muted
          src="/png/home/demo.mp4"
          poster="/png/home/demo.png">
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const vDemoRef = ref();

onMounted(() => {
  vDemoRef.value.addEventListener('loadeddata', () => {
    vDemoRef.value.play();
  });
  vDemoRef.value.addEventListener('ended', webPlay);
});

const webPlay = () => {
  if (vDemoRef.value) {
    vDemoRef.value.play();
  }
};
</script>

<style lang="scss" scoped>
@use 'devui-theme/styles-var/devui-var.scss' as *;
@use './common.scss';

.comp-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content {
  width: 80%;
  margin: 80px 0 160px 0;
  display: flex;
  align-items: center;
  .case {
    max-width: min(30%, 375px);
    margin-right: 30px;
    .label {
      display: flex;
      align-items: center;
      font-size: 36px;
      margin-bottom: 32px;
      img {
        margin-right: 8px;
        width: 1em;
        height: 1em;
      }
    }
    .desc {
      font-size: 16px;
    }
  }
  .video-container {
    flex: 1;
    width: 60%;
    video {
      width: 100%;
      object-fit: contain;
      border-radius: 24px;
    }
  }
}

@media (max-width: 1600px) {
  .content {
    margin: 56px 0;
    .case {
      .label {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .desc {
        font-size: 11px;
      }
    }
    .video-container video {
      border-radius: 12px;
    }
  }
}
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    margin: 40px 0 56px 0;
    .case {
      max-width: 100%;
      margin-right: 0;
      margin-bottom: 30px;
      .label {
        font-size: 16px;
        margin-bottom: 0;
      }
      .desc {
        display: none;
      }
    }
    .video-container {
      width: 90%;
    }
  }
}
</style>
