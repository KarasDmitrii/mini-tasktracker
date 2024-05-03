import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { MatButton } from "@angular/material/button";
import { Subject, takeUntil, tap } from "rxjs";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { MtTaskService } from "../services/task.service";
import { CommonModule, NgIf } from "@angular/common";
import { ITaskItem } from "../fake-api/task.model";
import { CreateTaskComponent } from "../modal/create-task/create-task.component";
import { Dialog } from "@angular/cdk/dialog";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'mt-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    NgIf,
    RouterLink,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class MtHomeComponent implements OnDestroy, OnInit  {
  private destroyed$ = new Subject<void>();
  displayedColumns: string[] = ['name', 'priority', 'deadline'];
  protected taskList: ITaskItem[] | []

  constructor (
    public dialog: Dialog,
    private taskService: MtTaskService
  ) { }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
    console.log(id)
  }

  openDialog(): void {
    this.dialog.open<string>(CreateTaskComponent, {
      panelClass: 'createTask',
      data: {},
    });
  }

  ngOnInit() {
    this.taskService.updateTasklist()
    this.taskService.taskList$.pipe(tap((data) => {
        this.taskList = data;
      }),
      takeUntil(this.destroyed$)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
