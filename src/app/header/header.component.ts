import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Dialog} from "@angular/cdk/dialog";
import { CreateTaskComponent } from "../modal/create-task/create-task.component";

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

  constructor(
    public dialog: Dialog,
  ) {}

  openDialog(): void {
    this.dialog.open<string>(CreateTaskComponent, {
      panelClass: 'createTask',
      data: {},
    });
  }

}
