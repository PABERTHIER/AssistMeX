import { Action, createReducer, on } from '@ngrx/store';
import { addTaskV2, deleteTaskV2, loadTasksSuccessV2, loadTasksV2, toggleTaskVisibilityV2, updateTaskV2 } from './actions';
import { ITaskStateV2, initialState } from './state';
import { ITask } from 'src/app/task/task-type';

const _taskReducer = createReducer(
  initialState,
  on(loadTasksV2, (state) => ({
    ...state,
  })),
  on(loadTasksSuccessV2, (state, { tasks }) => ({
    ...state,
    tasksV2: [...tasks],
    isLoadedV2: true,
  })),
  on(addTaskV2, (state, action: { taskToAdd: ITask }) => {
    let newTask = { ...action.taskToAdd };

    if (state.tasksV2.length) {
      newTask.id = state.tasksV2[state.tasksV2.length - 1].id + 1;
    } else {
      newTask.id = 1;
    }

    return {
      ...state,
      tasksV2: [...state.tasksV2, newTask],
    };
  }),
  on(updateTaskV2, (state, action: { taskToUpdate: ITask }) => {
    const taskIndex = state.tasksV2.findIndex(
      (task: ITask) => action.taskToUpdate.id === task.id
    );

    if (taskIndex >= 0) {
      const tasksV2 = state.tasksV2.map((task) => {
        if (task.id === action.taskToUpdate.id) {
          return { ...task, ...action.taskToUpdate };
        }
        return task;
      });
      return {
        ...state,
        tasksV2: [...tasksV2],
      };
    }

    return {
      ...state,
    };
  }),
  on(deleteTaskV2, (state, action: { taskToDelete: ITask }) => {
    let tasksV2 = state.tasksV2.filter(
      (task) => task.id !== action.taskToDelete.id
    );

    return {
      ...state,
      tasksV2,
    };
  }),
  on(toggleTaskVisibilityV2, (state, action: { taskToToggleVisibility: ITask }) => {
      let tasksV2 = state.tasksV2.map(
        (task) => {
          if (task.id === action.taskToToggleVisibility.id) {
            return { ...task, enabled: !task.enabled };
          }
          return task;
        }
      );

      return {
        ...state,
        tasksV2,
      };
    }
  )
);

export function taskReducerV2(state: ITaskStateV2 | undefined, action: Action) {
  return _taskReducer(state, action);
}
