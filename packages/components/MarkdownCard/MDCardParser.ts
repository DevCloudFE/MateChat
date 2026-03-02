import { isValidTagName } from '@matechat/common/MarkdownCard/common/parser';
import { h, isVNode, type VNode } from 'vue';

// 将html字符串转换为vnode
export const htmlToVNode = (htmlString: string): (VNode | string)[] => {
  if (!htmlString || !htmlString.trim()) return [];

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return [htmlString];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${htmlString}</body>`, 'text/html');
  const vnodes: (VNode | string)[] = [];

  doc.body.childNodes.forEach((node, index) => {
    const vnode = nodeToVNode(node);

    if (isVNode(vnode) || typeof vnode === 'string') {
      if (typeof vnode === 'object') (vnode as any).key = index;
      vnodes.push(vnode);
    }
  });

  return vnodes;
};

// 将dom节点转换为vnode
const nodeToVNode = (node: Node): VNode | string | null => {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE) return node.textContent || '';

  const elementNode = node as Element;
  const props: Record<string, any> = {};

  if (elementNode.hasAttributes() && elementNode.attributes) {
    for (const attr of Array.from(elementNode.attributes)) {
      props[attr.name] = attr.value;
    }
  }

  const children: (VNode | string)[] = [];

  if (elementNode.childNodes.length > 0) {
    elementNode.childNodes.forEach((child) => {
      const childVNode = nodeToVNode(child);
      if (isVNode(childVNode) || typeof childVNode === 'string') {
        children.push(childVNode);
      }
    });
  }

  if (!isValidTagName(elementNode.tagName)) {
    return node?.textContent || '';
  }

  return h(elementNode.tagName.toLowerCase(), props, children);
};
