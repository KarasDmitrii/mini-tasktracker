import { CdkDialogContainer } from '@angular/cdk/dialog';
import { Component } from "@angular/core";

@Component({
  selector: 'my-dialog-container',
  template: '',
  standalone: true,
  styles: [`
    :host {
      background-color: white;
      position: absolute;
      right: 20px;
      bottom: 0;
      width: 100px;
      height: 100px;
    }
  `]
})

export class MyDialogContainer extends CdkDialogContainer {}
