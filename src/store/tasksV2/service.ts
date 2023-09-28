import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITask } from 'src/app/task/task-type';

@Injectable({
  providedIn: 'root',
})

export class TaskServiceV2 {
  private tasksV2: ITask[] = [
    {
      id: 1,
      name: 'Task1',
      description: 'toto',
      status: 'Todo',
      enabled: true,
    },
    {
      id: 2,
      name: 'Task2',
      description: 'tutu',
      status: 'WIP',
      enabled: true,
    },
    {
      id: 3,
      name: 'Task3',
      description: 'titi',
      status: 'Done',
      enabled: true,
    },
  ];

  constructor() {}

  getInitialTasks(): Observable<ITask[]> {
    // Simulate fetching tasks from a data source (e.g., an API)
    return of(this.tasksV2);
  }
}
