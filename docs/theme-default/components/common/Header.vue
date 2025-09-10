<template>
  <section class="header" :class="{ 'intro-header': page.relativePath.includes('index'), active: isDropdown, scroll: isScroll }">
    <div class="left-nav">
      <d-button v-if="page.relativePath.includes('components')" icon="nav-expand" variant="text" @click="collapseSideMenu()"></d-button>
      <a class="mc-logo" v-localeHref="'/'">
        <img src="/logo.svg" />
        MateChat
      </a>
    </div>
    <div class="right-nav">
      <d-dropdown
        :overlay-class="page.relativePath.includes('index') ? 'intro-header-right-nav-dropdown' : 'header-right-nav-dropdown'"
        @toggle="onDropdown($event)"
      >
        <d-button class="nav-drop-btn" icon="icon-project-nav" variant="text"></d-button>
        <template #menu>
          <div class="nav-drop-menu">
            <ul>
              <li v-for="(item, index) in theme.nav" :key="index" @click="go(item.link)">
                <img :class="{ 'enhance-icon': isGalaxy }" :src="iconMap[index]" />
                <span>{{ $t(item.text) }}</span>
              </li>
              <li v-show="showTheme">
                <div class="theme">
                  <d-switch color="var(--devui-base-bg-dark)" v-model="isGalaxy" @change="toggleThemeWithTransition">
                    <template #checkedContent>
                      <i class="icon-dark"></i>
                    </template>
                    <template #uncheckedContent>
                      <i class="icon-light"></i>
                    </template>
                  </d-switch>
                  <div>主题</div>
                </div>
              </li>
              <a href="https://gitcode.com/DevCloudFE/MateChat/overview" rel="noopener noreferrer" target="_blank">
                <img src="/png/footer/gitcode.svg" style="height: 16px" />
                <span>MateChat</span>
              </a>
            </ul>
          </div>
        </template>
      </d-dropdown>

    <div class="nav-list">
        <a
          v-for="(item, index) in theme.nav"
          :key="index"
          v-localeHref="item.link"
          :class="['nav-op', { 'nav-active': isActive(item.link) }]"
          v-bind="getAttr(item)"
        >
          <div v-if="!isGalaxy">
            <img v-if="isActive(item.link)" :src="activeIconMap[index]" />
            <img v-if="!isActive(item.link)" :src="iconMap[index]" />
          </div>
          <div v-if="isGalaxy">
            <img :class="{ 'enhance-icon': isActive(item.link) }" :src="iconMap[index]" />
          </div>
          {{ $t(item.text) }}
        </a>
      </div>
      <div class="release">
        <d-dropdown :trigger="'hover'" style="width: 100px" :position="['bottom-end', 'right', 'top-end']">
          <div class="version">
            <span>1.5.1</span>
            <i class="icon-chevron-down-2"></i>
          </div>
          <template #menu>
            <ul class="list-menu">
              <li class="menu-item">
                <d-icon name="jump-to" operable @click="goThird('https://gitcode.com/DevCloudFE/MateChat/releases')">
                  <template #prefix>
                    <span>更新日志</span>
                  </template>
                </d-icon>
              </li>
            </ul>
          </template>
        </d-dropdown>
      </div>
      <div v-if="showTheme" class="header-menu-splitter"></div>
      <div v-show="showTheme" class="theme">
        <div>
          <d-switch color="var(--devui-base-bg-dark)" v-model="isGalaxy" @change="toggleThemeWithTransition">
            <template #checkedContent>
              <i class="icon-dark"></i>
            </template>
            <template #uncheckedContent>
              <i class="icon-light"></i>
            </template>
          </d-switch>
        </div>
      </div>
      <div class="header-menu-splitter"></div>
      <div class="gitcode-address" title="到GitCode关注">
        <a href="https://gitcode.com/DevCloudFE/MateChat/overview" rel="noopener noreferrer" target="_blank">
          <img src="/png/footer/gitcode.svg" style="height: 16px" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { galaxyTheme, infinityTheme } from 'devui-theme';
