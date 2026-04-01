import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { BubbleAvatar } from '@matechat/common';
import type { FileItem } from '@matechat/common/FileList/common/fileList-types';
import { BubbleModule, InputModule, McFileListModule } from '@matechat/ng';

@Component({
  selector: 'app-context-demo',
  standalone: true,
  imports: [
    CommonModule,
    McFileListModule,
    InputModule,
    FormsModule,
    BubbleModule,
  ],
  templateUrl: './context-demo.component.html',
})
export class ContextDemoComponent implements OnInit {
  inputValue: string = '';
  userAvatar: BubbleAvatar = {
    imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
    displayName: '用户头像',
  };
  inputList: FileItem[] = [
    {
      uid: 1,
      name: '用户手册.pdf',
      size: 1024 * 1024 * 2,
      type: 'application/pdf',
      status: 'success',
    },
    {
      uid: 2,
      name: '功能演示.mp4',
      size: 1024 * 1024 * 15,
      type: 'video/mp4',
      status: 'uploading',
      percentage: 66,
    },
    {
      uid: 3,
      name: '错误日志.log',
      size: 1024 * 5,
      type: 'text/plain',
      status: 'uploadError',
      error: '上传中断',
    },
  ];

  dialogList: FileItem[] = [
    {
      uid: 4,
      name: '用户手册.pdf',
      size: 1024 * 1024 * 2,
      type: 'application/pdf',
      status: 'success',
    },
    {
      uid: 5,
      name: '界面设计稿.png',
      size: 1024 * 345,
      type: 'image/png',
      status: 'success',
    },
    {
      uid: 6,
      name: '项目依赖.zip',
      size: 1024 * 1024 * 8,
      type: 'application/zip',
      status: 'success',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleRemove(file): void {
    console.log('Remove file:', file);
    // 从相应的列表中移除文件
    this.inputList = this.inputList.filter((item) => item.uid !== file.uid);
    this.dialogList = this.dialogList.filter((item) => item.uid !== file.uid);
  }

  handleRetryUpload(file): void {
    console.log('Retry upload:', file);
    const targetFile = this.inputList.find((item) => item.uid === file.uid);
    if (targetFile) {
      targetFile.status = 'uploading';
      targetFile.percentage = 0;
    }
  }
}
