export interface FileItem {
  uid: number;
  name: string;
  size: number;
  status?:
    | 'uploading'
    | 'success'
    | 'error'
    | 'downloading'
    | 'uploadError'
    | 'downloadError';
  percentage?: number;
  type?: string;
  url?: string;
  preview?: string;
  downloadUrl?: string;
  error?: string;
  isHovered?: boolean;
  [key: string]: any;
}

export type FileListContext = 'input' | 'dialog';

export interface FileListProps {
  fileItems: FileItem[];
  context: FileListContext;
}

export interface FileListEmits {
  remove: [uid: string];
  'retry-upload': [uid: string];
  preview: [file: FileItem];
  download: [file: FileItem];
  'retry-download': [uid: string];
}

export type PreviewType = 'image' | 'video' | 'iframe' | 'unsupported';