import { useData } from 'vitepress';
import { useRouter } from 'vitepress';
import { computed, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { APPEARANCE_KEY } from '../../../shared';
import { useLangs } from '../../composables/langs';
import { themeServiceInstance } from '../../index';
import { LocaleKey, ThemeKey } from '../datas/type';
const emit = defineEmits(['themeUpdate']);
const i18n = useI18n();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
const { theme, page, isDark } = useData();
const isGalaxy = ref(false);
const isZh = ref(true);
const router = useRouter();
const href = computed(() => localeLinks.value[0].link);

const iconMap = [
  '/png/header/instruction.png',
  '/png/header/components.png',
  '/png/header/demo.png',
];

const activeIconMap = [
  '/png/header/instructionActive.png',
  '/png/header/componentsActive.png',
  '/png/header/demoActive.png',
];

const props = defineProps({
  isScroll: {
    type: Boolean,
    default: false,
  },
  showTheme: {
    type: Boolean,
    default: true,
  },
});

const ThemeConfig = {
  [ThemeKey.Galaxy]: galaxyTheme,
  [ThemeKey.Infinity]: infinityTheme,
};

const isActive = (link: string) => {
  const prefix = link.split('/')[1];
  return page.value.relativePath.startsWith(prefix);
};

const isDropdown = ref(false);

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('theme') === ThemeKey.Galaxy) {
      isGalaxy.value = true;
    }

    if (localStorage.getItem('locale') === LocaleKey.en) {
      isZh.value = false;
    }
  }
  if (typeof window !== 'undefined') {
    const mediaQueryListDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    mediaQueryListDark.addListener(windowThemeChange); // 添加主题变动监控事件
    windowThemeChange(mediaQueryListDark);
  }
});

const getAttr = (item: any) => {
  if (item.text === 'nav.demo') {
    return { target: '_blank' };
  }
  return {};
};

const go = (link: string) => {
  router.go(link);
};

const goThird = (link: string) => {
  window.open(link, '_blank');
};

const toggleAppearance = inject('toggle-appearance', (isGalaxy) => {
  isDark.value = isGalaxy;
});

function windowThemeChange(mediaQueryListEvent) {
  const vpTheme =
    typeof localStorage !== 'undefined' && localStorage.getItem(APPEARANCE_KEY);
  if (vpTheme === 'auto') {
    isGalaxy.value = !!mediaQueryListEvent.matches; // matches 存在则 系统是深色主题
    changeDevUiTheme(isGalaxy.value);
  }
}

function changeDevUiTheme(change) {
  const key = change ? ThemeKey.Galaxy : ThemeKey.Infinity;
  typeof localStorage !== 'undefined' && localStorage.setItem('theme', key);
  themeServiceInstance?.applyTheme(ThemeConfig[key]);
}

