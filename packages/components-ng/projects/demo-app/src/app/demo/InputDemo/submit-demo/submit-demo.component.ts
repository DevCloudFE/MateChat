import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
    selector: 'app-submit-input',
    standalone: true,
    imports: [CommonModule, FormsModule, InputModule],
    templateUrl: './submit-demo.component.html'
})
export class SubmitInputComponent {
    loading: boolean = false;
    inputValue: string = '';
    isExpanded: boolean = false;
    onSubmit(e) {
        this.loading = true;
        console.log('input submit---', e);
    };
}