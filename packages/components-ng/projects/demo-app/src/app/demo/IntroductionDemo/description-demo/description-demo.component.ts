import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';

@Component({
  selector: 'app-intro-description-demo',
  standalone: true,
  imports: [CommonModule, IntroductionModule],
  templateUrl: './description-demo.component.html',
})
export class DescriptionDemoComponent {
  description = [
    'MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。',
    '作为AI模型，MateChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 MateChat 做的更好。',
  ];
}
