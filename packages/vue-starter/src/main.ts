import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import MateChat from "@matechat/core";
import VueDevui from "vue-devui";
import i18n from "./i18n";

const pinia = createPinia();

createApp(App).use(pinia).use(MateChat).use(VueDevui).use(i18n).mount("#app");
