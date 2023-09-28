import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskStateV2 } from './state';

const selectTaskStateV2 = createFeatureSelector<ITaskStateV2>('tasksStateV2');

export const selectAllTasksV2 = createSelector(
  selectTaskStateV2,
  (state: ITaskStateV2) => state.tasksV2
);

export const selectTasksAreLoadedV2 = createSelector(
  selectTaskStateV2,
  (state: ITaskStateV2) => state.isLoadedV2
);
