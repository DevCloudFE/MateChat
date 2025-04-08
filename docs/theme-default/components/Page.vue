<template>
  <Header class="page-header" />
  <div class="page-container">
    <SideMenu v-if="!frontmatter.isPlayground" class="side-menu" />
    <div ref="containerEl" :class="['main-container', { 'main-container-playground': frontmatter.isPlayground }]">
      <div :class="['main-content', { 'main-content-playground': frontmatter.isPlayground }]">
        <h1 v-if="page.relativePath.includes('components')" class="title">{{ frontmatter.title }}</h1>
        <h2 v-if="page.relativePath.includes('components')" class="description">{{ frontmatter.desc }}</h2>
        <ContentSlider
          v-if="page.relativePath.includes('components')"
          :bannerSrc="frontmatter.bannerSrc"
          :iconSrc="frontmatter.iconSrc"
        />
        <Content class="vp-doc" />
      </div>
      <div v-if="!frontmatter.isPlayground" class="content-nav devui-scrollbar devui-scroll-overlay">
        <PageNav />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';
import SideMenu from './SideMenu.vue';
import PageNav from './PageNav.vue';
import ContentSlider from './ContentSlider.vue';
import Header from './common/Header.vue';
import { useActiveAnchor } from '../composables/outline';

const containerEl = ref<HTMLElement>();
const { page, frontmatter } = useData();

useActiveAnchor(containerEl);

const handleResize = () => {
  const sideMenu = document.querySelector('.side-menu') as HTMLElement;
  if (!sideMenu) {
    return;
  }
  if (window.innerWidth <= 768) {
    sideMenu.style.width = '0';
  } else if (window.innerWidth <= 1280) {
    sideMenu.style.width = '230px';
  } else {
    sideMenu.style.width = '320px';
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.page-header {
  border-bottom: 1px solid $devui-dividing-line;
}

.page-container {
  display: flex;
  background-color: $devui-base-bg;
}
.main-container {
  width: calc(100vw - 20px);
  padding-right: 150px;
  max-width: 1600px;
  margin: 0 auto;
  &.main-container-playground {
    padding-right: 0;
  }
}
.main-content {
  width: 100%;
  padding: 80px 11vw 32px 25vw;
  position: relative;
  z-index: 1;
  @media screen and (min-width: 1680px) {
    padding: 80px 180px 32px 420px;
  }

  &.main-content-playground {
    padding: 48px 10vw 0 10vw;

    @media screen and (min-width: 1680px) {
      padding: 48px 168px 0 168px;
    }
  }
  .title {
    font-size: 36px;
    height: 24px;
    font-weight: bold;
    color: $devui-text;
  }
  .description {
    margin-bottom: 30px;
    height: 24px;
    font-size: $devui-font-size;
    color: $devui-aide-text;
  }
}
.content-nav {
  font-size: $devui-font-size-sm;
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 10;
  width: 200px;
  max-height: 100%;
  overflow-x: hidden;
}

.sider-container {
  border-right: 1px solid #dfe1e6;
  width: 302px;
  height: 100vh;
  position: fixed;
  background: white;
  display: flex;
  flex-direction: column;
}

.search {
  margin: 20px 10px;
}

.side-menu {
  width: 320px;
  z-index: 1001;
}

@media screen and (max-width: 1280px) {
  .content-nav {
    display: none;
    transition: 0.5s;
  }
  .main-container {
    padding-right: 0px;
  }

  .main-content {
    padding: 80px 2vw 32px 250px;
    &.main-content-playground {
      padding: 48px 10vw 0 10vw;
    }
  }

  .side-menu {
    width: 220px;
    transition: width 0.5s;
  }
}

@media screen and (max-width: 768px) {
  .side-menu {
    width: 0;
    padding: 0;
    transition: 0.5s;
  }

  .main-content {
    min-width: 320px;
    padding: 80px 3vw 32px 3vw;
  }
}

@media (max-width: 320px) {
  .page-header {
    width: 320px;
  }
}
</style>
