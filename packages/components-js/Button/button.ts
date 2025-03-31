import { MateComponent } from "../mateComponent";
import { buttonTemplate } from "./button.template";

/** 按钮组件参数 */
export interface ButtonProps {
  label: string; // 按钮文本
  onClick?: (event: MouseEvent) => void; // 点击事件回调
  content?: string; // 按钮内容
  styles?: Record<string, string>; // 样式
  slots?: {
    expand: HTMLElement | null;
  };
}

export class ButtonComponent extends MateComponent {
  showIcon = true;
  list = ["A", "B", "C"];

  constructor({
    container,
    props = {},
  }: {
    container: string | HTMLElement;
    props?: Record<string, any>;
  }) {
    super({ container, props });
  }

  /** 获取组件模板 */
  getTemplate() {
    return buttonTemplate;
  }
}
