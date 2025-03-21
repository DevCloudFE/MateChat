<template>
  <div class="ai-container">
    <div class="title">匹配不同业务类型的生成式AI体验</div>
    <div class="banner">
      <div class="scene" v-for="(item, i) in list" :key="i" :class="{ active: index === i }" @mouseenter="index = i">
        <div class="label">{{ item.label }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="content">
      <img class="bottom" :src="list[index].img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const list = [
  {
    label: '协作式',
    desc: '助力原平台开启更多智慧体验',
    img: '/png/home/ai/cooperation.png',
  },
  {
    label: '沉浸式',
    desc: '不只是对话，还有更完整的GenAI交互生态资源',
    img: '/png/home/ai/immerse.png',
  },
  {
    label: '情境式',
    desc: '更适合研发场景、融入作业流程的体验套件',
    img: '/png/home/ai/scene.png',
  },
];

const index = ref(1);
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';
@import './common.scss';

.ai-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.banner {
  margin: 80px 0 56px 0;
  width: 60%;
  display: flex;
  justify-content: center;
  gap: 24px;
  .scene {
    flex: 1;
    max-width: 382px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    border-radius: 24px;
    background:
      no-repeat center/cover url(/png/home/aiDefault.png),
      rgba(255, 255, 255, 0.8);
    color: #43406D;
    cursor: pointer;
    &.active {
      color: rgba(255, 255, 255, 0.8);
      background:
        no-repeat center/cover url(/png/home/aiDefault.png),
        linear-gradient(to right, #f157ff, #7b79ff);
      .desc {
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .label {
      margin-bottom: 10px;
      font-size: 28px;
      font-weight: bold;
      line-height: 1.5;
    }
    .desc {
      font-size: 16px;
      color: $devui-aide-text;
    }
  }
}
.content {
  width: 80%;
  display: flex;
  justify-content: center;
  background: no-repeat url(/png/home/ai/contentBg.svg);
  background-size: 100%;
  background-position: center;
  img {
    width: 90%;
    object-fit: contain;
  }
  padding-bottom: 140px;
}
@media (max-width: 1600px) {
  .banner {
    margin: 56px 0 30px 0;
    .scene {
      padding: 15px;
      border-radius: 12px;
      .label {
        font-size: 18px;
      }
      .desc {
        font-size: 11px;
      }
    }
  }
  .content {
    padding-bottom: 56px;
  }
}
@media (max-width: 768px) {
  .banner {
    width: 80%;
    margin: 56px 0 30px 0;
    .scene {
      .label {
        font-size: 12px;
        text-align: center;
        margin-bottom: 0;
      }
      .desc {
        display: none;
      }
    }
  }
}
</style>
