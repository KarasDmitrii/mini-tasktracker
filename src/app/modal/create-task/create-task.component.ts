import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatDialogActions, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  constructor(public dialogRef: MatDialogRef<CreateTaskComponent>) {}

  closeModal(): void {
    this.dialogRef.close()
  }
}
