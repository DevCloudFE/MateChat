import type { ExtractPropTypes, PropType } from 'vue';
import type { FileItem } from '../Attachment/attachment-types';

export const fileListProps = {
  // 文件列表数据
  files: {
    type: Array as PropType<FileItem[]>,
    default: () => [],
  },
} as const;

export type FileListProps = ExtractPropTypes<typeof fileListProps>;

export const fileListEmits = {
  remove: (file: FileItem) => file && typeof file === 'object',
};

export type FileListEmits = typeof fileListEmits;
