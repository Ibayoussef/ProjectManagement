import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProjectHttpService } from 'src/app/services/project.service';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import {
  searchProjectsRequest,
  createProjectRequest,
  createProjectSuccess,
  fetchFailure,
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectsRequest,
  fetchProjectsSuccess,
  searchProjectsSuccess,
  deleteProjectsRequest,
  deleteProjectsSuccess,
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
  searchProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProjectsRequest),
      exhaustMap((action) =>
        this.ProjectHttpService.searchProjectsService(action.search).pipe(
          map((res) => searchProjectsSuccess({ projects: res?.$values })),
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
  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProjectRequest),
      exhaustMap((action) =>
        this.ProjectHttpService.createProjectService(
          action.name,
          action.description
        ).pipe(
          map(() => {
            return createProjectSuccess();
          }),
          catchError(async (error) =>
            fetchFailure({ errors: error?.error?.$values })
          )
        )
      )
    )
  );
  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProjectsRequest),
      exhaustMap((action) =>
        this.ProjectHttpService.deleteProjectService(action.id).pipe(
          map(() => {
            return deleteProjectsSuccess();
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
  createProject(name: string, description: string) {
    this.store.dispatch(createProjectRequest({ name, description }));
  }
  searchProject(search: string) {
    this.store.dispatch(searchProjectsRequest({ search }));
  }
  deleteProject(id: number) {
    this.store.dispatch(deleteProjectsRequest({ id }));
  }
}
