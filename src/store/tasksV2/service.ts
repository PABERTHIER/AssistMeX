import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITask } from 'src/app/task/task-type';
import data from 'src/db/tasksV2.json'

@Injectable({
  providedIn: 'root',
})

export class TaskServiceV2 {

  constructor() {}

  getInitialTasks(): Observable<ITask[]> {
    // Simulate fetching tasks from a data source (e.g., an API)
    return of(data.tasksV2 as ITask[]);
  }
}
