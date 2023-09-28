import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ITask } from './task-type';
import { selectAllTasks } from 'src/store/tasks/selectors';
import { Store } from '@ngrx/store';
import { addTask, loadTasks, updateTask } from 'src/store/tasks/actions';

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
  error?: string = undefined;
  taskIsInEditionMode: boolean = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTasks());

    this.store.select(selectAllTasks).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (
      this.newTask.name.trim() !== '' &&
      this.newTask.description.trim() !== ''
    ) {
      if (this.tasks.length) {
        this.newTask.id = this.tasks[this.tasks.length - 1].id + 1;
      } else {
        this.newTask.id = 1;
      }

      this.store.dispatch(addTask({taskToAdd: this.newTask}));

      // this.store.select(selectAllTasks).subscribe((tasks) => {
      //   // Here, 'tasks' contains the array of tasks selected from the store
      //   this.tasks = tasks;
      // });

      // this.tasks.push({ ...this.newTask });
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
      updateTask({ id: this.taskToUpdate.id, updatedTask: this.taskToUpdate })
    );
    // const taskToUpdate = this.tasks.find((t) => t.id === this.taskToUpdate.id);

    // if (taskToUpdate) {
    //   taskToUpdate.name = this.taskToUpdate.name;
    //   taskToUpdate.description = this.taskToUpdate.description;
    // }
    this.taskIsInEditionMode = !this.taskIsInEditionMode;
  }

  deleteTask(task: ITask): void {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  toggleTaskVisibility(task: ITask): void {
    const taskToDisableIndex = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks[taskToDisableIndex].enabled =
      !this.tasks[taskToDisableIndex].enabled;
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
