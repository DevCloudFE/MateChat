import quickSortMd from './quicksort.md?raw';
import helpMd from './help.md?raw';

export const introPrompt = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      icon: 'icon-info-o',
      color: 'rgb(255, 215, 0)',
      desc: '使用 js 快速实现一个可用的快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      icon: 'icon-star',
      color: 'rgb(255, 215, 0)',
      desc: '了解当前大模型可以帮你做的事',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      icon: 'icon-star',
      color: 'rgb(255, 215, 0)',
      desc: '了解当前大模型可以帮你做的事',
    },
  ],
};

export const guessQuestions = [
  { label: '怎么绑定项目空间' },
  { label: '最近执行流水线列表' },
  { label: '帮我写一个快速排序' },
  { label: '使用 js 格式化时间' },
];

export const simplePrompt = [
  {
    value: 'quickSort',
    icon: 'icon-info-o',
    color: 'rgb(255, 215, 0)',
    label: '帮我写一个快速排序',
  },
  {
    value: 'helpMd',
    icon: 'icon-star',
    color: 'rgb(255, 215, 0)',
    label: '你可以帮我做些什么？',
  },
];

export const mockAnswer = {
  quickSort: quickSortMd,
  helpMd: helpMd,
};
