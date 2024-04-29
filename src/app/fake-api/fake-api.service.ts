import {ITask, ITaskItem} from "./task.model";
import { v4 as uuidv4 } from 'uuid';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class MtFakeApiService {

  public getTasks(): Observable<ITaskItem[] | null> {

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
  }

  public deleteTask(id: string) {
    const data = localStorage.getItem('tasks') ?? ''
    const taskList = Array.isArray(JSON.parse(data)) ?? JSON.parse(data).fillter((item: ITaskItem) => item.id != id)
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }
}
