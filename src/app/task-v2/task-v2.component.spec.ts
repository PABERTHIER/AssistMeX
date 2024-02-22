import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskV2Component } from './task-v2.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  addTaskV2,
  deleteTaskV2,
  toggleTaskVisibilityV2,
  updateTaskV2,
} from 'src/store/tasksV2/actions';
import { ITask } from '../task/task-type';

describe('TaskV2Component', () => {
  let component: TaskV2Component;
  let fixture: ComponentFixture<TaskV2Component>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskV2Component],
      imports: [FormsModule, DragDropModule],
      providers: [
        provideMockStore({
          initialState: {
            tasksV2: {
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
    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addTaskV2 action', () => {
    const taskToAdd = {
      id: 1,
      name: 'Test Task',
      description: 'Test Description',
      enabled: true,
    } as ITask;

    component.newTask = taskToAdd;
    component.addTask();
    expect(store.dispatch).toHaveBeenCalledWith(addTaskV2({ taskToAdd }));
  });

  it('should dispatch updateTaskV2 action', () => {
    const taskToUpdate = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      enabled: true,
    } as ITask;

    component.taskToUpdate = taskToUpdate;
    component.editTask();
    expect(store.dispatch).toHaveBeenCalledWith(updateTaskV2({ taskToUpdate }));
  });

  it('should dispatch deleteTaskV2 action', () => {
    const taskToDelete = {
      id: 1,
      name: 'Task to Delete',
      description: 'Description to Delete',
      enabled: true,
    } as ITask;

    component.deleteTask(taskToDelete);
    expect(store.dispatch).toHaveBeenCalledWith(deleteTaskV2({ taskToDelete }));
  });

  it('should dispatch toggleTaskVisibilityV2 action', () => {
    const taskToToggleVisibility = {
      id: 1,
      name: 'Task to Toggle',
      description: 'Description to Toggle',
      enabled: true,
    } as ITask;

    component.toggleTaskVisibility(taskToToggleVisibility);
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleTaskVisibilityV2({ taskToToggleVisibility })
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
