import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITask } from 'src/app/task/task-type';
import data from 'src/db/tasksV1.json';

@Injectable({
  providedIn: 'root',
})

export class TaskService {

  constructor() {}

  getInitialTasks(): Observable<ITask[]> {
    // Simulate fetching tasks from a data source (e.g., an API)
    return of(data.tasks as ITask[]);
  }
}
