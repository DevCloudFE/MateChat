export interface MermaidConfig {
  theme?: 'light' | 'dark';
  themeVariables?: Record<string, string>;
  startOnLoad?: boolean;
  securityLevel?: 'strict' | 'loose' | 'antiscript' | 'sandbox';
  maxTextSize?: number;
  maxEdges?: number;
  maxVertices?: number;
}

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
      // 等待正在加载的实例
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

  private async validateMermaidSyntax(code: string): Promise<boolean> {
    // 基本检查
    if (!code || typeof code !== 'string') {
      return false;
    }

    try {
      const mermaid = await this.loadMermaid();
      await mermaid.parse(code);
      return true;
    } catch (error) {
      return false;
    }
  }

  async renderMermaid(code: string, theme: 'light' | 'dark' = 'light'): Promise<string> {
    // 语法验证
    if (!(await this.validateMermaidSyntax(code))) {
      return this.lastValidResult;
    }

    try {
      const mermaid = await this.loadMermaid();
      
      // 更新主题配置
      if (this.config.theme !== theme) {
        this.config.theme = theme;
        mermaid.initialize({
          ...this.config,
          theme: theme === 'dark' ? 'dark' : 'default'
        });
      }

      // 生成唯一 ID
      const id = `mermaid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 渲染图表
      const { svg } = await mermaid.render(id, code);
      
      // 只有成功渲染时才更新 lastValidResult
      this.lastValidResult = svg;
      
      return svg;
    } catch (error) {
      // 渲染失败，返回缓存的有效结果
      return this.lastValidResult;
    }
  }

  updateConfig(config: Partial<MermaidConfig>) {
    this.config = { ...this.config, ...config };
    
    // 如果 mermaid 已加载，重新初始化
    if (this.mermaidInstance) {
      this.mermaidInstance.initialize({
        theme: this.config.theme || 'default',
        ...this.config
      });
    }
  }
} 