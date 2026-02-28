import {
  UploadOptions,
  FileStatus,
  FileItem,
  BeforeUpload,
  ValidResultType,
  IValidResult,
} from '../components-common/Attachment/common/attachment-types';

export {
  UploadOptions,
  FileStatus,
  FileItem,
  BeforeUpload,
  ValidResultType,
  IValidResult,
};

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
