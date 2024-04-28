export interface ITask {
  name: string;
  description: string;
  startDate: Date,
  endDate: Date | null,
  performers: string[];
  priority: 'Низкий' | 'Средний' | 'Высокий' | 'Критичный';
}

export interface ITaskItem {
  data: ITask;
  id: string;
}
