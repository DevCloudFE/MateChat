import type { FileItem, UploadOptions } from './attachment-types';

interface UploaderOptions {
  file: File;
  fileItem: FileItem;
  options: UploadOptions;
  onProgress: (percentage: number) => void;
  onSuccess: (response: unknown) => void;
  onError: (error: unknown) => void;
}

export function upload(config: UploaderOptions): void {
  const { file, options, onProgress, onSuccess, onError } = config;

  const xhr = new XMLHttpRequest();

  // 进度回调
  xhr.upload.onprogress = (e: ProgressEvent) => {
    if (e.lengthComputable) {
      const percentage = Math.round((e.loaded * 100) / e.total);
      onProgress(percentage);
    }
  };

  // 错误处理
  xhr.onerror = () => {
    onError({
      message: 'Upload failed due to a network error.',
      status: xhr.status,
      statusText: xhr.statusText,
    });
  };

  // 响应处理
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response =
        options.responseType === 'text' || !xhr.response
          ? xhr.responseText
          : xhr.response;
      onSuccess(response);
    } else {
      onError({
        message: `Upload failed with status: ${xhr.status}`,
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.response,
      });
    }
  };

  // 准备 FormData
  const formData = new FormData();
  const fileFieldName = options.fileFieldName || 'file';
  formData.append(fileFieldName, file, file.name);

  if (options.additionalParameter) {
    for (const key of Object.keys(options.additionalParameter)) {
      formData.append(key, options.additionalParameter[key]);
    }
  }

  // 打开请求
  xhr.open(options.method || 'POST', options.uri, true);

  // 设置 withCredentials
  if (options.withCredentials) {
    xhr.withCredentials = true;
  }

  // 设置 responseType
  if (options.responseType) {
    xhr.responseType = options.responseType;
  }

  // 设置 Headers
  if (options.headers) {
    for (const key of Object.keys(options.headers)) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
  }

  // 设置认证 Token
  if (options.authToken) {
    const authTokenHeader = options.authTokenHeader || 'Authorization';
    xhr.setRequestHeader(authTokenHeader, options.authToken);
  }

  // 发送请求
  xhr.send(formData);
}
