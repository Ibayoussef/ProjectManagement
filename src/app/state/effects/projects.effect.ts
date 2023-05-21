import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProjectHttpService } from 'src/app/services/projectServices';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import {
  fetchFailure,
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectsRequest,
  fetchProjectsSuccess,
} from '../actions/projects.actions';

@Injectable()
export class ProjectService {
  fetchProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjectsRequest),
      exhaustMap(() =>
        this.ProjectHttpService.projectsService().pipe(
          map((res) => fetchProjectsSuccess({ projects: res?.$values })),
          catchError(async (error) => fetchFailure({ errors: error.message }))
        )
      )
    )
  );
  fetchProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjectRequest),
      exhaustMap((action) =>
        this.ProjectHttpService.projectService(action.id).pipe(
          map(({ project }) => {
            return fetchProjectSuccess({ project: project });
          }),
          catchError(async (error) =>
            fetchFailure({ errors: error?.error?.$values })
          )
        )
      )
    )
  );

  constructor(
    private ProjectHttpService: ProjectHttpService,
    private actions$: Actions,
    private store: Store
  ) {}

  fetchProjects() {
    this.store.dispatch(fetchProjectsRequest());
  }
  fetchProject(id: number) {
    this.store.dispatch(fetchProjectRequest({ id }));
  }
}
