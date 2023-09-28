import { createAction, props } from "@ngrx/store";
import { ITask } from "src/app/task/task-type";

export const loadTasksV2 = createAction('[Task] Load Task V2');
export const loadTasksSuccessV2 = createAction(
  '[Task] Load Tasks Success V2',
  props<{ tasks: ITask[] }>()
);
export const addTaskV2 = createAction(
  '[Task] Add Task V2',
  props<{ taskToAdd: ITask }>()
);
export const updateTaskV2 = createAction(
  '[Task] Update Task V2',
  props<{ taskToUpdate: ITask }>()
);
export const deleteTaskV2 = createAction(
  '[Task] Delete Task V2',
  props<{ taskToDelete: ITask }>()
);
export const toggleTaskVisibilityV2 = createAction(
  '[Task] Toggle Task Visibility V2',
  props<{ taskToToggleVisibility: ITask }>()
);
