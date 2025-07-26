import type { ExtractPropTypes, PropType } from 'vue';

export type UploadStatus = 'uploading' | 'success' | 'error';

export interface FileItem {
  uid: number;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  percentage: number;
  // 可以存放服务器响应信息
  response?: string;
  error?: string;
}
// Attachment组件的属性定义
export const AttachmentProps = {
  uploadOptions: {
    type: Object,
    default: {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: '*/*',
  },
  limit: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  size: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '请选择文件',
  },
  // 这一部分需要修改下
  beforeUpload: {
    type: Function as PropType<(file: File) => boolean | Promise<boolean>>,
    default: null,
  },
} as const;

export type AttachmentProps = ExtractPropTypes<typeof AttachmentProps>;
// Attachment组件的事件定义
// 这里进行了详细的校验机制，若不满足条件则会抛出错误
export const AttachmentEmits = {
  change: (file: File, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  success: (file: File, response: string, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  error: (file: File, error: string, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  progress: (file: File, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  drop: (files: File[]) => Array.isArray(files),
};
// 编译时类型检查
export type AttachmentEmits = {
  (e: 'change', file: File, fileList: FileItem[]): void;
  (e: 'success', file: File, response: string, fileList: FileItem[]): void;
  (e: 'error', file: File, error: string, fileList: FileItem[]): void;
  (e: 'progress', file: File, fileList: FileItem[]): void;
  (e: 'drop', files: File[]): void;
};
