<template>
  <div class="main-container">
    <div class="model">
      <!-- <Scene3D class="scene-container"></Scene3D> -->
      <img class="model-img" src="/png/home/bigLogo.png" />
      <img class="model-text" src="/png/home/homeText.png" />
    </div>
    <div class="main-input">
        <div class="use-panel">
          <div class="use">如何接入使用</div>
        </div>
        <a v-localeHref="'/use-guide/introduction.html'">
          <div class="btn-send">{{ $t('home.send') }}</div>
        </a>
      </div>
    <div class="main-text">- <span class="light-text">生成式人工智能</span> 体验设计系统 & 前端解决方案 -</div>
    <a v-localeHref="'/components/introduction/demo.html'">
      <div class="btn-learn">开始使用</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import Scene3D from './Scene3D.vue';
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';

.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.model {
  position: relative;
  width: 65%;
  height: 60%;
  .scene-container {
    width: 100%;
    height: 100%;
  }
  .model-img, .model-text {
    position: absolute;
    width: 120%;
    height: 120%;
    object-fit: contain;
  }
  .model-text {
    z-index: 2;
  }
}
.main-input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  padding-left: 52px;
  background-image: url(/png/home/star.png);
  background-repeat: no-repeat;
  background-position: 16px center;
  background-size: 4%;
  font-size: 22px;
  z-index: 2;
  .use-panel {
    width: 11em;
    display: flex;
    align-items: baseline;
  }
  .use {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    animation: showText 1s steps(6) forwards;
  }

  .use::after {
    content: '';
    position: absolute;
    width: 2px;
    right: 0;
    height: 100%;
    animation: blink 0.5s steps(2) infinite;
  }

  .btn-send {
    margin: 5px 5px 5px 150px;
    width: 88px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    text-align: center;
    background: linear-gradient(135deg, #B369FF, #7B79FF);
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease-in-out;
    color: $devui-light-text;
    cursor: pointer;
    font-size: 20px;
    text-indent: 1px;
  }
  .btn-send:hover {
    transform: scale(1.05);
  }
}

.main-text {
  .light-text {
    color: $devui-link-active;
  }
}
.btn-learn {
  // background: linear-gradient(to right, #f157ff, #7b79ff);
  margin-top: 5vh;
  width: 252px;
  height: 84px;
  line-height: 84px;
  border-radius: 84px;
  text-align: center;
  background: linear-gradient(135deg, #B369FF, #7B79FF);
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s ease-in-out;
  color: $devui-light-text;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  &:hover {
    transform: scale(1.05);
    background: no-repeat center/cover url(/png/home/btnActive.png);
  }
}

@keyframes showText {
  0% {
    width: 0;
  }
  100% {
    width: 6.1em;
  }
}

@keyframes blink {
  0% {
    border-left: 2px solid transparent;
  }

  100% {
    border-left: 2px solid $devui-text;
  }
}

@keyframes rockText {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

@media (max-width: 1600px) {
  .model {
    .text1,
    .text2,
    .text3 {
      transform: scale(0.8);
    }
  }
  .btn-learn {
    width: 194px;
    height: 65px;
    line-height: 65px;
    font-size: 25px;
  }
}
@media (max-width: 768px) {
  .model {
    height: 35%;
  }
  .main-input {
    padding-left: 38px;
    font-size: 14px;
    .btn-send {
      margin-left: 50px;
      width: 44px;
      height: 26px;
      line-height: 26px;
      border-radius: 26px;
      font-size: 12px;
    }
  }
  .main-text {
    font-size: 12px;
  }
  .btn-learn {
    width: 126px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
  }
}
</style>
