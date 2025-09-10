import type { MermaidConfig } from './mdCard.types';

interface MermaidViewState {
  scale: number;
  offsetX: number;
  offsetY: number;
  dragging: boolean;
  dragStart: { x: number; y: number };
  lastOffset: { x: number; y: number };
}

export class MermaidService {
  private mermaidInstance: any = null;
  private isLoading = false;
  private lastValidResult: string = '';
  private viewStateMap = new WeakMap<HTMLElement, MermaidViewState>();
  private containerHeight = 400;

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

  async renderToContainer(container: HTMLElement, code: string, theme: 'light' | 'dark' = 'light') {
    const svgStr = await this.renderMermaid(code, theme);
    container.innerHTML = svgStr;
    const svg = container.querySelector('svg');
    if (svg) {
      this.initViewState(container, svg);
      this.applyTransform(container, svg);
      svg.addEventListener('mousedown', (e) => this.onSvgMouseDown(e, container, svg));
    }
  }

  private initViewState(container: HTMLElement, svg: SVGSVGElement) {
    // 获取svg的viewBox或宽高
    let vb = svg.getAttribute('viewBox');
    let svgW = 0, svgH = 0;
    if (vb) {
      const arr = vb.split(/\s+/);
      svgW = parseFloat(arr[2]);
      svgH = parseFloat(arr[3]);
    } else {
      svgW = svg.width.baseVal.value || svg.getBoundingClientRect().width;
      svgH = svg.height.baseVal.value || svg.getBoundingClientRect().height;
    }
    const contW = container.clientWidth || 0;
    const contH = this.containerHeight;
    let scale = 1;
    if (svgW && svgH && contW && contH) {
      scale = Math.min(contW / svgW, contH / svgH, 1);
    }
    this.viewStateMap.set(container, {
      scale,
      offsetX: 0,
      offsetY: 0,
      dragging: false,
      dragStart: { x: 0, y: 0 },
      lastOffset: { x: 0, y: 0 },
    });
  }

  private applyTransform(container: HTMLElement, svg: SVGSVGElement) {
    const state = this.viewStateMap.get(container);
    if (!state) return;
    svg.style.position = 'absolute';
    svg.style.left = '50%';
    svg.style.top = '50%';
    svg.style.transform = `translate(-50%, -50%) translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`;
    svg.style.transformOrigin = 'center center';
    svg.style.cursor = state.dragging ? 'grabbing' : 'grab';
  }

  zoomIn(container: HTMLElement) {
    const svg = container.querySelector('svg');
    const state = this.viewStateMap.get(container);
    if (svg && state) {
      state.scale = Math.min(state.scale + 0.2, 3);
      this.applyTransform(container, svg);
    }
  }

  zoomOut(container: HTMLElement) {
    const svg = container.querySelector('svg');
    const state = this.viewStateMap.get(container);
    if (svg && state) {
      state.scale = Math.max(state.scale - 0.2, 0.2);
      this.applyTransform(container, svg);
    }
  }

  reset(container: HTMLElement) {
    const svg = container.querySelector('svg');
    if (svg) {
      this.initViewState(container, svg);
      this.applyTransform(container, svg);
    }
  }

  async download(container: HTMLElement, filename: string = 'diagram.png'): Promise<void> {
    const svg = container.querySelector('svg');
    if (!svg) return;

    try {
      const clonedSvg = svg.cloneNode(true) as SVGSVGElement;

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      
      const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(new Error('Image loading failed'));
        img.src = svgUrl;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob from canvas');
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }, 'image/png');
    } catch (error) {
      console.error('Failed to download diagram:', error);
    }
  }

  private onSvgMouseDown(e: MouseEvent, container: HTMLElement, svg: SVGSVGElement) {
    const state = this.viewStateMap.get(container);
    if (!state) return;
    state.dragging = true;
    state.dragStart = { x: e.clientX, y: e.clientY };
    state.lastOffset = { x: state.offsetX, y: state.offsetY };
    const move = (ev: MouseEvent) => this.onSvgMouseMove(ev, container, svg);
    const up = () => this.onSvgMouseUp(container, svg, move, up);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    this.applyTransform(container, svg);
  }
  private onSvgMouseMove(e: MouseEvent, container: HTMLElement, svg: SVGSVGElement) {
    const state = this.viewStateMap.get(container);
    if (!state || !state.dragging) return;
    state.offsetX = state.lastOffset.x + (e.clientX - state.dragStart.x);
    state.offsetY = state.lastOffset.y + (e.clientY - state.dragStart.y);
    this.applyTransform(container, svg);
  }
  private onSvgMouseUp(container: HTMLElement, svg: SVGSVGElement, move: any, up: any) {
    const state = this.viewStateMap.get(container);
    if (!state) return;
    state.dragging = false;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
    this.applyTransform(container, svg);
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
