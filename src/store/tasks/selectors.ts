import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState as ITaskState, tasksAdapter } from './state';

const selectTaskState = createFeatureSelector<ITaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  tasksAdapter.getSelectors().selectAll
);

export const selectTasksAreLoaded = createSelector(
  selectTaskState,
  (state: ITaskState) => state.isLoaded
);
