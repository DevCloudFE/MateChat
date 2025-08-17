import articleMd from '../mock-data/article.md?raw';
import formatDateMd from '../mock-data/formatDate.md?raw';
import greenTheme from '../mock-data/greenTheme.md?raw';
import helpMd from '../mock-data/help.md?raw';
import quickSortMd from '../mock-data/quicksort.md?raw';
import type { IMessageAvatar } from '../types/type-chat-view';

export const introPromptCn = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 快速实现一个可用的快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: '了解当前大模型可以帮你做的事',
    },
    {
      value: 'bindProjectSpace',
      label: '怎么绑定项目空间',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: '如何绑定云空间中的项目',
    },
  ],
};
export const introPromptEn = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: 'Help me write a quick sort',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: 'Use js to quickly implement a usable quick sort',
    },
    {
      value: 'helpMd',
      label: 'What can you do for me?',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: 'Understand what the current big model can do for you',
    },
    {
      value: 'bindProjectSpace',
      label: 'How to bind a project space',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: 'How to bind a project in the cloud space',
    },
  ],
};

export const guessQuestionsCn = [
  { label: '帮我写一篇文章', value: 'article' },
  { label: '你可以帮我做些什么？', value: 'helpMd' },
  { label: '帮我写一个快速排序', value: 'quickSort' },
  { label: '使用 js 格式化时间', value: 'formatDate' },
];
export const guessQuestionsEn = [
  { label: 'How to bind a project space', value: 'article' },
  { label: 'List of recently executed pipelines', value: 'helpMd' },
  { label: 'Help me write a quick sort', value: 'quickSort' },
  { label: 'Use js to format time', value: 'formatDate' },
];

export const mockAnswer = {
  quickSort: quickSortMd,
  theme: greenTheme,
  helpMd: helpMd,
  article: articleMd,
  formatDate: formatDateMd,
};

export const customerAvatar: IMessageAvatar = {
  imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
  width: 32,
  height: 32,
};
export const aiModelAvatar: IMessageAvatar = {
  imgSrc: 'https://matechat.gitcode.com/logo.svg',
  width: 32,
  height: 32,
};
