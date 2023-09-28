import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskV2Component } from './task-v2.component';

describe('TaskV2Component', () => {
  let component: TaskV2Component;
  let fixture: ComponentFixture<TaskV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskV2Component]
    });
    fixture = TestBed.createComponent(TaskV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
