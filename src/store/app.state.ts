import { ActionReducerMap } from '@ngrx/store';
import { TaskState } from './tasks/state';
import { ITaskStateV2 } from './tasksV2/state';
import { taskReducer } from './tasks/reducer';
import { taskReducerV2 } from './tasksV2/reducer';

export interface AppState {
  tasks: TaskState;
  tasksStateV2: ITaskStateV2;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
  tasksStateV2: taskReducerV2
};
