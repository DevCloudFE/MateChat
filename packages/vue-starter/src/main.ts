import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import MateChat from '@matechat/core';

createApp(App).use(MateChat).mount('#app');
