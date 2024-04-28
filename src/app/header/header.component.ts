import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Dialog} from "@angular/cdk/dialog";
import { CreateTaskComponent } from "../modal/create-task/create-task.component";
import {MyDialogContainer} from "../modal/dialog/dialog-container";

@Component({
  selector: 'mt-header',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class MtHeaderComponent {

  constructor(public dialog: Dialog) {}

  // openDialog(): void {
  //   this.dialog.open<string>(CreateTaskComponent, {panelClass: 'createTask',});
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(CreateTaskComponent, {
      panelClass: 'createTask',
      data: {},
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
