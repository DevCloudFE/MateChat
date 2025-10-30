import BaseFoundation, { DefaultAdapter } from '../Base/foundation';
import type { Token } from 'markdown-it';
import type { ASTNode, MermaidConfig } from './common/mdCard.types';
import { defaultTypingConfig } from './common/mdCard.types';
import { MermaidService } from './common/MermaidService';
import hljs from 'highlight.js';
import { MDCardService } from './common/MDCardService';

export interface CodeBlockAdapter extends DefaultAdapter {
  getContainer(): HTMLElement | null;
  highlightCodeChange(code: string, language: string): void;
}

export class CodeBlockFoundation extends BaseFoundation<CodeBlockAdapter> {
  mermaidService?: MermaidService;
  mdCardService: MDCardService;
  constructor(adapter: CodeBlockAdapter) {
    super({ ...adapter });
    this.mdCardService = new MDCardService();
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.getStates().expanded });
  };

  zoomOut = () => {
    const container = this._adapter.getContainer();
    if (container && this.mermaidService) {
      this.mermaidService.zoomOut(container);
    }
  };

  zoomIn = () => {
    const container = this._adapter.getContainer();
    if (container && this.mermaidService) {
      this.mermaidService.zoomIn(container);
    }
  };

  checkIsMermaid = () => {
    const { enableMermaid, language } = this.getProps();
    return enableMermaid && language?.toLowerCase() === 'mermaid';
  };

  download = () => {
    const container = this._adapter.getContainer();
    if (container && this.mermaidService) {
      this.mermaidService.download(container);
    }
  };

  handleCopySuccess = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1500);
  };

  copyCodeInternal() {
    const { code } = this.getProps();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        this.handleCopySuccess();
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.style.zIndex = '-1';
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.handleCopySuccess();
    }
  }

  updateHighlightedCode = () => {
    const { code, language } = this.getProps();
    let highlightedCode = '';
    try {
      const typeIndex = code.indexOf(`<span class="mc-typewriter`);

      if (language && hljs.getLanguage(language)) {
        if (typeIndex !== -1) {
          highlightedCode =
            hljs.highlight(code.slice(0, typeIndex), {
              language,
            }).value + code.slice(typeIndex);
        } else {
          highlightedCode = hljs.highlight(code, {
            language,
          }).value;
        }
      } else {
        if (typeof hljs.highlightAuto !== 'undefined') {
          if (typeIndex !== -1) {
            highlightedCode =
              hljs.highlightAuto(code.slice(0, typeIndex)).value +
              code.slice(typeIndex);
          } else {
            highlightedCode = hljs.highlightAuto(code).value;
          }
        } else {
          highlightedCode = this.mdCardService.filterHtml(code);
        }
      }
    } catch (_) {
      highlightedCode = code;
    }
    this._adapter.highlightCodeChange(highlightedCode, language);
  };

  renderMermaid = async () => {
    const {
      code,
      theme,
      mermaidConfig,
    } = this.getProps();
    const { mermaidContentRef} = this.getStates();
    const isMermaid = this.checkIsMermaid();
    if (!isMermaid || !code || !mermaidContentRef) {
      return;
    }

    if (!this.mermaidService) {
      try {
        this.mermaidService = new MermaidService();
        const config: MermaidConfig = {
          theme: theme === 'dark' ? 'dark' : 'default',
          ...mermaidConfig,
        };
        this.mermaidService.setConfig(config);
      } catch (error) {
        console.error('Failed to load MermaidService:', error);
        return;
      }
    }
    this.nextTick(async () => {
      const container = mermaidContentRef.nativeElement;
      if (container) {
        // 移除打字效果相关的span标签
        const cleanCode = code.replace(
          /<span[^>]*\bclass\s*=\s*['"]mc-typewriter[^>]*>([\s\S]*?)<\/span>/g,
          `$1`
        );
        await this.mermaidService?.renderToContainer(
          container,
          cleanCode,
          theme
        );
      }
    });
  };
}
