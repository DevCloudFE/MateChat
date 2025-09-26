import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarBodyIconComponent } from '../avatar-body-icon/avatar-body-icon.component';
import { AvatarNoBodyIconComponent } from '../avatar-no-body-icon/avatar-no-body-icon.component';

@Component({
  selector: 'mc-avatar',
  standalone: true,
  imports: [CommonModule, AvatarBodyIconComponent, AvatarNoBodyIconComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() imgSrc: string = '';
  @Input() name: string = '';
  @Input() width: number = 36;
  @Input() height: number = 36;
  @Input() isRound: boolean = true;
  @Input() gender: string = '';

  isErrorImg: boolean = false;
  isNobody: boolean = true;
  code: number = 1;
  fontSize: number = 12;
  nameDisplay: string = '';

  ngOnInit(): void {
    this.calcValues(this.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['width'] || changes['height'] || changes['gender']) {
      this.calcValues(this.name);
    }
  }

  onErrorImg(): void {
    this.isErrorImg = true;
  }

  private getBackgroundColor(char: string): void {
    if (this.gender) {
      if (this.gender.toLowerCase() === 'male') {
        this.code = 1;
      } else if (this.gender.toLowerCase() === 'female') {
        this.code = 0;
      }
      return;
    }
    const unicode = char.charCodeAt(0);
    this.code = unicode % 2;
  }

  private setDisplayName(nameValue: string, widthValue: number): void {
    if (!nameValue) {
      this.nameDisplay = '';
      return;
    }

    if (nameValue.length < 2) {
      this.nameDisplay = nameValue;
    } else {
      // 以中文开头显示最后两个字符
      if (/^[\u4e00-\u9fa5]/.test(nameValue)) {
        this.nameDisplay = nameValue.substr(nameValue.length - 2, 2);
        // 英文开头
      } else if (/^[A-Za-z]/.test(nameValue)) {
        // 含有两个及以上，包含空格，下划线，中划线分隔符的英文名取前两个字母的首字母
        if (/[_ -]/.test(nameValue)) {
          const parts = nameValue.split(/_|-|\s+/);
          if (parts.length >= 2) {
            this.nameDisplay = parts[0].substr(0, 1).toUpperCase() + parts[1].substr(0, 1).toUpperCase();
          } else {
            this.nameDisplay = nameValue.substr(0, 2).toUpperCase();
          }
        } else {
          // 一个英文名的情况显示前两个字母
          this.nameDisplay = nameValue.substr(0, 2).toUpperCase();
        }
      } else {
        // 非中英文开头默认取前两个字符
        this.nameDisplay = nameValue.substr(0, 2);
      }
    }
    if (widthValue < 30) {
      this.nameDisplay = nameValue.substr(0, 1).toUpperCase();
    }
    this.getBackgroundColor(nameValue.substr(0, 1));
  }

  private calcValues(nameInput: string): void {
    const userName = nameInput;
    const minNum = Math.min(this.width, this.height);
    if (userName) {
      this.isNobody = false;
      this.setDisplayName(userName, minNum);
    } else if (userName === '') {
      this.isNobody = false;
      this.nameDisplay = '';
    } else {
      this.isNobody = true;
    }
    this.fontSize = minNum / 4 + 3;
  }
}