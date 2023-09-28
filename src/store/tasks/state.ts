import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ITask } from 'src/app/task/task-type';
import { addTask, loadTasksFailure, loadTasksSuccess, updateTask } from './actions';

export const tasksAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>();

export interface TaskState extends EntityState<ITask> {
  loading: boolean;
  error: string | null;
}

export const initialState: TaskState = tasksAdapter.getInitialState({
  loading: false,
  error: null,
});

const taskReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...tasksAdapter.upsertMany(tasks, state),
    loading: false,
  })),
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addTask, (state, { taskToAdd }) => ({
    ...state,
    loading: false,
  })),
  on(updateTask, (state, { id, updatedTask }) => ({
    ...state,
    loading: false,
    id,
    updatedTask,
  }))
);

export function reducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
