import { useMcI18n } from '@matechat/core/Locale';
import type { Ref } from 'vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { showAlert } from './Alert.vue'; // 引入新的 alert 服务
import type {
  AttachmentEmits,
  AttachmentProps,
  FileItem,
} from './attachment-types';
import { upload } from './uploader';

let uid = Date.now();

export function useUpload(
  props: AttachmentProps,
  emit: AttachmentEmits,
  inputRef: Ref<HTMLInputElement | undefined>,
  fileList: Ref<FileItem[]>, // 直接接收 defineModel 返回的 ref
) {
  const { t } = useMcI18n();
  const isDragging = ref(false);
  // 使用计数器来跟踪 dragenter 和 dragleave 事件，防止进入子元素导致的状态变化
  let dragCounter = 0;

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
      status: 'uploading',
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
      // 使用自定义的 alert 服务进行提示
      showAlert({
        type: 'error',
        title: t('Attachment.exceedCountTitle'),
        message: t('Attachment.exceedCountMessage', {
          maxCount: props.maxCount,
        }),
      });
      return;
    }

    const validFiles: File[] = [];
    const errorMessages: string[] = [];

    // 2. 遍历并校验每个文件
    for (const file of files) {
      let isFileValid = true;

      // 2.1 文件类型校验
      if (props.accept && props.accept !== '*') {
        const acceptedTypes = props.accept
          .split(',')
          .map((t) => t.trim().toLowerCase());
        const fileType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();
        const isTypeValid = acceptedTypes.some((type) => {
          if (type.endsWith('/*'))
            return fileType.startsWith(type.slice(0, -1));
          if (type.startsWith('.')) return fileName.endsWith(type);
          return fileType === type;
        });

        if (!isTypeValid) {
          errorMessages.push(
            t('Attachment.unsupportedFileType', { fileName: file.name }),
          );
          isFileValid = false;
        }
      }

      // 2.2 文件大小校验
      if (isFileValid && file.size / 1024 / 1024 > props.maxSize) {
        errorMessages.push(
          t('Attachment.exceedSizeLimit', {
            fileName: file.name,
            maxSize: props.maxSize,
          }),
        );
        isFileValid = false;
      }

      // 2.3 上传前钩子校验
      if (isFileValid && props.beforeUpload) {
        try {
          const result = await Promise.resolve(props.beforeUpload(file));
          if (result === false) {
            errorMessages.push(
              t('Attachment.uploadRejected', { fileName: file.name }),
            );
            isFileValid = false;
          }
        } catch (e) {
          const errorMsg = e instanceof Error ? e.message : String(e);
          errorMessages.push(
            t('Attachment.beforeUploadFailed', {
              fileName: file.name,
              errorMsg,
            }),
          );
          isFileValid = false;
        }
      }

      if (isFileValid) {
        validFiles.push(file);
      }
    }

    // 如果有错误，则统一弹窗提示
    if (errorMessages.length > 0) {
      showAlert({
        type: 'error',
        title: t('Attachment.uploadFailedTitle'),
        message: errorMessages.join('\n'),
      });
    }

    // 只处理通过所有校验的有效文件
    if (validFiles.length === 0) return;

    for (const file of validFiles) {
      const fileItem = getFileItem(file);
      fileList.value.push(fileItem);
      emit('change', file, [...fileList.value]);
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
          emit('progress', file, [...fileList.value]);
        }
      },
      onSuccess: (response: unknown) => {
        const index = findFileIndex();
        if (index > -1) {
          fileList.value[index].status = 'success';
          fileList.value[index].response = response;
          emit('success', file, response, [...fileList.value]);
        }
      },
      onError: (error: unknown) => {
        const index = findFileIndex();
        if (index > -1) {
          fileList.value[index].status = 'uploadError';
          fileList.value[index].error = error;
          emit('error', file, error, [...fileList.value]);
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

  // 拖拽相关事件处理
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) {
      isDragging.value = true;
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      isDragging.value = false;
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
    dragCounter = 0; // 重置计数器
    if (isDisabled.value) return;

    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0) {
      emit('drop', files);
      uploadFiles(files);
    }
  };
  // 生命周期钩子绑定拖拽监听
  onMounted(() => {
    if (props.draggable) {
      document.body.addEventListener('dragenter', handleDragEnter);
      document.body.addEventListener('dragover', handleDragOver);
      document.body.addEventListener('dragleave', handleDragLeave);
      document.body.addEventListener('drop', handleDrop);
    }
  });

  onUnmounted(() => {
    if (props.draggable) {
      document.body.removeEventListener('dragenter', handleDragEnter);
      document.body.removeEventListener('dragover', handleDragOver);
      document.body.removeEventListener('dragleave', handleDragLeave);
      document.body.removeEventListener('drop', handleDrop);
    }
  });

  return {
    isDragging,
    isDisabled,
    handleClick,
    handleFileChange,
  };
}
