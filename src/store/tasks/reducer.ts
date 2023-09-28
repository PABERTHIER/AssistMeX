import { Action, createReducer, on } from '@ngrx/store';
import { TaskState, initialState, tasksAdapter } from './state';
import { addTask, loadTasks, loadTasksFailure, loadTasksSuccess, updateTask } from './actions';

const _taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({
    ...state,
    loading: true,
  })),
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
    ...tasksAdapter.addOne(taskToAdd, { ...state }),
    loading: false
  })),
  on(updateTask, (state, { id, updatedTask }) => {
    console.log('id', id);
    console.log('updatedTask', updatedTask);
    const taskIndex = state.ids.findIndex((taskId) => taskId === id);

    if (taskIndex >= 0) {
      return tasksAdapter.updateOne({ id, changes: updatedTask }, { ...state });
    }

    return state;
  })
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return _taskReducer(state, action);
}
