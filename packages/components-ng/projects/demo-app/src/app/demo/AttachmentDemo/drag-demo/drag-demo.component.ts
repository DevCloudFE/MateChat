import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentModule, InputModule } from '@matechat/ng';

@Component({
  selector: 'attachment-drag-demo',
  standalone: true,
  imports: [CommonModule, AttachmentModule, InputModule],
  templateUrl: './drag-demo.component.html',
})
export class AttachmentDragDemoComponent implements AfterViewInit {
  @ViewChild('input') inputEl!: ElementRef<HTMLInputElement>;

  inputValue = '';
  uploadOptions = {
    uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
  };
  dropContainer = () => document.body;

  ngAfterViewInit(): void {
    this.dropContainer = () => {
      return this.inputEl.nativeElement;
    };
  }
}
