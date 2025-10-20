import BaseFoundation, { DefaultAdapter } from '../Base/foundation';
import type { Token } from 'markdown-it';
import type { ASTNode } from './common/mdCard.types';
import { defaultTypingConfig } from './common/mdCard.types';

export interface MarkdownCardAdapter extends DefaultAdapter {
  locale(key: string, params?: Record<string, string>): string;
  typingStart?: () => void;
  typingEnd?: () => void;
  typingEvent: () => void;
  parseContent: (content: string) => void;
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

  parseContent = () => {
    const { content, thinkOptions, enableThink } = this.getProps();
    const { typing, isTyping } = this.getStates();
    let parseContent = content || '';
    if (typing && isTyping) {
      parseContent = this.parseTypingContent(content);
    }

    if (enableThink) {
      parseContent = this.getThinkContent(content, thinkOptions);
    }

    parseContent = this._adapter.parseContent(parseContent);
  };

  typewriterStart = () => {
    const { typingOptions } = this.getProps();
    const { timer, typingIndex, content } = this.getStates();
     if (timer) {
      clearTimeout(timer);
    }

    this.setState({ typing: true });
    this._adapter.typingStart?.();
    const options = { ...defaultTypingConfig, ...typingOptions };

    const typingStep = () => {
      let step = options.step || 2;
      if (Array.isArray(options.step)) {
        step =
          options.step[0] +
          Math.floor(Math.random() * (options.step[1] - options.step[0]));
      }
      this.setState({ typingIndex: typingIndex + step });
      this.parseContent();
      this._adapter.typingEvent();

      if (typingIndex >= content!.length) {
        this.typewriterEnd();
        this.parseContent();
        return;
      }

      this.setState({
        timer: window.setTimeout(
          typingStep,
          typeof options.interval === 'number' ? options.interval : 50
        ),
      });
    };

    this.setState({
      timer: window.setTimeout(typingStep),
    });
  };
}
