import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { TaskServiceV2 } from './service';
import { loadTasksSuccessV2, loadTasksV2 } from './actions';

@Injectable()
export class TaskEffectsV2 {
  constructor(private actions$: Actions, private taskServiceV2: TaskServiceV2) {}

  loadInitialTasksV2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasksV2),
      switchMap(() =>
        this.taskServiceV2.getInitialTasks().pipe(
          map((tasks) => loadTasksSuccessV2({ tasks }))
        )
      )
    )
  );
}
