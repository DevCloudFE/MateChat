import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type {
  AttachmentEmits,
  AttachmentProps,
  FileItem,
  IValidResult,
} from "./attachment-types";
import { upload } from "./uploader";

let uid = Date.now();

export function useUpload(
  props: AttachmentProps,
  emit: AttachmentEmits,
  inputRef: Ref<HTMLInputElement | undefined>,
  fileList: Ref<FileItem[]> // 直接接收 defineModel 返回的 ref
) {
  // 创建一个计算属性来统一管理禁用状态
  const isDisabled = computed(() => {
    // 如果外部传入了 disabled，或者文件数量达到或超过了限制，则禁用
    return props.disabled || fileList.value.length >= props.maxCount;
  });

  const getFileItem = (file: File): FileItem => {
    const localUrl = URL.createObjectURL(file);
    return {
      uid: uid++,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      percentage: 0,
      url: localUrl,
      thumbUrl: localUrl,
    };
  };
  // 前端校验
  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // 检查文件数量限制
    if (fileList.value.length + files.length > props.maxCount) {
      emit("validResult", [{ type: "exceedCount" }]);
      return;
    }

    const validFiles: File[] = [];
    const validRes: IValidResult[] = [];

    // 2. 遍历并校验每个文件
    for (const file of files) {
      let isFileValid = true;

      // 2.1 文件类型校验
      if (props.accept && props.accept !== "*") {
        const acceptedTypes = props.accept
          .split(",")
          .map((t) => t.trim().toLowerCase());
        const fileType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();
        const isTypeValid = acceptedTypes.some((type) => {
          if (type.endsWith("/*"))
            return fileType.startsWith(type.slice(0, -1));
          if (type.startsWith(".")) return fileName.endsWith(type);
          return fileType === type;
        });

        if (!isTypeValid) {
          validRes.push({ type: "unsupportedFileType", file });
          isFileValid = false;
        }
      }

      // 2.2 文件大小校验
      if (isFileValid && file.size / 1024 / 1024 > props.maxSize) {
        validRes.push({ type: "exceedSizeLimit", file });
        isFileValid = false;
      }

      // 2.3 上传前钩子校验
      if (isFileValid && props.beforeUpload) {
        try {
          const result = await Promise.resolve(props.beforeUpload(file));
          if (result === false) {
            validRes.push({ type: "beforeUploadRejected", file });
            isFileValid = false;
          }
        } catch (e) {
          validRes.push({ type: "beforeUploadRejected", file });
          isFileValid = false;
        }
      }

      if (isFileValid) {
        validFiles.push(file);
      }
    }

    if (validRes.length > 0) {
      emit("validResult", validRes);
    }

    // 只处理通过所有校验的有效文件
    if (validFiles.length === 0) return;

    for (const file of validFiles) {
      const fileItem = getFileItem(file);
      fileList.value.push(fileItem);
      emit("change", file, [...fileList.value]);
      performUpload(file, fileItem);
    }
  };
  // 执行上传
  const performUpload = (file: File, fileItem: FileItem) => {
    const findFileIndex = () =>
      fileList.value.findIndex((item) => item.uid === fileItem.uid);

    upload({
      file,
      fileItem,
      options: props.uploadOptions,
      onProgress: (percentage: number) => {
        const index = findFileIndex();
        if (index > -1) {
          fileList.value[index].percentage = percentage;
          emit("progress", file, [...fileList.value]);
        }
      },
      onSuccess: (response: unknown) => {
        const index = findFileIndex();
        if (index > -1) {
          fileList.value[index].status = "success";
          fileList.value[index].response = response;
          emit("success", file, response, [...fileList.value]);
        }
      },
      onError: (error: unknown) => {
        const index = findFileIndex();
        if (index > -1) {
          fileList.value[index].status = "uploadError";
          fileList.value[index].error = error;
          emit("error", file, error, [...fileList.value]);
        }
      },
    });
  };

  const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      uploadFiles(Array.from(files));
    }
  };

  const handleClick = () => {
    // 使用计算属性进行判断
    if (isDisabled.value) return;
    inputRef.value?.click();
  };

  return {
    isDisabled,
    handleClick,
    handleFileChange,
    uploadFiles,
  };
}
