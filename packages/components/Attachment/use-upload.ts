import type { Ref } from 'vue';
import { onMounted, onUnmounted, ref } from 'vue';
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
  const isDragging = ref(false);
  // 使用计数器来跟踪 dragenter 和 dragleave 事件，防止进入子元素导致的状态变化
  let dragCounter = 0;
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

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // 检查文件数量限制
    if (fileList.value.length + files.length > props.limit) {
      console.error('Exceed file limit');
      return;
    }

    for (const file of files) {
      const fileItem = getFileItem(file);

      // 文件类型校验
      if (props.accept && props.accept !== '*') {
        const acceptedTypes = props.accept
          .split(',')
          .map((t) => t.trim().toLowerCase());
        const fileType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();

        const isValid = acceptedTypes.some((type) => {
          if (type.endsWith('/*')) {
            // e.g., 'image/*'
            return fileType.startsWith(type.slice(0, -1));
          }
          if (type.startsWith('.')) {
            // e.g., '.pdf'
            return fileName.endsWith(type);
          }
          return fileType === type; // e.g., 'application/pdf'
        });

        if (!isValid) {
          fileItem.status = 'error';
          fileItem.error = '暂不支持该附件格式';
          fileList.value.push(fileItem);
          emit('error', file, fileItem.error, [...fileList.value]);
          continue; // 阻止上传
        }
      }

      // 检查文件大小
      if (file.size / 1024 / 1024 > props.size) {
        fileItem.status = 'error';
        fileItem.error = `File size cannot exceed ${props.size}MB`;
        fileList.value.push(fileItem); // 直接修改 fileList，自动同步
        emit('error', file, fileItem.error, [...fileList.value]);
        continue;
      }

      // 上传前钩子
      if (props.beforeUpload) {
        try {
          const result = await Promise.resolve(props.beforeUpload(file));
          if (result === false) {
            fileItem.status = 'error';
            const errorMsg = 'File validation failed before upload.';
            fileItem.error = errorMsg;
            fileList.value.push(fileItem); // 将带错误状态的文件添加到列表
            emit('error', file, errorMsg, [...fileList.value]);
            continue;
          }
        } catch (e) {
          // 捕获 beforeUpload 中可能抛出的错误 (例如 Promise.reject)
          fileItem.status = 'error';
          fileItem.error = e instanceof Error ? e.message : e;
          fileList.value.push(fileItem); // 将带错误状态的文件添加到列表
          emit('error', file, fileItem.error, [...fileList.value]);
          continue; // 阻止上传
        }
      }

      fileList.value.push(fileItem); // 直接修改 fileList，自动同步
      emit('change', file, [...fileList.value]);
      console.log('Uploading file:', [...fileList.value]);
      // simulateUpload(file, fileItem);
      // 调用真实的上传函数，而不是模拟函数
      performUpload(file, fileItem);
    }
  };

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
          fileList.value[index].status = 'error';
          fileList.value[index].error = error;
          emit('error', file, error, [...fileList.value]);
        }
      },
    });
  };

  const handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    console.log('Selected files:', files);
    if (files) {
      uploadFiles(Array.from(files));
    }
    // setTimeout(() => {
    //   if (inputRef.value) {
    //     inputRef.value.value = '';
    //   }
    // }, 0);
  };

  const handleClick = () => {
    if (props.disabled) return;
    inputRef.value?.click();
  };

  // 拖拽相关事件处理
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    if (props.disabled) return;
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
    if (props.disabled) return;

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
    handleClick,
    handleFileChange,
  };
}
