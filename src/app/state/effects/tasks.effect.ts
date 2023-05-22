import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { TasksHttpService } from 'src/app/services/tasks.service';
import {
  createTaskRequest,
  createTaskSuccess,
  fetchFailure,
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTasksRequest,
  fetchTasksSuccess,
  filterTaskRequest,
  filterTaskSuccess,
  removeTaskRequest,
  removeTaskSucces,
  updateTaskRequest,
  updateTaskSuccess,
} from '../actions/tasks.actions';

@Injectable()
export class TasksService {
  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTasksRequest),
      exhaustMap(() =>
        this.tasksHttpService.tasksService().pipe(
          map((res) => fetchTasksSuccess({ tasks: res?.$values })),
          catchError(async (error) => fetchFailure({ errors: error.message }))
        )
      )
    )
  );

  fetchTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTaskRequest),
      exhaustMap((action) =>
        this.tasksHttpService.taskService(action.id).pipe(
          map((task) => {
            return fetchTaskSuccess({ task: task });
          }),
          catchError(async (error) =>
            fetchFailure({ errors: error?.error?.$values })
          )
        )
      )
    )
  );
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskRequest),
      exhaustMap((action) =>
        this.tasksHttpService.updateTaskService(action.id, action.data).pipe(
          map(() => updateTaskSuccess()),
          catchError(async (error) => fetchFailure({ errors: error.message }))
        )
      )
    )
  );
  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTaskRequest),
      exhaustMap((action) =>
        this.tasksHttpService.removeTaskService(action.id).pipe(
          map(() => removeTaskSucces()),
          catchError(async (error) => fetchFailure({ errors: error.message }))
        )
      )
    )
  );
  filterTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterTaskRequest),
      exhaustMap((action) =>
        this.tasksHttpService.filterTasksService(action).pipe(
          map((res: any) => filterTaskSuccess({ tasks: res?.$values })),
          catchError(async (error) => fetchFailure({ errors: error.message }))
        )
      )
    )
  );
  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTaskRequest),
      exhaustMap((action: any) =>
        this.tasksHttpService
          .createTaskService({ ...action, taskType: action.taskType })
          .pipe(
            map(() => createTaskSuccess()),
            catchError(async (error) => fetchFailure({ errors: error.message }))
          )
      )
    )
  );
  constructor(
    private tasksHttpService: TasksHttpService,

    private actions$: Actions,
    private store: Store
  ) {}

  fetchTasks() {
    this.store.dispatch(fetchTasksRequest());
  }
  fetchTask(id: number) {
    this.store.dispatch(fetchTaskRequest({ id }));
  }
  updateTask(
    id: number,
    data: {
      title?: string;
      summary?: string;
      status?: string;
      assignee?: string;
      type?: string;
      priority?: string;
    }
  ) {
    this.store.dispatch(updateTaskRequest({ id, data }));
  }
  removeTask(id: number) {
    this.store.dispatch(removeTaskRequest({ id }));
  }
  filterTask(data: { query?: string; status?: string; assignee?: string }) {
    this.store.dispatch(filterTaskRequest(data));
  }
  createTask(data: any) {
    this.store.dispatch(createTaskRequest(data));
  }
}
