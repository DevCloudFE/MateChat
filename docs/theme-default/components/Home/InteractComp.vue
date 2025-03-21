<template>
  <div class="interact-container" ref="interactRef" @mousewheel="onMouseWheel($event)">
    <div class="title">构建通用GenAI交互体系</div>
    <div class="title-desc">MateChat聚焦于打造对话式交互的关键体验，致力于在多元业务场景下，构建高度一致的GenAI语言交流系统。</div>
    <div class="content">
      <div class="steps" ref="stepsRef">
        <ul>
          <div class="cartoon-line" ref="cartoonLine"></div>
          <div class="cartoon-dot" ref="cartoonDot" @transitionend="onTransitionEnd()"></div>
          <li v-for="(item, i) in steps" :key="i" ref="listItems">
            <div class="line" :class="{ active: i <= index - 1 || (index === 4 && i === 4) }"></div>
            <div class="row">
              <div class="dot" :class="{ active: i <= index }"></div>
              <div class="label" :class="{ 'active-label': i === index }" @click="onStepClick(i)">
                {{ item.label }}<span>{{ item.labelNext }}</span>
              </div>
            </div>
            <div class="desc">{{ item.desc }}</div>
          </li>
          <li>
            <a v-localeHref="'/playground/playground.html'">
              <div class="trial-btn" style="margin-left: 78px">
                立即体验
                <img src="/logo.svg" data-src="/png/home/interact/arrow-right.svg" />
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="steps-h">
        <ul>
          <div class="cartoon-line-h" ref="cartoonLineH"></div>
          <div class="cartoon-dot-h" ref="cartoonDotH"></div>
          <li v-for="(item, i) in steps" :key="i" ref="listItemsH">
            <div class="line-h" :class="{ active: i <= index - 1 || (index === 4 && i === 4) }"></div>
            <div class="row-h">
              <div class="dot-h" :class="{ active: i <= index }"></div>
              <div class="label-h" :class="{ 'unactivated-label': i !== index }" @click="onHStepClick(i)">
                {{ item.label }}<span>{{ item.labelNext }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="demo">
        <!-- <InteractCarousel ref="carouselRef" class="demo-carousel"></InteractCarousel> -->
        <img class="left" src="/logo.svg" data-src="/png/home/interact/interLeft.png" />
        <img ref="imgRef" class="center" :src="imgs[0]" />
        <img class="right" src="/logo.svg" data-src="/png/home/interact/interRight.png" />
      </div>
      <div class="btn-h">
        <a v-localeHref="'/playground/playground.html'" style="display: flex; align-items: center; justify-content: center">
          <div class="trial-btn">
            立即体验
            <img src="/logo.svg" data-src="/png/home/interact/arrow-right.svg" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, nextTick, watch } from 'vue';
import InteractCarousel from './InteractCarousel.vue';

const imgRef = ref();
const steps = [
  {
    label: '快速',
    labelNext: '唤醒',
    desc: '固定入口、情境建议或快捷键...不管是DevOps类平台还是IDE，总有最灵巧的唤醒方式',
  },
  {
    label: '轻松',
    labelNext: '使用',
    desc: '适时的引导和手边提示，为产品的易学易用性保驾护航',
  },
  {
    label: '自由',
    labelNext: '表达',
    desc: '专为与GenAI对话打造的输入区域，功能完善，易于配置扩展',
  },
  {
    label: '过程',
    labelNext: '监督',
    desc: '帮助用户正确理解AI系统内部状态，促进良性的人机互动',
  },
  {
    label: '可读',
    labelNext: '性强',
    desc: '有层次、有逻辑的Markdown语法渲染样式和清晰直观的界面布局，提供最佳阅读体验',
  },
];
const imgs = [
  '/png/home/interact/1.png',
  '/png/home/interact/2.png',
  '/png/home/interact/3.png',
  '/png/home/interact/4.png',
  '/png/home/interact/5.png',
];

let flag = false;
const maxIndex = computed(() => steps.length - 1);
const interactRef = ref();
const stepsRef = ref();
const carouselRef = ref();

const listItems = ref();
const index = ref(0);
const cartoonLine = ref();
const cartoonDot = ref();
let lisHeight = [];

// horizontal
const listItemsH = ref();
const cartoonLineH = ref();
const cartoonDotH = ref();
let listWidth = [];

watch(index, () => {
  if (!imgRef.value) {
    return;
  }
  imgRef.value.style.opacity = 0.5;
  setTimeout(() => {
    imgRef.value.src = imgs[index.value];
    imgRef.value.style.opacity = 1;
  }, 300);
});

onMounted(() => {
  lisHeight = listItems.value.map((li) => li.clientHeight);
  listWidth = listItemsH.value.map((li) => li.clientWidth);

  window.addEventListener('resize', getSize);
});

function getSize() {
  onStepClick(index.value);
  onHStepClick(index.value);
}

async function onStepClick(i) {
  if (!cartoonLine.value) {
    return;
  }
  index.value = i;
  await nextTick();
  // carouselRef.value.go(index.value);
  lisHeight = listItems.value.map((li) => li.clientHeight);
  const height = lisHeight.slice(0, i).reduce((a, b) => a + b, 0);
  cartoonLine.value.style.height = height + 20 + 'px';
  cartoonDot.value.style.transform = `translateX(-44px) translateY(${height - 20}px)`;
}

