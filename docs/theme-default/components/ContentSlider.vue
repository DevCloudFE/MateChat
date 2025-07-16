<template>
  <div ref="sliderContainer" class="slider-container">
    <div id="banner-container" class="banner-container">
      <img :src="basicSrc + props.bannerSrc" :class="{ darkMode: isDark }" />
    </div>
    <div id="icon-container" class="icon-container">
      <img :src="basicSrc + props.iconSrc" :class="{ darkMode: isDark }" />
    </div>
    <div ref="tabsRef">
      <d-tabs
        id="content-slider-tabs"
        type="slider"
        v-model="id"
        class="tabs"
        :class="{ 'tab-current': id === 'api' }"
        @active-tab-change="tabChange($event)"
        :reactivable="false"
      >
        <d-tab id="demo">
          <template v-slot:title>
            <div class="tab-content">
              <d-icon name="code" style="vertical-align: middle" />
              <span class="tab-words" style="margin-left: 8px">Demo</span>
            </div>
          </template>
        </d-tab>
        <d-tab id="api">
          <template v-slot:title>
            <div class="tab-content">
              <d-icon name="icon-api" style="vertical-align: middle" />
              <span class="tab-words" style="margin-left: 8px">API</span>
            </div>
          </template>
        </d-tab>
      </d-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';
import { defineProps } from 'vue';

const props = defineProps({
  bannerSrc: {
    type: String,
    default: '/banner.png',
  },
  iconSrc: {
    type: String,
    default: '/defaultIcon.png',
  },
});

const basicSrc = '/png/contentSlider';
const { isDark } = useData();
const route = useRoute();
const router = useRouter();
const id = ref('demo');
const tabsRef = ref<HTMLElement | null>(null);
const sliderContainer = ref<HTMLElement | null>(null);
const handleScroll = () => {
  if (sliderContainer.value && tabsRef.value) {
    const sliderContainerTop = sliderContainer.value.getBoundingClientRect().top;
    if (sliderContainerTop <= -72) {
      tabsRef.value.classList.add('fix-tab');
      tabsRef.value.style.width = `${sliderContainer.value.offsetWidth}px`;
    } else {
      tabsRef.value.classList.remove('fix-tab');
    }
  }
};

const tabChange = (event) => {
  let currentId = id.value;
  id.value = event;
  let nextPath = route.path.replace(currentId, event);
  router.go(nextPath);
};

const setTabId = (path) => {
  if (path.includes('/api')) {
    id.value = 'api';
  } else {
    id.value = 'demo';
  }
};

watch(
  () => route.path,
  (newPath) => {
    setTabId(newPath);
  },
);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  setTabId(route.path);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

$slider-tabs-height: 56px;

.slider-container {
  width: 100%;
  height: 176px;
  position: relative;
}

.banner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}

.icon-container {
  position: absolute;
  top: -90px;
  right: 24px;
  width: 160px;
  height: 160px;
  background-color: #fff3;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 20px;
}

.tabs {
  width: 100%;
  position: absolute;
  bottom: -30px;
  border-radius: 0 0 20px 20px;
}

.tabs :deep(ul) {
  width: 100%;
  background: #f2f2f399;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0 0 20px 20px;
}

.tabs :deep(li) {
  flex: 1;
  height: 56px;
  line-height: 56px;
  border-radius: 0 0 20px 20px;
  margin: 0;
}

.tabs :deep(.devui-tabs__nav-content a) {
  display: inline-block;
  text-align: center;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  line-height: 56px;
}

.tabs {
  & :deep(.devui-tabs__nav-slider-animation) {
    width: 50% !important;
    left: 0 !important;
    height: 56px;
    border-radius: 0 0 20px 20px;
    box-shadow: 2px 2px 16px $devui-shadow !important;
    background-color: $devui-base-bg;
  }
  &.tab-current :deep(.devui-tabs__nav-slider-animation) {
    left: 50.1% !important;
  }
}

.tabs :deep(.devui-tabs__nav) {
  overflow-y: unset !important;
  overflow-x: unset !important;
}

.fix-tab {
  width: 100%;
  position: fixed;
  top: 46px;
  height: 56px;
  z-index: 1000;

  & :deep(.devui-tabs__nav-slider-animation) {
    box-shadow: 0 2px 4px 0 $devui-shadow !important;
  }
}

.tab-content {
  display: inline-flex;
  align-items: center;
  color: $devui-text;
  font-size: 18px;
}

.darkMode {
  filter: brightness(0.9);
}

@media (max-width: 1280px) {
}

@media screen and (max-width: 768px) {
  .icon-container {
    width: 110px;
    height: 110px;
    top: -60px;
  }

  .slider-container {
    height: 120px;
  }

  .tabs {
    :deep(ul) {
      height: 40px;
    }
    :deep(li) {
      height: 40px;
      line-height: 40px;
    }
    :deep(.devui-tabs__nav-content a) {
      line-height: 40px;
    }
    & :deep(.devui-tabs__nav-slider-animation) {
      height: 40px;
    }
  }

  .fix-tab {
    height: 40px;
  }
}
</style>
