import { ActionReducerMap } from '@ngrx/store';
import { TaskState, reducer as taskReducer } from './tasks/state';

export interface AppState {
  tasks: TaskState;
  // Define other parts of your application state here
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
  // Add other reducers as needed
};
