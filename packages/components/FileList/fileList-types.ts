import type { ExtractPropTypes, PropType } from 'vue';
import type { FileItem } from '../Attachment/attachment-types';
// 这里应该是按照FileList组件的需求来定义props, 不用限制Attachment组件的props
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
