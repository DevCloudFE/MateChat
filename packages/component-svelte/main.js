import App from "./components/Button/Button.svelte"; // 替换为你的组件路径

const app = new App({
  target: document.getElementById("app"),
  props: {
    label: "Click Me",
  },
});

export default app;