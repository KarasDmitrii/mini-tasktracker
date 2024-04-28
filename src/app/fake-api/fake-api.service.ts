import {ITask, ITaskItem} from "./task.model";
import { v4 as uuidv4 } from 'uuid';

export class MtFakeApiService {

  public getTasks(): ITask[] | null {
    const data = localStorage.getItem('tasks')
    return data ? JSON.parse(data) : null;
  }

  public postTask(task: ITask) {
    const data = localStorage.getItem('tasks') ?? ''
    const taskList = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : []
    localStorage.setItem('tasks', JSON.stringify([...taskList, {data: task, id: uuidv4()}]));
  }

  public deleteTask(id: string) {
    const data = localStorage.getItem('tasks') ?? ''
    const taskList = Array.isArray(JSON.parse(data)) ?? JSON.parse(data).fillter((item: ITaskItem) => item.id != id)
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }
}
