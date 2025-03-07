<template>
  <NotFound v-if="page.isNotFound" />
  <Home v-else-if="frontmatter.layout === 'home'" />
  <Page v-else />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useData } from 'vitepress';
import NotFound from './404.vue';
import Home from './Home/index.vue';
import Page from './Page.vue';
import { setHtmlScrollPaddingTopClass } from '../composables/outline';

const { page, frontmatter } = useData();

watch(page, () => {
  setHtmlScrollPaddingTopClass();
});

if (typeof window !== 'undefined' && typeof location !== 'undefined') {
  const isProd = location.href.indexOf('matechat.gitcode') > -1;

  const x = 'https://res.hc-cdn.com/FurionSdkStatic/3.6.43/furion-cdn.min.js', n = '__fr';
  if (isProd) {
    window[n] = window[n] || {};

    window[n].config = {
      appId: '1830A6C762C44E4387F4C347ACB416C5',
      setting: 'perf,jsTrack,api,uba,longtask,rtti,crash,resource',
      crossOriginApi: false,
      hashMode: true,
      closeReportFMP: true,
      smartJsErr: true,
      sendResource: true,
      option: {
        api: {
          headers: [],
        },
        whiteScreen: {
          rootElements: ['html', 'body', '#app', '#root'],
        },
      },
    };

    const o = document.createElement('script');
    o.src = x;
    o.async = !0;
    const d = document.body.firstChild;
    document.body.insertBefore(o, d);
  }
  setHtmlScrollPaddingTopClass();
  // 避免URL有hash情况下第一次进入页面，左侧导航栏激活的不是对应锚点情况
  const hash = location.hash;
  location.hash = '';
  setTimeout(() => {
    location.hash = hash;
  });
}
</script>
