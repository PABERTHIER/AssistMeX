import { ActionReducerMap } from '@ngrx/store';
import { TaskState, reducer as taskReducer } from './tasks/state';
import { taskReducerV2 } from './tasksV2/reducer';
import { ITaskStateV2 } from './tasksV2/state';

export interface AppState {
  tasks: TaskState;
  tasksStateV2: ITaskStateV2;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
  tasksStateV2: taskReducerV2
};
