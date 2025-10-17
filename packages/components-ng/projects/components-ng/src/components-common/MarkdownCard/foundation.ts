import BaseFoundation, { DefaultAdapter } from '../Base/foundation';
import type { Token } from 'markdown-it';
import type { ASTNode } from './common/mdCard.types';
import { defaultTypingConfig } from './common/mdCard.types';

export interface MarkdownCardAdapter extends DefaultAdapter {
  locale(key: string, params?: Record<string, string>): string;
  typingEnd?: () => void;
}

export class MarkdownCardFoundation extends BaseFoundation<MarkdownCardAdapter> {
  constructor(adapter: MarkdownCardAdapter) {
    super({ ...adapter });
  }

  isToken = (node: ASTNode | Token): node is Token => {
    return 'type' in node && 'content' in node;
  };

  typewriterEnd = () => {
    this.setState({ typing: false });
    this._adapter.typingEnd?.();
  };

  getThinkContent = (content: string, thinkOptions: any) => {
    const thinkClass = thinkOptions?.customClass || 'mc-think-block';
    return (
      content
        ?.replace('<think>', `<div class="${thinkClass}">`)
        ?.replace('</think>', '</div>') || ''
    );
  };

  parseTypingContent = (content: string) => {
    const { typingOptions } = this.getProps();
    const { typingIndex } = this.getStates();
    content = content.slice(0, typingIndex) || '';
    const options = { ...defaultTypingConfig, ...typingOptions };

    if (options.style === 'cursor') {
      content += `<span class="mc-typewriter mc-typewriter-cursor">|</span>`;
    } else if (options.style === 'color' || options.style === 'gradient') {
      content =
        content.slice(0, -5) +
        `<span class="mc-typewriter mc-typewriter-${
          options.style
        }">${content.slice(-5)}</span>`;
    }
    return content || '';
  };
}
