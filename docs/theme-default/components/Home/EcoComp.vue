<template>
  <div class="eco-container">
    <div class="title">技术生态</div>
    <div class="content">
      <div class="partner" v-for="(item, i) in list" :key="i">
        <img src="/logo.svg" :data-src="item.img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  {
    img: '/png/home/ecoLogo.png',
  },
  {
    img: '/png/home/ecoLogo.png',
  },
  {
    img: '/png/home/ecoLogo.png',
  },
];
</script>

<style lang="scss" scoped>
@use 'devui-theme/styles-var/devui-var.scss' as *;
@use './common.scss';

.eco-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content {
  width: 60%;
  margin: 98px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .partner {
    width: 30%;
    padding: 5% 0;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30%;
      object-fit: contain;
    }
  }
}
@media (max-width: 1600px) {
  .content {
    margin: 56px 0;
  }
}
@media (max-width: 768px) {
  .content {
    margin: 40px 0 56px 0;
  }
}
</style>
