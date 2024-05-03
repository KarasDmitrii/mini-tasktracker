import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from "rxjs";
import { ITask, ITaskItem } from "../fake-api/task.model";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class MtTaskService implements OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor() { }

  taskList$: Subject<ITaskItem[]> = new Subject();
  public updateTasklist() {
    this.getTaskList().pipe(
      tap((data) => {
        this.taskList$.next(data)
      }),
      takeUntil(this.destroyed$)
    ).subscribe()
  }

  public getTask(id: string): Observable<ITaskItem> {
    return new Observable((subscriber) => {
      const response = localStorage.getItem('tasks')
      const data = response ? JSON.parse(response) : null
      const task: ITaskItem = data.find((item: ITaskItem) => item.id === id);

      setTimeout(() => {
        subscriber.next(task);
        subscriber.complete();
      }, 1000);
    })
  }

  public getTaskList(): Observable<ITaskItem[]> {
    return new Observable((subscriber) => {
      const response = localStorage.getItem('tasks')
      const data = response ? JSON.parse(response) : null

      setTimeout(() => {
        subscriber.next(data);
        subscriber.complete();
      }, 1000);
    })
  }

  public postTask(task: ITask) {
    const data = localStorage.getItem('tasks') ?? ''
    const taskList = data ? JSON.parse(data) : []
    localStorage.setItem('tasks', JSON.stringify([...taskList, {data: task, id: uuidv4()}]));
    this.updateTasklist()
  }

  public deleteTask(id: string) {
    const data = localStorage.getItem('tasks') ?? ''
    const taskList = Array.isArray(JSON.parse(data)) ? JSON.parse(data).filter((item: ITaskItem) => {
      return item.id !== id
    }) : []
    localStorage.setItem('tasks', JSON.stringify(taskList));
    this.updateTasklist()
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
