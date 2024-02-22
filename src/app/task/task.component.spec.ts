import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  addTask,
  deleteTask,
  toggleTaskVisibility,
  updateTask,
} from 'src/store/tasks/actions';
import { ITask } from './task-type';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [FormsModule, DragDropModule],
      providers: [
        provideMockStore({
          initialState: {
            tasks: {
              entities: {},
              ids: [],
              loading: false,
              loaded: false,
              error: '',
            },
          },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject<Store>(Store) as MockStore;
    spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addTask action', () => {
    const taskToAdd = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      enabled: true,
    } as ITask;

    component.newTask = taskToAdd;
    component.addTask();
    expect(store.dispatch).toHaveBeenCalledWith(addTask({ taskToAdd }));
  });

  it('should dispatch updateTask action', () => {
    const taskToUpdate = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      enabled: true,
    } as ITask;

    component.taskToUpdate = taskToUpdate;
    component.editTask();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateTask({ taskToUpdate: { id: 1, changes: taskToUpdate } })
    );
  });

  it('should dispatch deleteTask action', () => {
    const taskToDelete = {
      id: 1,
      name: 'Task to Delete',
      description: 'Description to Delete',
      enabled: true,
    } as ITask;

    component.deleteTask(taskToDelete);
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ taskToDelete }));
  });

  it('should dispatch toggleTaskVisibility action', () => {
    const taskToToggleVisibility = {
      id: 1,
      name: 'Task to Toggle',
      description: 'Description to Toggle',
      enabled: true,
    } as ITask;

    component.toggleTaskVisibility(taskToToggleVisibility);
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleTaskVisibility({
        taskToToggleVisibility: {
          id: taskToToggleVisibility.id,
          changes: taskToToggleVisibility,
        },
      })
    );
  });

  it('should set taskToUpdate and taskIsInEditionMode on openTaskUpdate', () => {
    const taskToUpdate = {
      id: 1,
      name: 'Task to Update',
      description: 'Description to Update',
      enabled: true,
    } as ITask;

    component.openTaskUpdate(taskToUpdate);
    expect(component.taskToUpdate).toEqual(taskToUpdate);
    expect(component.taskIsInEditionMode).toBe(true);
  });
});
