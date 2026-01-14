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

export type BeforeUpload = (file: File) => boolean | Promise<boolean>;

export interface ChangeEventArg {
  file: File;
  fileList: FileItem[];
}

export interface SuccessEventArg {
  file: File;
  response: FileItem['response'];
  fileList: FileItem[];
}

export interface ErrorEventArg {
  file: File;
  error: FileItem['error'];
  fileList: FileItem[];
}

export interface ProgressEventArg {
  file: File;
  fileList: FileItem[];
}

export interface DropEventArg {
  files: File[];
}

export type ValidResultType =
  | 'exceedCount'
  | 'unsupportedFileType'
  | 'exceedSizeLimit'
  | 'beforeUploadRejected';

export interface IValidResult {
  type: ValidResultType;
  file?: File;
}
