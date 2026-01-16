import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../Locale/translate.pipe';
import type {
  UploadOptions,
  BeforeUpload,
  ChangeEventArg,
  SuccessEventArg,
  ErrorEventArg,
  ProgressEventArg,
  IValidResult,
  FileItem,
} from './attachment-types';
import { upload } from '../components-common/Attachment/common/uploader';
import { DropAreaComponent } from './drop-area/drop-area.component';

@Component({
  selector: 'mc-attachment',
  standalone: true,
  imports: [CommonModule, TranslatePipe, DropAreaComponent],
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent {
  @Input() uploadOptions: UploadOptions = { uri: '' };
  @Input() disabled: boolean = false;
  @Input() accept: string = '';
  @Input() dropPlaceholder: string | undefined;
  @Input() maxCount: number = Number.POSITIVE_INFINITY;
  @Input() maxSize: number = Number.POSITIVE_INFINITY;
  @Input() multiple: boolean = true;
  @Input() draggable: boolean = true;
  @Input() beforeUpload: BeforeUpload;
  @Input() getDropContainer: () => HTMLElement;

  @Output() change = new EventEmitter<ChangeEventArg>();
  @Output() success = new EventEmitter<SuccessEventArg>();
  @Output() error = new EventEmitter<ErrorEventArg>();
  @Output() progress = new EventEmitter<ProgressEventArg>();
  @Output() drop = new EventEmitter<File[]>();
  @Output() validChange = new EventEmitter<IValidResult[]>();

  @ContentChild('dropPlaceholder')
  dropPlaceholderTemplate: TemplateRef<any> | null = null;

  @ViewChild('input') inputEl!: ElementRef<HTMLInputElement>;

  fileList: FileItem[] = [];
  uid = Date.now();

  get isDisabled() {
    return this.disabled || this.fileList.length >= this.maxCount;
  }

  onDrop(e: File[]) {
    this.uploadFiles(e);
    this.drop.emit(e);
  }

  getFileItem = (file: File): FileItem => {
    const localUrl = URL.createObjectURL(file);
    return {
      uid: this.uid++,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      percentage: 0,
      url: localUrl,
      thumbUrl: localUrl,
    };
  };

  uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    // 检查文件数量限制
    if (this.fileList.length + files.length > this.maxCount) {
      this.validChange.emit([{ type: 'exceedCount' }]);
      return;
    }

    const validFiles: File[] = [];
    const validRes: IValidResult[] = [];

    // 2. 遍历并校验每个文件
    for (const file of files) {
      let isFileValid = true;

      // 2.1 文件类型校验
      if (this.accept && this.accept !== '*') {
        const acceptedTypes = this.accept
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
          validRes.push({ type: 'unsupportedFileType', file });
          isFileValid = false;
        }
      }

      // 2.2 文件大小校验
      if (isFileValid && file.size / 1024 / 1024 > this.maxSize) {
        validRes.push({ type: 'exceedSizeLimit', file });
        isFileValid = false;
      }

      // 2.3 上传前钩子校验
      if (isFileValid && this.beforeUpload) {
        try {
          const result = await Promise.resolve(this.beforeUpload(file));
          if (result === false) {
            validRes.push({ type: 'beforeUploadRejected', file });
            isFileValid = false;
          }
        } catch (e) {
          validRes.push({ type: 'beforeUploadRejected', file });
          isFileValid = false;
        }
      }

      if (isFileValid) {
        validFiles.push(file);
      }
    }

    if (validRes.length > 0) {
      this.validChange.emit(validRes);
    }

    // 只处理通过所有校验的有效文件
    if (validFiles.length === 0) return;

    for (const file of validFiles) {
      const fileItem = this.getFileItem(file);
      this.fileList.push(fileItem);
      this.change.emit({ file, fileList: [...this.fileList] });
      this.performUpload(file, fileItem);
    }
  };

  // 执行上传
  performUpload = (file: File, fileItem: FileItem) => {
    const findFileIndex = () =>
      this.fileList.findIndex((item) => item.uid === fileItem.uid);

    upload({
      file,
      fileItem,
      options: this.uploadOptions,
      onProgress: (percentage: number) => {
        const index = findFileIndex();
        if (index > -1) {
          this.fileList[index].percentage = percentage;
          this.progress.emit({ file, fileList: [...this.fileList] });
        }
      },
      onSuccess: (response: unknown) => {
        const index = findFileIndex();
        if (index > -1) {
          this.fileList[index].status = 'success';
          this.fileList[index].response = response;
          this.success.emit({ file, response, fileList: [...this.fileList] });
        }
      },
      onError: (error: unknown) => {
        const index = findFileIndex();
        if (index > -1) {
          this.fileList[index].status = 'uploadError';
          this.fileList[index].error = error;
          this.error.emit({ file, error, fileList: [...this.fileList] });
        }
      },
    });
  };

  handleFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      this.uploadFiles(Array.from(files));
    }
  };

  handleClick() {
    if (this.isDisabled) {
      return;
    }
    this.inputEl.nativeElement.click();
  }
}
