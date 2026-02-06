import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';

@Component({
  selector: 'app-intro-align-demo',
  standalone: true,
  imports: [CommonModule, IntroductionModule],
  templateUrl: './align-demo.component.html',
})
export class AlignDemoComponent {
  description = [
    'MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。',
  ];
}
