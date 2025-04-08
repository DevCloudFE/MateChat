import './assets/base.css';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';

import { createApp } from 'vue';
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import App from './App.vue';
import MateChat from '@matechat/core';

const app = createApp(App)
app.use(DevUI)
app.use(MateChat)
app.mount('#app');

import { ThemeServiceInit, infinityTheme } from 'devui-theme';

// 使用无限主题
ThemeServiceInit({ infinityTheme }, 'infinityTheme');
