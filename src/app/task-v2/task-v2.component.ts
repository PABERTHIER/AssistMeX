import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectAllTasksV2, selectTasksAreLoadedV2 } from 'src/store/tasksV2/selectors';
import { deleteTaskV2, loadTasksV2, toggleTaskVisibilityV2, updateTaskV2 } from 'src/store/tasksV2/actions';
import { addTaskV2 } from 'src/store/tasksV2/actions';
import { ITask } from '../task/task-type';

@Component({
  selector: 'app-task-v2',
  templateUrl: './task-v2.component.html',
  styleUrls: ['./task-v2.component.scss'],
})
export class TaskV2Component implements OnInit {
  @Output() cdkDropDropped: EventEmitter<CdkDragDrop<any, any>> =
    new EventEmitter<CdkDragDrop<any, any>>();

  tasks: ITask[] = [];
  newTask: ITask = {
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    enabled: true,
  };
  taskToUpdate: ITask = {
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    enabled: true,
  };
  isLoaded: boolean = false;
  error?: string = undefined;
  taskIsInEditionMode: boolean = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectTasksAreLoadedV2).subscribe((isLoaded) => {
      this.isLoaded = isLoaded;
    });

    if (!this.isLoaded) {
      this.store.dispatch(loadTasksV2());
      this.store.select(selectTasksAreLoadedV2).subscribe((isLoaded) => {
        this.isLoaded = isLoaded;
      });
    }

    this.store.select(selectAllTasksV2).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.name.trim() !== '' && this.newTask.description.trim() !== '' )
    {
      this.store.dispatch(addTaskV2({ taskToAdd: this.newTask }));
      this.resetNewTask();
      this.error = undefined;
    } else if (this.newTask.name.trim() === '') {
      this.error = 'You need a name for the task !!';
    } else if (this.newTask.description.trim() === '') {
      this.error = 'You need a value for the task !!';
    }
  }

  editTask(): void {
    this.store.dispatch(updateTaskV2({ taskToUpdate: this.taskToUpdate }));
    this.taskIsInEditionMode = !this.taskIsInEditionMode;
  }

  deleteTask(task: ITask): void {
    this.store.dispatch(deleteTaskV2({ taskToDelete: task }));
  }

  toggleTaskVisibility(task: ITask): void {
    this.store.dispatch(toggleTaskVisibilityV2({ taskToToggleVisibility: task }));
  }

  openTaskUpdate(task: ITask): void {
    this.taskToUpdate = { ...task };
    this.taskIsInEditionMode = !this.taskIsInEditionMode;
  }

  resetNewTask(): void {
    this.newTask = {
      id: 0,
      name: '',
      description: '',
      status: 'Todo',
      enabled: true,
    };
  }
}
