import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentModule, InputModule } from '@matechat/ng';

@Component({
  selector: 'attachment-basic-demo',
  standalone: true,
  imports: [CommonModule, AttachmentModule, InputModule],
  templateUrl: './basic-demo.component.html',
})
export class AttachmentBasicDemoComponent {
  inputValue = '';

  // 核心：配置上传参数
  uploadOptions = {
    uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
  };

  // 监听上传成功和失败事件
  handleSuccess = ({ file, response }) => {
    console.log(`文件 ${file.name} 上传成功，响应:`, response);
  };
  handleError = ({ file, error }) => {
    console.error(`文件 ${file.name} 上传失败，错误:`, error);
  };
}
