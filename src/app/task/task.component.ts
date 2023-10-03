import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { addTask, deleteTask, loadTasks, toggleTaskVisibility, updateTask } from 'src/store/tasks/actions';
import { selectAllTasks, selectTasksAreLoaded } from 'src/store/tasks/selectors';
import { ITask } from './task-type';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
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
    this.store.select(selectTasksAreLoaded).subscribe((isLoaded) => {
      this.isLoaded = isLoaded
    })

    if (!this.isLoaded) {
      this.store.dispatch(loadTasks());
      this.store.select(selectTasksAreLoaded).subscribe((isLoaded) => {
        this.isLoaded = isLoaded;
      });
    }

    this.store.select(selectAllTasks).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.name.trim() !== '' && this.newTask.description.trim() !== '') {
      this.store.dispatch(addTask({ taskToAdd: this.newTask }));
      this.resetNewTask();
      this.error = undefined;
    } else if (this.newTask.name.trim() === '') {
      this.error = 'You need a name for the task !!';
    } else if (this.newTask.description.trim() === '') {
      this.error = 'You need a value for the task !!';
    }
  }

  editTask(): void {
    this.store.dispatch(
      updateTask({ taskToUpdate: { id: this.taskToUpdate.id, changes: this.taskToUpdate } })
    );

    this.taskIsInEditionMode = !this.taskIsInEditionMode;
  }

  deleteTask(task: ITask): void {
    this.store.dispatch(deleteTask({ taskToDelete: task }))
  }

  toggleTaskVisibility(task: ITask): void {
    this.store.dispatch(toggleTaskVisibility({ taskToToggleVisibility: { id: task.id, changes: task}}))
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
