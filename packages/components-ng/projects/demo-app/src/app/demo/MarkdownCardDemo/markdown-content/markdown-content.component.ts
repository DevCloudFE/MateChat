import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule } from '@matechat/ng';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
@Component({
  selector: 'markdown-content-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule],
  templateUrl: './markdown-content.component.html',
  styleUrl: './markdown-content.component.scss',
})
export class MarkdownContentDemoComponent {
  theme = 'light';

  content = `**Echarts渲染**
\`\`\`echart
{
  backgroundColor: '#fefefe',
  color: ['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'],
  title: {
    text: '交通方式',
    top: '48%',
    textAlign: "center",
    left: "49%",
    textStyle: {
      fontSize: 22,
      fontWeight: '400'
    }
  },
  tooltip: {
    show: false
  },
  legend: {
    icon: "circle",
    orient: 'horizontal',
    x: 'right',
    data:['火车','飞机','客车','轮渡'],
    right: 300,
    bottom: 30,
    align: 'right',
    itemGap: 20
  },
  toolbox: {
    show: false 
  },
  series: [{
    name: '',
    type: 'pie',
    clockWise: false,
    radius: [105, 109],
    hoverAnimation: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'outside',
        },
        labelLine: {
          length:30,
          length2:100,
          show: true,
          color:'#00ffff'
        }
      }
    },
    data: [
      { value: 20, name: '火车', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#00ffff', shadowColor: '#00ffff' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } },
      { value: 10, name: '飞机', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#00cfff', shadowColor: '#00cfff' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } },
      { value: 30, name: '客车', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#006ced', shadowColor: '#006ced' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } },
      { value: 40, name: '轮渡', itemStyle: { normal: { borderWidth: 5, shadowBlur: 20, borderColor: '#ffe000', shadowColor: '#ffe000' } } },
      { value: 2, name: '', itemStyle: { normal: { label: { show: false }, labelLine: { show: false }, color: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 } } }
    ]
  }]
}
\`\`\`


**自定义代码行号**

\`\`\`ts
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // 输出排序后的数组
\`\`\`
`;
  themeService;
  themeClass = 'light-background';
  changeTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeClass =
      this.themeClass === 'light-background'
        ? 'dark-background'
        : 'light-background';
  };

  themeChange = () => {
    if (this.themeService) {
      this.theme =
        this.themeService.currentTheme.id === 'infinity-theme'
          ? 'light'
          : 'dark';
    }
  };
  echartsLoaded = false;
  myChart = null;
  @ViewChild('chart') chart: ElementRef;

  mdt = markdownIt({
    breaks: true,
    linkify: true,
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const preCode = hljs.highlight(lang, str, true).value;
          const lines = preCode.split(/\n/).slice(0, -1);
          let html = lines
            .map((item, index) => {
              return (
                '<li><span class="line-num" data-line="' +
                (index + 1) +
                '"></span>' +
                item +
                '</li>'
              );
            })
            .join('');
          html = '<ol>' + html + '</ol>';
          return '<pre class="hljs"><code>' + html + '</code></pre>';
        } catch (__) {}
      }

      const preCode = this.mdt.utils.escapeHtml(str);
      const lines = preCode.split(/\n/).slice(0, -1);
      let html = lines
        .map((item, index) => {
          return (
            '<li><span class="line-num" data-line="' +
            (index + 1) +
            '"></span>' +
            item +
            '</li>'
          );
        })
        .join('');
      html = '<ol>' + html + '</ol>';
      return '<pre class="hljs"><code>' + html + '</code></pre>';
    },
  });

  htmlStr = this.mdt.render(this.content);

  transfer = (codeBlockData) => {
    const { code, language } = codeBlockData;
    const codeBlockStr = '```' + language + '\n' + code + '```';
    return this.mdt.render(codeBlockStr);
  };

  // 处理代码块数据
  handleCodeBlockData = (codeBlockData) => {
    if (codeBlockData.language === 'echart') {
      try {
        // 解析字符串为 ECharts 配置对象
        const option = new Function('return ' + codeBlockData.code)();
        // 根据主题设置颜色
        option.title.textStyle.color =
          this.theme === 'light' ? '#252b3a' : '#CED1DB';
        option.legend.textStyle = option.legend.textStyle || {};
        option.legend.textStyle.color =
          this.theme === 'light' ? '#252b3a' : '#CED1DB';
        option.backgroundColor = this.theme === 'light' ? '#fefefe' : '#34363A';

        if (
          option.series &&
          option.series[0] &&
          option.series[0].itemStyle &&
          option.series[0].itemStyle.normal
        ) {
          option.series[0].itemStyle.normal.label.color =
            this.theme === 'light' ? '#252b3a' : '#CED1DB';
        }

        // 渲染图表 - 确保 ECharts 已加载
        if (this.echartsLoaded) {
          this.renderChart(option);
        }
      } catch (e) {
        console.error('解析 ECharts 配置失败:', e);
      }
    }
  };

  // 渲染图表
  renderChart = (option) => {
    if (!this.chart) return;

    if (!this.myChart) {
      // 确保 window.echarts 已定义
      if (typeof (window as any).echarts !== 'undefined') {
        this.myChart = (window as any).echarts.init(this.chart.nativeElement);
      } else {
        console.error('ECharts 库未加载');
        return;
      }
    }

    if (this.myChart) {
      (this.myChart as any).setOption(option);
    }
  };

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.themeService = window['devuiThemeService'];
    }
    this.themeChange();
    if (this.themeService && this.themeService.eventBus) {
      this.themeService.eventBus.add('themeChanged', this.themeChange);
    }
    // 加载 ECharts
    if (typeof (window as any).echarts === 'undefined') {
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/echarts/6.0.0/echarts.min.js';
      script.onload = () => {
        console.log('ECharts 加载完成');
        this.echartsLoaded = true; // 设置加载完成标志
      };
      document.head.appendChild(script);
    } else {
      this.echartsLoaded = true; // 如果已加载，直接设置标志
    }

    window.addEventListener('resize', () => {
      if (this.myChart) {
        (this.myChart as any).resize();
      }
    });
  }
}
