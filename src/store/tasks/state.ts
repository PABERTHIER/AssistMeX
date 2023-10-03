import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ITask } from 'src/app/task/task-type';

export const tasksAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>();

export interface TaskState extends EntityState<ITask> {
  isLoaded: boolean;
  error: string | null;
}

export const initialState: TaskState = tasksAdapter.getInitialState({
  isLoaded: false,
  error: null,
});
