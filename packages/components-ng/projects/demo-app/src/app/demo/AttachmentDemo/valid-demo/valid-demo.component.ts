import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentModule, InputModule } from '@matechat/ng';

@Component({
  selector: 'attachment-valid-demo',
  standalone: true,
  imports: [CommonModule, AttachmentModule, InputModule],
  templateUrl: './valid-demo.component.html',
})
export class AttachmentValidDemoComponent {
  inputValue = '';
  uploadOptions = {
    uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
  };

  handleBeforeUpload = (file: File) => {
    // 除了组件内置的 accept 和 size 校验，你还可以添加自定义的校验逻辑
    if (file.name.includes('test')) {
      return false;
    }
    return true;
  };

  onValidChange = (e) => {
    console.log('valid result', e);
  };
}