function toggleThemeWithTransition(change) {
  // 检查是否支持View Transitions API
  const supportsViewTransition =
    typeof document !== 'undefined' && 'startViewTransition' in document;

  const key = change ? ThemeKey.Galaxy : ThemeKey.Infinity;

  if (!supportsViewTransition) {
    localStorage.setItem('theme', key);
    themeServiceInstance?.applyTheme(ThemeConfig[key]);
    toggleAppearance(isGalaxy.value);
    emit('themeUpdate', isGalaxy.value);

    return;
  }

  // 使用View Transitions API实现动画切换
  document.startViewTransition(async () => {
    localStorage.setItem('theme', key);
    themeServiceInstance?.applyTheme(ThemeConfig[key]);
    toggleAppearance(isGalaxy.value);
    emit('themeUpdate', isGalaxy.value);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function collapseSideMenu() {
  const sideMenu = document.querySelector('.side-menu') as HTMLElement;
  sideMenu.style.width =
    !sideMenu.style.width || sideMenu.style.width === '0px' ? '230px' : '0px';
}

function onDropdown(status: boolean) {
  isDropdown.value = status;
}
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';

.enhance-icon {
  filter: brightness(10);
}
.header {
  position: fixed;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100vw;
  height: 48px;
  background-color: $devui-base-bg;
  transition: 0.5s;

  img {
    height: 32px;
    margin: 8px 8px;
    cursor: pointer;
  }

  .mc-logo {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
    line-height: 1.5;
    color: $devui-text;
    img {
      margin: 8px 8px 8px 20px;
    }
  }

  .left-nav {
    display: flex;
    align-items: center;
    button {
      display: none;
    }
  }

  .release {
    margin-right: 12px;
    color: $devui-icon-fill;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 32px;

    .version {
      line-height: 32px;
    }

    &:hover {
      color: $devui-text;
      transition: color $devui-animation-duration-base $devui-animation-ease-in-out-smooth;
    }
  }
  .theme {
    display: flex;
    margin: 0 16px;

    .opt {
      padding: 5px;
      cursor: pointer;
      transition: 0.5s;
      border-radius: 25%;

      &:hover {
        transform: scale(1.1);
        background-color: $devui-glass-morphism-bg;
      }
    }
  }
}

.intro-header {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(4px);

  &.scroll {
    transition: background-color 1s;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &.active {
    background-color: $devui-base-bg;
  }
}

.right-nav {
  display: flex;
  align-items: center;

  .nav-drop-btn {
    display: none;
  }

  .nav-list {
    gap: 12px;
    display: flex;
    margin-right: 12px;
    .nav-op {
      &:hover {
        color: $devui-text;
        background: $devui-icon-bg;
        transition: all var(--devui-animation-duration-base, 0.2s)
          var(--devui-animation-ease-in-out-smooth, cubic-bezier(0.645, 0.045, 0.355, 1));
        box-shadow: var(--devui-shadow-length-base, 0 2px 6px 0) var(--devui-light-shadow, rgba(37, 43, 58, 0.12));
        border-radius: $devui-border-radius-card;
      }

      color: $devui-aide-text;
      display: flex;
      align-items: center;
      padding-right: 8px;
      img {
        width: 16px;
        height: 16px;
      }
    }

    & > a {
      text-decoration: none;
    }

    .nav-active {
      color: $devui-text;
      background: $devui-icon-bg;
      box-shadow: var(--devui-shadow-length-base, 0 2px 6px 0) var(--devui-light-shadow, rgba(37, 43, 58, 0.12));
      border-radius: $devui-border-radius-card;
    }
  }

  .header-menu-splitter {
    height: 24px;
    border-left: 1px solid $devui-line;
  }

  .gitcode-address {
    margin: 0 20px 0 8px;
  }
}

.nav-drop-menu {
  display: flex;
  background-color: $devui-base-bg;
  width: 100vw;
  justify-content: center;
  ul {
    padding: 12px;
  }
  li,
  a {
    height: 40px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    span {
      color: $devui-text;
    }
  }

  img {
    width: 16px;
    height: 16px;
  }

  .theme {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
}

.list-menu {
  padding: 0;
  margin: 0 0 3px 0;
}
.menu-item {
  padding: 5px 0 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .header img {
    margin: 8px;
  }

  .header {
    .left-nav {
      button {
        display: block;
        margin-right: -8px;
      }
    }

    .right-nav {
      .nav-drop-btn {
        margin-right: 10px;
        display: block;
      }

      .nav-list,
      .theme,
      .release,
      .header-menu-splitter,
      .gitcode-address {
        display: none;
      }
    }
  }
}

@media (max-width: 320px) {
  .nav-drop-menu {
    width: 320px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  .dark::view-transition-old(root) {
    z-index: 1;
  }
  .dark::view-transition-new(root) {
    z-index: 999;
  }

  :root:not(.dark)::view-transition-old(root) {
    z-index: 999;
  }
  :root:not(.dark)::view-transition-new(root) {
    z-index: 1;
  }
}
</style>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';
.header-right-nav-dropdown {
  left: 0 !important;
  background: $devui-base-bg;
  display: flex;
  justify-self: center;
  box-shadow: 0 2px 0 0 $devui-shadow !important;
}

.intro-header-right-nav-dropdown {
  left: 0 !important;
  background: rgba(255, 255, 255, 0) !important;
  display: flex;
  justify-self: center;
  box-shadow: none !important;
}
</style>
