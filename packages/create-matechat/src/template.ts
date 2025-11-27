import path from 'node:path';
import type { Template } from './types';

export const templates: Template[] = [
  {
    name: 'Vue Starter',
    sources: [
      {
        from: path.join(__dirname, '../templates/vue-starter'),
        to: '.',
      },
    ],
  },
];
