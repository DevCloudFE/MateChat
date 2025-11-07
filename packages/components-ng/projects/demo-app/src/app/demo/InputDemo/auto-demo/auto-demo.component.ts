import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
    selector: 'app-auto-input',
    standalone: true,
    imports: [CommonModule, FormsModule, InputModule],
    templateUrl: './auto-demo.component.html'
})
export class AutoInputComponent {
    inputValue: string = '';
    loading: boolean = false;

    onInputChange(e) {
        console.log('input change---', e);
    }
    onSubmit(e) {
        this.loading = true;
        console.log('input submit---', e);
    };
    onCancel() {
        this.loading = false;
        console.log('input cancel');
    };
}