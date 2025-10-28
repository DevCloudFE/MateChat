import type { ExtractPropTypes, PropType } from 'vue';

export type FileStatus =
  | 'uploading'
  | 'downloading'
  | 'success'
  | 'uploadError'
  | 'downloadError';

export interface FileItem<T = unknown, E = unknown> {
  uid: number;
  name: string;
  size: number;
  type?: string;
  status?: FileStatus;
  percentage?: number;
  // 可以存放服务器响应信息
  id?: string | number;
  response?: T;
  error?: E;
  thumbUrl?: string;
  url?: string;
}
// 新增：定义上传选项接口
export interface UploadOptions {
  // 上传接口地址
  uri: string | URL;
  // http 请求方法
  method?: 'POST' | 'PUT' | 'PATCH';
  // 自定义请求headers
  headers?: {
    [key: string]: string;
  };
  // 认证token
  authToken?: string;
  // 认证token header标示
  authTokenHeader?: string;
  // 上传额外自定义参数
  additionalParameter?: {
    [key: string]: string | Blob;
  };
  // 上传文件字段名称，默认file
  fileFieldName?: string;
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean;
  //  手动设置返回数据类型
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

// Attachment组件的属性定义
export const AttachmentProps = {
  uploadOptions: {
    type: Object as PropType<UploadOptions>,
    default: {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: '',
  },
  maxCount: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  maxSize: {
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
  success: (file: File, response: FileItem['response'], fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  error: (file: File, error: FileItem['error'], fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  progress: (file: File, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  drop: (files: File[]) => Array.isArray(files),
};
// 编译时类型检查
export type AttachmentEmits = {
  (e: 'change', file: File, fileList: FileItem[]): void;
  (
    e: 'success',
    file: File,
    response: FileItem['response'],
    fileList: FileItem[],
  ): void;
  (
    e: 'error',
    file: File,
    error: FileItem['error'],
    fileList: FileItem[],
  ): void;
  (e: 'progress', file: File, fileList: FileItem[]): void;
  (e: 'drop', files: File[]): void;
};
