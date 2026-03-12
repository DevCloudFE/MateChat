export default `import { createApp } from 'vue';
import MateChat from '@matechat/core';
import App from './App.vue';
import './style.scss';
import VueDevUI from 'vue-devui';

createApp(App).use(MateChat).use(VueDevUI).mount('#app')`;
