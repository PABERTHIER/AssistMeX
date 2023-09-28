export interface ITask {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  enabled: boolean;
}

export type TaskStatus = 'Todo' | 'WIP' | 'Done';
