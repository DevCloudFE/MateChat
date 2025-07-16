import type { MermaidConfig } from './mdCard.types';

export class MermaidService {
  private mermaidInstance: any = null;
  private isLoading = false;
  private lastValidResult: string = '';
  
  constructor(private config: MermaidConfig = {}) {}

  private async loadMermaid() {
    if (this.mermaidInstance) {
      return this.mermaidInstance;
    }

    if (this.isLoading) {
      return new Promise((resolve) => {
        const checkInstance = () => {
          if (this.mermaidInstance) {
            resolve(this.mermaidInstance);
          } else {
            setTimeout(checkInstance, 50);
          }
        };
        checkInstance();
      });
    }

    this.isLoading = true;
    
    try {
      const { default: mermaid } = await import('mermaid') as any;
      
      mermaid.initialize({
        theme: this.config.theme || 'default',
        startOnLoad: false,
        suppressErrorRendering: true,
        ...this.config
      });

      this.mermaidInstance = mermaid;
      return mermaid;
    } catch (error) {
      console.error('Failed to load mermaid:', error);
      throw new Error('Failed to load mermaid library');
    } finally {
      this.isLoading = false;
    }
  }

  async renderMermaid(code: string, theme: 'light' | 'dark' = 'light'): Promise<string> {
    try {
      const mermaid = await this.loadMermaid();
      
      if (this.config.theme !== theme) {
        this.config.theme = theme;
          mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: theme === 'dark' ? 'dark' : 'default',
          ...this.config
        });
      }

      const id = `mc_mermaid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { svg } = await mermaid.render(id, code);
      
      this.lastValidResult = svg;
      
      return svg;
    } catch (error) {
      return this.lastValidResult;
    }
  }

} 