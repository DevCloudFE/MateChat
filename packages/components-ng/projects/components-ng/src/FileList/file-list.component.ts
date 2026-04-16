import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { McTeleportComponent } from './Teleport/teleport.component';
import BaseComponent from '../Base/base.component';
import {
  FileItem,
  FileListContext,
  FileListEmits,
  FileListProps,
  PreviewType,
} from '../components-common/FileList/common/fileList-types';
import {
  FileListAdapter,
  FileListFoundation,
} from '../components-common/FileList/foundation';
import { LocaleService } from '../Locale';
import { McFileIconComponent } from './FileIcon/file-icon.component';

@Component({
  selector: 'mc-file-list',
  standalone: true,
  imports: [CommonModule, McFileIconComponent, McTeleportComponent],
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class McFileListComponent
  extends BaseComponent<FileListFoundation>
  implements OnInit
{
  @Input() fileItems: FileItem[] = [];
  @Input() context: FileListContext = 'dialog';
  @Output() remove = new EventEmitter<FileItem>();
  @Output() retryUpload = new EventEmitter<FileItem>();
  @Output() download = new EventEmitter<[FileItem, Event]>();
  @Output() preview = new EventEmitter<FileItem>();
  @Output() retryDownload = new EventEmitter<FileItem>();

  hoveredFileUid: number | null = null;
  isPreviewVisible: boolean = false;
  previewFile: FileItem | null = null;

  constructor(
    private localeService: LocaleService,
    private sanitizer: DomSanitizer,
  ) {
    super();
  }

  ngOnInit() {
    this.foundation = new FileListFoundation(this.adapter);
    this.foundation.init();
  }

  override get adapter(): FileListAdapter {
    return {
      emitRemove: (uid: number) => {
        const file = this.fileItems.find((item) => item.uid === uid);
        if (file) {
          this.remove.emit(file);
        }
      },
      emitRetryUpload: (uid: number) => {
        const file = this.fileItems.find((item) => item.uid === uid);
        if (file) {
          this.retryUpload.emit(file);
        }
      },
      emitDownload: (file: FileItem) => {
        this.download.emit([file, new Event('download')]);
      },
      emitPreview: (file: FileItem) => {
        this.preview.emit(file);
      },
      emitRetryDownload: (uid: number) => {
        const file = this.fileItems.find((item) => item.uid === uid);
        if (file) {
          this.retryDownload.emit(file);
        }
      },
      updateFileItem: (uid: number, updates: Partial<FileItem>) => {
        const index = this.fileItems.findIndex((item) => item.uid === uid);
        if (index !== -1) {
          this.fileItems[index] = { ...this.fileItems[index], ...updates };
        }
      },
      getProp: (key: string) => {
        return (this as any)[key];
      },
      getProps: () => {
        return {
          fileItems: this.fileItems,
          context: this.context,
        };
      },
      getState: (key: string) => {
        return (this as any)[key];
      },
      getStates: () => {
        return {
          isPreviewVisible: this.isPreviewVisible,
          previewFile: this.previewFile,
          hoveredFileUid: this.hoveredFileUid,
        };
      },
      setState: (s: any, callback?: any) => {
        Object.assign(this, s);
        if (callback) {
          callback();
        }
      },
      getCache: (c: string) => {
        return undefined;
      },
      getCaches: () => {
        return {};
      },
      setCache: (key: any, value: any) => {
        // 空实现
      },
      nextTick: (cb: (...args: any) => void) => {
        setTimeout(cb, 0);
      },
    };
  }

  formatFileSize(bytes: number): string {
    return this.foundation.formatFileSize(bytes);
  }

  getPreviewType(file: FileItem): PreviewType {
    return this.foundation.getPreviewType(file);
  }

  getIconComponent(file: FileItem): string {
    return this.foundation.getIconComponent(file);
  }

  getFileTypeString(filename: string): string {
    return this.foundation.getFileType(filename);
  }

  handleRemove(file: FileItem) {
    this.foundation.handleRemove(file.uid);
  }

  handleRetryUpload(file: FileItem) {
    this.foundation.handleRetryUpload(file.uid);
  }

  handleDownload(file: FileItem, event: Event) {
    this.foundation.handleDownload(file);
  }

  handlePreview(file: FileItem) {
    // 只有当文件有可供预览的 URL (url 或 thumbUrl) 时，才触发预览
    if (file.url || file['thumbUrl']) {
      this.previewFile = file;
      this.isPreviewVisible = true;
      this.foundation.handlePreview(file);
    }
  }

  // 确保 previewFile?.name 有默认值
  get previewFileName(): string {
    return this.previewFile?.name || '';
  }

  handleRetryDownload(file: FileItem) {
    this.foundation.handleRetryDownload(file.uid);
  }

  closePreview() {
    this.isPreviewVisible = false;
    this.previewFile = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isPreviewVisible) {
      this.closePreview();
    }
  }

  // 国际化翻译方法
  t(key: string, params?: Record<string, any>): string {
    try {
      return this.localeService.translate(key, params);
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return key;
    }
  }

  // 安全处理 URL
  sanitizeUrl(url: string | undefined): SafeResourceUrl {
    if (!url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
