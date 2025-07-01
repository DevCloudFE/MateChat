<template>
  <div class="related-container">
    <div class="title">相关资源</div>
    <div class="content">
      <template v-for="(item, i) in list" :key="i">
        <div
          class="info-container"
          @mouseover="onMouseOver($event, item, i)"
          @mouseout="onMouseOut(item)">
          <a class="info" :href="item.href" rel="noopener noreferrer" target="_blank">
            <img :src="item.icon" />
            {{ item.label }}
          </a>
          <img v-if="item.expandImg" class="expand" :data-index="i" :class="{'active': item.hover}" :src="item.expandImg"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
const list = ref([
  {
    label: 'GitCode',
    href: 'https://gitcode.com/DevCloudFE/MateChat/overview',
    icon: '/png/footer/gitcode.svg',
    hover: false,
  },
  {
    label: 'DevUI Design',
    href: 'https://devui.design/home',
    icon: '/png/footer/devui.svg',
    hover: false,
  },
  {
    label: 'DevUI团队',
    href: 'https://juejin.cn/user/712139267650141',
    icon: '/png/footer/juejin.svg',
    hover: false,
  },
  {
    label: 'DevUI Design',
    href: 'https://zhuanlan.zhihu.com/devui',
    icon: '/png/footer/zhihu.svg',
    hover: false,
  },
  {
    label: '官方交流群',
    icon: '/png/footer/wechat.svg',
    expandImg: '/png/footer/wechat.jpg',
    hover: false,
  },
]);

async function onMouseOver(event, item, i) {
  if (!item.expandImg) {
    return;
  }
  const rect = event.target.getBoundingClientRect();
  const disR = document.documentElement.clientWidth - rect.right;
  const expandEl = document.querySelector(
    `img.expand[data-index='${i}']`,
  ) as HTMLElement;
  if (!expandEl) {
    return;
  }
  if (disR < 300) {
    expandEl.style.transformOrigin = 'right bottom';
  } else {
    expandEl.style.transformOrigin = 'left bottom';
  }
  await nextTick();
  item.hover = true;
}

function onMouseOut(item) {
  if (!item.expandImg) {
    return;
  }
  item.hover = false;
}
</script>

<style lang="scss" scoped>
@use 'devui-theme/styles-var/devui-var.scss' as *;

.related-container {
  width: 100%;
  padding: 20px 60px;
  color: $devui-light-text;
  background: no-repeat center/cover url(/png/home/footerBg.png);
  .title {
    margin-bottom: 20px;
    font-size: 16px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 100px;
  font-size: 14px;
  .info-container {
    position: relative;
    width: 120px;
    &:hover {
      cursor: pointer;
    }
  }
  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    width: auto;
    img {
      height: 1em;
      object-fit: contain;
    }
  }
  a:hover {
    color: $devui-link-light;
  }
  .expand {
    position: absolute;
    display: none;
    left: 0;
    bottom: 2em;
    width: 160px;
    border-radius: 8px;
    transform-origin: left bottom;
    transition: all 0.1s linear;
    transform: scale(2.5);
    &.active {
      display: block !important;
    }
  }
}

@media (max-width: 1600px) {
  .content .expand{
    border-radius: 4px;
  }
}
</style>
