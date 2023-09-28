import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, tasksAdapter } from './state';

const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  tasksAdapter.getSelectors().selectAll
);
