import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import type { FileItem } from '@matechat/common/FileList/common/fileList-types';
import { McFileListModule } from '@matechat/ng';

@Component({
  selector: 'app-interactive-demo',
  standalone: true,
  imports: [CommonModule, McFileListModule],
  templateUrl: './interactive-demo.component.html',
})
export class InteractiveDemoComponent implements OnInit {
  interactiveList: FileItem[] = [
    {
      uid: 1,
      name: '可预览和下载的图片.jpg',
      size: 1024 * 450,
      type: 'image/jpeg',
      status: 'success',
      url: '/example1.png',
    },
    {
      uid: 2,
      name: '上传失败的文件.pdf',
      size: 1024 * 1024,
      type: 'application/pdf',
      status: 'uploadError',
      error: '上传中断',
    },
    {
      uid: 3,
      name: '下载失败的文件.zip',
      size: 1024 * 1024 * 5,
      type: 'application/zip',
      status: 'downloadError',
      error: '下载链接已失效',
    },
  ];

  eventLogs: string[] = [];
  downloadIntervals = new Map();

  constructor() {}

  ngOnInit(): void {}

  handleRemove(file): void {
    console.log(`[Event:remove] 触发删除: ${file.name}`);
    this.addEventLog(`触发删除: ${file.name}`);
    this.interactiveList = this.interactiveList.filter(
      (item) => item.uid !== file.uid,
    );
  }

  handlePreview(file): void {
    console.log(`[Event:preview] 触发预览: ${file.name}`);
    this.addEventLog(`触发预览: ${file.name}`);
    // 这里可以实现文件预览逻辑
  }

  // 模拟下载逻辑
  simulateDownload(file): void {
    if (this.downloadIntervals.has(file.uid)) return;

    file.status = 'downloading';
    file.percentage = 0;

    const intervalId = setInterval(() => {
      if (file.percentage < 100) {
        file.percentage += 20;
      } else {
        clearInterval(intervalId);
        this.downloadIntervals.delete(file.uid);
        file.status = 'success'; // 模拟下载成功
        // 可以在这里真正触发 a 标签下载
        if (file.url) {
          const link = document.createElement('a');
          link.href = file.url;
          link.download = file.name;
          link.click();
        }
      }
    }, 200);
    this.downloadIntervals.set(file.uid, intervalId);
  }

  handleDownload(file): void {
    console.log(`[Event:download] 触发下载: ${file.name}`);
    this.addEventLog(`触发下载: ${file.name}`);
    // 父组件现在负责更新状态
    this.simulateDownload(file);
  }

  handleRetryUpload(file): void {
    console.log(`[Event:retry-upload] 触发重试上传: ${file.name}`);
    this.addEventLog(`触发重试上传: ${file.name}`);
    file.status = 'uploading';
    file.percentage = 0;
    // ... 此处应有真实上传逻辑
  }

  handleRetryDownload(file): void {
    console.log(`[Event:retry-download] 触发重试下载: ${file.name}`);
    this.addEventLog(`触发重试下载: ${file.name}`);
    // 父组件现在负责更新状态
    this.simulateDownload(file);
  }

  private addEventLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLogs.unshift(`[${timestamp}] ${message}`);
    // 限制日志数量
    if (this.eventLogs.length > 10) {
      this.eventLogs.pop();
    }
  }
}
