export class MateComponent {
  container: HTMLElement | null;
  props: Record<string, any>;
  element: HTMLElement;

  constructor({
    container,
    props = {},
  }: {
    container: string | HTMLElement;
    props?: Record<string, any>;
  }) {
    if (typeof container === "string") {
      this.container = document.getElementById(container);
      if (!this.container) {
        throw new Error(`Container with id "${container}" not found.`);
      }
    } else if (container instanceof HTMLElement) {
      this.container = container;
    } else {
      throw new Error(
        "Invalid container. Must be a DOM element or a valid ID string.",
      );
    }

    this.props = props;

    setTimeout(() => {
      this._createDOM();
      this._bindEvents();
      this.mount();
      this.render();
    });
  }

  mount() {
    if (this.container) {
      this.container.appendChild(this.element);
    }
  }

  render() {
    console.log("render");
    const { styles = {}, slots } = this.props;

    // Apply inline styles
    Object.assign(this.element.style, styles);

    // Render content
    let html = this.getTemplate();
    this.element.innerHTML = this._parseTemplate(html);

    //遍历 slots 对象，将每个 slotContent 插入到对应的 .native-slot 中
    Object.keys(slots).forEach((slotName) => {
      const slotElement = this.element.querySelector(
        `.native-slot[data-slot="${slotName}"]`,
      );
      if (slotElement && slots[slotName] instanceof HTMLElement) {
        slotElement.appendChild(slots[slotName]);
      }
    });
  }

  /** 获取组件模板 */
  getTemplate(): string {
    throw new Error("getTemplate() must be implemented in a subclass.");
  }

  _insertStyles(styles: string) {
    const styleTagId = "mate-component-styles";
    let styleTag = document.getElementById(styleTagId) as HTMLStyleElement;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleTagId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = styles;
  }

  /** 绑定事件 */
  _bindEvents() {
    this.element.addEventListener("click", (event) => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    });
  }

  update(newProps: Record<string, any>) {
    console.log("update");
    this.props = { ...this.props, ...newProps };
    this.render();
  }

  _createDOM() {
    this.element = document.createElement("div");
    this.element.className = "mate-component";
  }

  _parseTemplate(template: string) {
    console.log("parse template");

    // 替换 mc-if 条件渲染语法
    template = template.replace(
      /<[^>]+mc-if="(\w+)"[^>]*>([\s\S]*?)<\/[^>]+>/g,
      (match, condition, content) => {
        console.log(this, condition, this.props[condition], this[condition]);
        if (this.props[condition] || this[condition]) {
          return content;
        }
        return "";
      },
    );

    // 替换 mc-for 循环渲染语法
    template = template.replace(
      /<[^>]+mc-for="(\w+)\s+in\s+(\w+)"[^>]*>([\s\S]*?)<\/[^>]+>/g,
      (match, itemName, arrayName, content) => {
        const array = this.props[arrayName] || this[arrayName];
        if (Array.isArray(array)) {
          return array
            .map((item) => {
              return content.replace(
                new RegExp(`{{\\s*${itemName}\\s*}}`, "g"),
                item,
              );
            })
            .join("");
        }
        return "";
      },
    );

    // 替换普通变量 {{key}}
    return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      if (key in this.props) {
        return this.props[key];
      }
      if ((this as any)[key] !== undefined) {
        return (this as any)[key];
      }
      return match;
    });
  }

  destroy() {
    console.log("destroy");
    if (this.container && this.element) {
      this.container.removeChild(this.element);
    }
    this.element = null!;
  }
}
