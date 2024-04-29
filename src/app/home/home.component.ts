import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { MatButton } from "@angular/material/button";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {ITaskItem} from "../fake-api/task.model";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";


@Component({
  selector: 'mt-home',
  standalone: true,
  imports: [
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
    MatHeaderCellDef
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnDestroy, OnInit  {
  private destroyed$ = new Subject<void>();
  displayedColumns: string[] = ['name', 'priority', 'deadline'];
  public taskList: ITaskItem[] | [] = []

  constructor (
    private activatedRoute: ActivatedRoute,
  ) {
    // this.activatedRoute.data.pipe(
    //   tap(({taskList}) => {
    //     // this.taskList = data.taskList;
    //    console.log(taskList)
    //   }),
    //   takeUntil(this.destroyed$)
    // ).subscribe();
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      tap(({taskList}) => {
        this.taskList = taskList;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
