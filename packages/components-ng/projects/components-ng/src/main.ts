import './polyfill';
import { Injector, NgModuleRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BubbleComponent } from './Bubble/bubble.component';
import { BubbleModule } from './Bubble/bubble.module';

// 确保在浏览器环境中执行
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const key = 'registerMyWebComponent';
  // 直接在全局作用域中定义Web Component注册函数
  // 这样可以从外部直接调用进行调试
  window[key] = async () => {
    try {
      console.log('Starting Angular Web Component registration process');

      // 获取Angular平台注入器
      const platform = platformBrowserDynamic();

      // 编译并获取模块引用
      const moduleRef = await platform.bootstrapModule(BubbleModule);

      console.log('Angular BubbleModule successfully bootstrapped');

      // 使用模块的注入器创建自定义元素
      const webComponent = createCustomElement(BubbleComponent, {
        injector: moduleRef.injector,
      });

      console.log('Custom element factory created');

      // 注册Web Component
      if (!customElements.get('my-webcomponent')) {
        customElements.define('my-webcomponent', webComponent);
        console.log(
          'my-webcomponent successfully registered as custom element',
        );

        const key = 'onWebComponentRegistered';
        // 通知外部注册成功
        if (window[key]) {
          window[key]();
        }
      } else {
        console.log('my-webcomponent already registered');
      }
    } catch (err) {
      console.error('Error during web component registration:', err);
    }
  };

  // 启动Web Component注册过程
  console.log('Scheduling Web Component registration');
  // 使用setTimeout确保DOM已经准备好
  setTimeout(() => {
    const key = 'registerMyWebComponent';
    window[key]();
  }, 100);
}

// 导出Web Component供其他应用使用
export * from './Bubble/bubble.module';
export * from './Bubble/bubble.component';
