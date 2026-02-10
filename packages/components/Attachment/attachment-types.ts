import type { ExtractPropTypes, InjectionKey, PropType, Ref, VNode } from "vue";
import type {
  UploadOptions,
  FileStatus,
  FileItem,
  BeforeUpload,
  ValidResultType,
  IValidResult,
} from "@matechat/common/Attachment/common/attachment-types.ts";

export {
  UploadOptions,
  FileStatus,
  FileItem,
  BeforeUpload,
  ValidResultType,
  IValidResult,
};

// Attachment组件的属性定义
export const AttachmentProps = {
  uploadOptions: {
    type: Object as PropType<UploadOptions>,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: "",
  },
  dropPlaceholder: {
    type: String,
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
    type: Function as PropType<BeforeUpload>,
    default: null,
  },
  getDropContainer: {
    type: Function as PropType<() => HTMLElement>,
  },
} as const;

export type AttachmentProps = ExtractPropTypes<typeof AttachmentProps>;

// Attachment组件的事件定义
// 这里进行了详细的校验机制，若不满足条件则会抛出错误
export const AttachmentEmits = {
  change: (file: File, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  success: (file: File, response: FileItem["response"], fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  error: (file: File, error: FileItem["error"], fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  progress: (file: File, fileList: FileItem[]) =>
    file instanceof File && Array.isArray(fileList),
  drop: (files: File[]) => Array.isArray(files),
  validChange: (e: IValidResult[]) => Array.isArray(e),
};
// 编译时类型检查
export type AttachmentEmits = {
  (e: "change", file: File, fileList: FileItem[]): void;
  (
    e: "success",
    file: File,
    response: FileItem["response"],
    fileList: FileItem[]
  ): void;
  (
    e: "error",
    file: File,
    error: FileItem["error"],
    fileList: FileItem[]
  ): void;
  (e: "progress", file: File, fileList: FileItem[]): void;
  (e: "drop", files: File[]): void;
  (e: "validChange", validResult: IValidResult[]): void;
};

export interface AttachmentSlots {
  default(): VNode;
  dropPlaceholder(): VNode;
}

export interface IAttachmentCtx {
  rootProps: AttachmentProps;
  rootEmits: AttachmentEmits;
  isDisabled: Ref<boolean>;
  uploadFiles: (files: File[]) => Promise<void>;
}

export const AttachmentInjectKey =
  "mc-attachment" as unknown as InjectionKey<IAttachmentCtx>;
