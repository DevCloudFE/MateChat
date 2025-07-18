import type { Ref } from 'vue';
import type {
  AttachmentEmits,
  AttachmentProps,
  FileItem,
} from './attachment-types';

let uid = Date.now();

export function useUpload(
  props: AttachmentProps,
  emit: AttachmentEmits,
  inputRef: Ref<HTMLInputElement | undefined>,
  fileList: Ref<FileItem[]>, // 直接接收 defineModel 返回的 ref
) {
  const getFileItem = (file: File): FileItem => ({
    uid: uid++,
    name: file.name,
    size: file.size,
    type: file.type,
    status: 'uploading',
    percentage: 0,
  });

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // 检查文件数量限制
    if (fileList.value.length + files.length > props.limit) {
      console.error('Exceed file limit');
      return;
    }

    for (const file of files) {
      const fileItem = getFileItem(file);

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
        const result = await Promise.resolve(props.beforeUpload(file));
        if (result === false) continue;
      }

      fileList.value.push(fileItem); // 直接修改 fileList，自动同步
      emit('change', file, [...fileList.value]);
      console.log('Uploading file:', [...fileList.value]);
      simulateUpload(file, fileItem);
    }
  };

  const simulateUpload = (file: File, fileItem: FileItem) => {
    const interval = setInterval(() => {
      // 找到对应的文件项索引
      const index = fileList.value.findIndex(
        (item) => item.uid === fileItem.uid,
      );
      if (index === -1) {
        clearInterval(interval);
        return;
      }
      // 从 fileList 中获取最新的文件项
      const currentFileItem = fileList.value[index];
      if (currentFileItem.percentage <= 95) {
        // 通过索引更新，确保响应式
        fileList.value[index] = {
          ...fileList.value[index],
          percentage: fileList.value[index].percentage + 5,
        };
        emit('progress', file, [...fileList.value]);
      } else {
        clearInterval(interval);
        // 模拟成功/失败
        if (Math.random() > 0.2) {
          fileList.value[index] = {
            ...fileList.value[index],
            status: 'success',
            percentage: 100,
            response: {
              message: 'Upload success',
              url: `https://example.com/${fileItem.name}`,
            },
          };
          emit('success', file, fileItem.response, [...fileList.value]);
        } else {
          fileList.value[index] = {
            ...fileList.value[index],
            status: 'error',
            error: { message: 'Upload failed' },
          };
          emit('error', file, fileList.value[index].error, [...fileList.value]);
        }
      }
    }, 200);
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

  return {
    handleClick,
    handleFileChange,
  };
}
