import type { ExtractPropTypes, PropType } from 'vue';
import type { FileItem } from '../Attachment/attachment-types';
// 这里应该是按照FileList组件的需求来定义props, 不用限制Attachment组件的props
export const fileListProps = {
  // 文件列表数据
  fileItems: {
    type: Array as PropType<FileItem[]>,
    default: () => [],
  },
  // 组件上下文，决定其外观和行为
  context: {
    type: String as PropType<'input' | 'dialog'>,
    validator: (value: string) => ['input', 'dialog'].includes(value),
  },
} as const;

export type FileListProps = ExtractPropTypes<typeof fileListProps>;

export const fileListEmits = {
  remove: (file: FileItem) => file && typeof file === 'object',
  'retry-upload': (file: FileItem) => file && typeof file === 'object',
  // 下载、预览和重试下载事件
  download: (file: FileItem, event: Event) => file && typeof file === 'object',
  preview: (file: FileItem) => file && typeof file === 'object',
  'retry-download': (file: FileItem) => file && typeof file === 'object',
};

export type FileListEmits = typeof fileListEmits;
