import { ITask } from '../../app/task/task-type';

export const initialState: ITaskStateV2 = {
  tasksV2: [],
  isLoadedV2: false,
};

export interface ITaskStateV2 {
  tasksV2: ITask[];
  isLoadedV2: boolean;
}
