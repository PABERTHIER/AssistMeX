import { createAction, props } from '@ngrx/store';
import { ITask } from 'src/app/task/task-type';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: ITask[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);
export const addTask = createAction(
  '[Task] Add Task',
  props<{ taskToAdd: ITask }>()
);
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ id: number; updatedTask: ITask }>()
);
