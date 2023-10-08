import { Action, createReducer, on } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TaskState, initialState, tasksAdapter } from './state';
import { addTask, deleteTask, loadTasks, loadTasksFailure, loadTasksSuccess, toggleTaskVisibility, updateTask } from './actions';
import { ITask } from 'src/app/task/task-type';

const _taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({
    ...state
  })),
  on(loadTasksSuccess, (state, action: { tasks: ITask[] }) => ({
    ...tasksAdapter.upsertMany(action.tasks, state),
    isLoaded: true,
  })),
  on(loadTasksFailure, (state, action: { error: string }) => ({
    ...state,
    isLoaded: true,
    error: action.error,
  })),
  on(addTask, (state, action: { taskToAdd: ITask }) => {
    let newTask = { ...action.taskToAdd }
    const tasks = tasksAdapter.getSelectors().selectAll(state);

    if (tasks.length && tasks[tasks.length - 1]?.id) {
      newTask.id = tasks[tasks.length - 1]!.id + 1;
    } else {
      newTask.id = 1;
    }

    return tasksAdapter.addOne(newTask, { ...state })
  }),
  on(updateTask, (state, action: { taskToUpdate: Update<ITask> }) => {
    return tasksAdapter.updateOne(action.taskToUpdate, state);
  }),
  on(deleteTask, (state, action: { taskToDelete: ITask }) => {
    return tasksAdapter.removeOne(action.taskToDelete.id, state);
  }),
  on(toggleTaskVisibility, (state, action: { taskToToggleVisibility: Update<ITask> }) => {
    const tasks = tasksAdapter.getSelectors().selectAll(state);
    const id = parseInt(action.taskToToggleVisibility.id.toString(), 10);
    const taskToToggleVisibilityIndex = tasks.findIndex((t) => t.id === action.taskToToggleVisibility.id);
    const taskToToggleVisibility = { ...tasks[taskToToggleVisibilityIndex] };

    taskToToggleVisibility.enabled = !taskToToggleVisibility.enabled;

    return tasksAdapter.updateOne({ id, changes: taskToToggleVisibility }, state);
  })
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return _taskReducer(state, action);
}
