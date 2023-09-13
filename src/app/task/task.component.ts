import { Component, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Output() cdkDropDropped: EventEmitter<CdkDragDrop<any, any>> =
    new EventEmitter<CdkDragDrop<any, any>>();

  tasks: ITask[] = [];
  newTask: ITask = { id: 0, name: '', description: '', enabled: true };
  taskToUpdate: ITask = { id: 0, name: '', description: '', enabled: true };
  error?: string = undefined;
  taskIsInEditionMode: boolean = false;

  ngOnInit() {
    this.tasks = [
      {
        id: 1,
        name: 'Task1',
        description: 'toto',
        enabled: true,
      },
      {
        id: 2,
        name: 'Task2',
        description: 'tutu',
        enabled: true,
      },
      {
        id: 3,
        name: 'Task3',
        description: 'titi',
        enabled: true,
      },
    ];
  }

  addTask(): void {
    if (this.newTask.name.trim() !== '' && this.newTask.description.trim() !== '') {
      if (this.tasks.length) {
        this.newTask.id = this.tasks[this.tasks.length - 1].id + 1;
      } else {
        this.newTask.id = 1;
      }

      this.tasks.push({ ...this.newTask });
      this.resetNewTask();
      this.error = undefined;
    } else if (this.newTask.name.trim() === '') {
      this.error = 'You need a name for the task !!';
    } else if (this.newTask.description.trim() === '') {
      this.error = 'You need a value for the task !!';
    }
  }

  editTask(): void {
    const taskToUpdate = this.tasks.find((t) => t.id === this.taskToUpdate.id);

    if (taskToUpdate) {
      taskToUpdate.name = this.taskToUpdate.name;
      taskToUpdate.description = this.taskToUpdate.description;
    }
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
    this.taskToUpdate = task;
    this.taskIsInEditionMode = !this.taskIsInEditionMode;
  }

  resetNewTask(): void {
    this.newTask = { id: 0, name: '', description: '', enabled: true };
  }
}

export interface ITask {
  id: number
  name: string
  description: string
  enabled: boolean
}
