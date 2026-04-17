import BaseFoundation, { type DefaultAdapter } from '../Base/foundation';
import {
  type FileItem,
  FileListContext,
  type PreviewType,
} from './common/fileList-types';

export interface FileListAdapter extends DefaultAdapter {
  emitRemove: (uid: number) => void;
  emitRetryUpload: (uid: number) => void;
  emitPreview: (file: FileItem) => void;
  emitDownload: (file: FileItem) => void;
  emitRetryDownload: (uid: number) => void;
  updateFileItem: (uid: number, updates: Partial<FileItem>) => void;
}

export class FileListFoundation extends BaseFoundation<FileListAdapter> {
  constructor(adapter: FileListAdapter) {
    super({ ...adapter });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / k ** i).toFixed(2)) + ' ' + sizes[i];
  }

  getFileType(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (!ext) return 'file';

    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
    const audioExts = ['mp3', 'wav', 'ogg', 'flac', 'aac'];
    const docExts = ['doc', 'docx', 'txt', 'pdf', 'rtf', 'md'];
    const sheetExts = ['xls', 'xlsx', 'csv'];
    const pptExts = ['ppt', 'pptx'];
    const codeExts = [
      'js',
      'ts',
      'jsx',
      'tsx',
      'html',
      'css',
      'scss',
      'json',
      'xml',
      'yml',
      'yaml',
    ];
    const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz'];

    if (imageExts.includes(ext)) return 'image';
    if (videoExts.includes(ext)) return 'video';
    if (audioExts.includes(ext)) return 'audio';
    if (docExts.includes(ext)) return 'document';
    if (sheetExts.includes(ext)) return 'spreadsheet';
    if (pptExts.includes(ext)) return 'presentation';
    if (codeExts.includes(ext)) return 'code';
    if (archiveExts.includes(ext)) return 'archive';

    return 'file';
  }

  getPreviewType(file: FileItem): PreviewType {
    const name = file.name;
    const ext = name.split('.').pop()?.toLowerCase();
    if (!ext) return 'unsupported';

    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
    const iframeExts = ['pdf', 'html'];

    if (imageExts.includes(ext)) return 'image';
    if (videoExts.includes(ext)) return 'video';
    if (iframeExts.includes(ext)) return 'iframe';

    return 'unsupported';
  }

  handleRemove(uid: number): void {
    this._adapter.emitRemove(uid);
  }

  handleRetryUpload(uid: number): void {
    this._adapter.emitRetryUpload(uid);
  }

  handlePreview(file: FileItem): void {
    this._adapter.emitPreview(file);
  }

  handleDownload(file: FileItem): void {
    this._adapter.emitDownload(file);
  }

  handleRetryDownload(uid: number): void {
    this._adapter.emitRetryDownload(uid);
  }

  handleMouseEnter(uid: number): void {
    this._adapter.updateFileItem(uid, { isHovered: true });
  }

  handleMouseLeave(uid: number): void {
    this._adapter.updateFileItem(uid, { isHovered: false });
  }

  getIconComponent(file: FileItem): string {
    if (file.type) {
      if (file.type?.startsWith('image/')) return 'image-icon';
      if (file.type?.startsWith('video/')) return 'mp4-icon';
      if (file.type?.startsWith('audio/')) return 'mp4-icon';
      if (file.type?.startsWith('text/')) return 'document-icon';
      if (file.type === 'application/pdf') return 'pdf-icon';
      if (file.type === 'application/zip' || file.type?.includes('compress'))
        return 'compressed-file-icon';
    }
    const extension = file.name.split('.').pop()?.toLowerCase();

    const extensionMap: Record<string, string> = {
      // Office & Documents
      ppt: 'ppt-icon',
      pptx: 'ppt-icon',
      pdf: 'pdf-icon',
      doc: 'document-icon',
      docx: 'document-icon',
      xls: 'excel-icon',
      xlsx: 'excel-icon',
      csv: 'excel-icon',
      txt: 'document-icon',
      rtf: 'document-icon',
      page: 'page-icon',
      md: 'markdown-icon',
      markdown: 'markdown-icon',
      // Image
      jpg: 'image-icon',
      jpeg: 'image-icon',
      png: 'image-icon',
      gif: 'image-icon',
      webp: 'image-icon',
      svg: 'image-icon',
      bmp: 'image-icon',
      // Video
      mp4: 'mp4-icon',
      avi: 'mp4-icon',
      mov: 'mp4-icon',
      wmv: 'mp4-icon',
      flv: 'mp4-icon',
      webm: 'mp4-icon',
      mkv: 'mp4-icon',
      // Audio
      mp3: 'mp4-icon',
      wav: 'mp4-icon',
      ogg: 'mp4-icon',
      flac: 'mp4-icon',
      aac: 'mp4-icon',
      // Code
      js: 'code-file-icon',
      ts: 'code-file-icon',
      jsx: 'code-file-icon',
      tsx: 'code-file-icon',
      html: 'code-file-icon',
      css: 'code-file-icon',
      scss: 'code-file-icon',
      less: 'code-file-icon',
      json: 'code-file-icon',
      yaml: 'code-file-icon',
      yml: 'code-file-icon',
      xml: 'code-file-icon',
      // Compressed
      zip: 'compressed-file-icon',
      rar: 'compressed-file-icon',
      '7z': 'compressed-file-icon',
      tar: 'compressed-file-icon',
      gz: 'compressed-file-icon',
      // Other
      mind: 'mind-icon',
      board: 'drawing-board-icon',
      flow: 'flow-chart-icon',
      email: 'email-file-icon',
    };

    return extensionMap[extension || ''] || 'unknown-icon';
  }
}
