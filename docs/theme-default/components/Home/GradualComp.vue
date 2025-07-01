<template>
  <div class="gradual-container">
    <div class="title">体验无边界 业务无侵害</div>
    <div class="title-desc">
      MateChat致力于构建不同业务场景下高一致性的GenAI体验系统语言，同时匹配各种工具/平台的原生业务场景和界面特征，提供更适合研发工具领域的对话组件，打造流畅亲和、跨界一致、易学易用的用户体验，以及易接入、易维护、易扩展的开发体验。
    </div>
    <div class="gradual-video">
      <video
        ref="vWebRef"
        class="top"
        muted
        src="/png/home/gradualWeb.mp4"
        poster="/png/home/gradualTop.png">
      </video>
      <video
        ref="vIDERef"
        class="bottom"
        muted
        @mouseenter="startIDEPlay()"
        @mouseout="stopIDE()"
        src="/png/home/gradualIDE.mp4"
        poster="/png/home/gradualBottom.png"
      ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const vWebRef = ref();
const vIDERef = ref();

onMounted(() => {
  vWebRef.value.addEventListener('loadeddata', () => {
    vWebRef.value.play();
  })
  vWebRef.value.addEventListener('ended', webPlay);
});

const webPlay = () => {
  if (vWebRef.value) {
    vWebRef.value.play();
  }
};
const IDEPlay = () => {
  if (vIDERef.value) {
    vIDERef.value.play();
  }
};

function startIDEPlay() {
  vWebRef.value.pause();
  IDEPlay();
  vIDERef.value.addEventListener('ended', IDEPlay);
}

function stopIDE() {
  vIDERef.value.pause();
  vIDERef.value.removeEventListener('ended', IDEPlay);
  webPlay();
}
</script>

<style lang="scss" scoped>
@use 'devui-theme/styles-var/devui-var.scss' as *;
@use './common.scss';

.gradual-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.gradual-video {
  margin-top: 80px;
  margin-bottom: 42px;
  padding-bottom: 98px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: no-repeat url(/png/home/gradual/videoBg.svg);
  background-size: contain;
  background-position: center 100px;
  video {
    position: relative;
    width: 40%;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  .top {
    z-index: 2;
    transform: translateX(20%);
    &:hover {
      transform: translateX(20%) scale(1.1);
    }
  }
  .bottom {
    z-index: 1;
    transform: translateX(-20%);
    &:hover {
      z-index: 3;
      transform: translateX(-20%) scale(1.1);
    }
  }
}
@media (max-width: 1600px) {
  .gradual-video {
    margin: 56px 0 0 0;
    padding-bottom: 56px;
    background-position: center 50px;
  }
}

@media (max-width: 768px) {
  .gradual-video {
    background-size: 80%;
    background-position: center 10px;
  }
}
</style>