function onHStepClick(i) {
  if (!cartoonLineH.value) {
    return;
  }
  listWidth = listItemsH.value.map((li) => li.clientWidth);
  index.value = i;
  const width = listWidth.slice(0, i).reduce((a, b) => a + b, 0);
  cartoonLineH.value.style.height = width + 20 + 'px';
  cartoonDotH.value.style.transform = `translateY(-12px) translateX(${width}px)`;
}

function onMouseWheel(e) {
  if (stepsRef.value.clientWidth == 0) {
    return;
  }
  if (index.value === 0 && e.deltaY < 0) {
    return;
  }
  if (index.value === maxIndex.value && e.deltaY > 0) {
    return;
  }
  const rect = interactRef.value.getBoundingClientRect();
  const fix = document.documentElement.clientHeight + 200;
  if (rect.top < 0 || rect.top + interactRef.value.clientHeight > fix) {
    return;
  }
  e.preventDefault();
  if (flag) {
    return;
  }
  if (e.deltaY > 0) {
    index.value++;
    flag = true;
  }
  if (e.deltaY < 0) {
    index.value--;
    flag = true;
  }
  onStepClick(index.value);
}

function onTransitionEnd() {
  flag = false;
}
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';
@import './common.scss';

.interact-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content {
  margin: 98px 0;
  margin-bottom: 140px;
  width: 80%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 25px;
  transform: translateX(6%);
}
.steps {
  display: flex;
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
  }
  .line {
    position: absolute;
    top: 0;
    left: 7px;
    width: 2px;
    height: 100%;
    background-color: #DFE0F4;
    transition: all 0.8s linear;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 42px;
    font-size: 28px;
    .dot {
      width: 16px;
      height: 16px;
      background-color: #DFE0F4;
      border-radius: 50%;
      transition: all 0.8s linear;
    }
    .label {
      cursor: pointer;
    }
    .active-label {
      font-size: 30px;
      font-weight: bold;
      span {
        color: $devui-link;
      }
    }
  }
  .desc {
    padding: 12px 0 32px 0;
    padding-left: 58px;
    font-size: 16px;
    color: $devui-aide-text;
  }
  .active {
    opacity: 0;
  }
  li:last-child > .line {
    height: 30px;
  }
  .cartoon-line {
    position: absolute;
    z-index: 1;
    width: 8px;
    height: 20px;
    left: 4px;
    background: no-repeat center/cover url(/png/home/interLine.svg);
    transition: all 0.8s linear;
  }
  .cartoon-dot {
    position: absolute;
    z-index: 2;
    width: 98px;
    height: 98px;
    background: no-repeat center/cover url(/png/home/interact/dot.svg);
    transform: translateX(-44px) translateY(-12px);
    transition: all 0.8s linear;
  }
}

.trial-btn {
  display: flex;
  gap: 4px;
  width: fit-content;
  padding: 15px 30px;
  border-radius: 30px;
  background: linear-gradient(135deg, #B369FF, #7B79FF);
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s ease-in-out;
  color: $devui-light-text;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
}

.demo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 36%;
    object-fit: contain;
    transition: all 0.3s linear;
  }
  .left {
    position: absolute;
    z-index: 1;
    transform: translateX(-30%) translateY(70%);
  }
  .center {
    z-index: 3;
  }
  .right {
    position: absolute;
    z-index: 2;
    transform: translateX(30%) translateY(-30%);
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   display: block;
  //   width: 20%;
  //   height: 20%;
  //   background: no-repeat center / cover url(/png/home/interact/sticker.png);
  //   transform: translateX(-30%) translateY(70%);
  // }
}

.steps-h {
  display: none;
  width: 90%;
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
  }
  ul {
    display: flex;
    padding: 0 2em;
    margin-bottom: 56px;
  }
  .line-h {
    position: absolute;
    top: 7px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #DFE0F4;
    transition: all 0.8s linear;
  }
  .row-h {
    display: flex;
    flex-direction: column;
    padding: 0 1em;
    gap: 14px;
    font-size: 14px;
    .dot-h {
      width: 16px;
      height: 16px;
      background-color: #DFE0F4;
      border-radius: 50%;
      transition: all 0.8s linear;
    }
    .label-h {
      cursor: pointer;
      &.unactivated-label {
        color: $devui-aide-text;
      }
    }
  }
  .active {
    opacity: 0;
  }

  // 动线
  .cartoon-line-h {
    position: absolute;
    top: 8px;
    z-index: 1;
    width: 8px;
    height: 20px;
    transform-origin: top;
    transform: rotateZ(-90deg);
    background: no-repeat center/cover url(/png/home/interLine.svg);
    transition: all 0.8s linear;
  }
  .cartoon-dot-h {
    position: absolute;
    z-index: 2;
    width: 40px;
    height: 40px;
    background: no-repeat center/cover url(/logo.svg);
    transform: translateY(-12px);
    transition: all 0.8s linear;
  }
}
.btn-h {
  display: none;
}

@media (max-width: 1600px) {
  .content {
    margin: 56px 0 78px 0;
  }
  .steps {
    display: block;
    .row {
      font-size: 18px;
    }
    .desc {
      font-size: 12px;
      padding: 8px 0 20px 0;
      padding-left: 58px;
    }
  }
  li:last-child {
    .line {
      height: 18px;
    }
  }
}
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
    margin: 56px 0 78px 0;
    transform: translate(0);
  }
  .steps {
    display: none;
  }

  .steps-h {
    display: flex;
    justify-content: center;
  }
  .btn-h {
    display: block;
  }
  .trial-btn {
    padding: 10px 15px;
    font-size: 14px;
    align-items: center;
  }
}
</style>
