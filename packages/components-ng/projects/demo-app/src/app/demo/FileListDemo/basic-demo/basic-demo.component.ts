import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import type { FileItem } from '@matechat/common/FileList/common/fileList-types';
import { McFileListModule } from '@matechat/ng';

@Component({
  selector: 'app-basic-demo',
  standalone: true,
  imports: [CommonModule, McFileListModule],
  templateUrl: './basic-demo.component.html',
})
export class BasicDemoComponent implements OnInit {
  allTypesList: FileItem[] = [
    {
      uid: 1,
      name: '年度报告.docx',
      size: 1024 * 24,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    { uid: 2, name: '设计规范.pdf', size: 1024 * 512, type: 'application/pdf' },
    {
      uid: 3,
      name: '财务报表.xlsx',
      size: 1024 * 128,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    {
      uid: 4,
      name: '产品演示.pptx',
      size: 1024 * 1024 * 3,
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    },
    { uid: 5, name: '夏季海报.png', size: 1024 * 800, type: 'image/png' },
    { uid: 6, name: '宣传视频.mp4', size: 1024 * 1024 * 12, type: 'video/mp4' },
    {
      uid: 7,
      name: '项目源码.zip',
      size: 1024 * 1024 * 5,
      type: 'application/zip',
    },
    { uid: 8, name: '开发文档.md', size: 1024 * 15, type: 'text/markdown' },
    {
      uid: 9,
      name: '核心工具函数.js',
      size: 1024 * 5,
      type: 'application/javascript',
    },
    {
      uid: 10,
      name: '会议脑图.xmind',
      size: 1024 * 256,
      type: 'application/octet-stream',
    },
    { uid: 11, name: '邮件附件.eml', size: 1024 * 10, type: 'message/rfc822' }, // 邮件
    { uid: 12, name: '纯文本.txt', size: 1024 * 2, type: 'text/plain' }, // txt
    {
      uid: 13,
      name: '页面设计.page',
      size: 1024 * 20,
      type: 'application/octet-stream',
    }, // page
    {
      uid: 14,
      name: '未知文件.dat',
      size: 1024 * 100,
      type: 'application/octet-stream',
    }, // 未知类型
  ];

  constructor() {}

  ngOnInit(): void {}

  handleRemove(file): void {
    console.log('Remove file:', file);
    this.allTypesList = this.allTypesList.filter(
      (item) => item.uid !== file.uid,
    );
  }
}
