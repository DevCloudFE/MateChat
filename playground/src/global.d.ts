/**
 * 全局类型声明文件
 */

// 为所有.js文件提供默认模块声明
declare module '*.js' {
  const content: any;
  export default content;
}

// 为Vue单文件组件提供类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}