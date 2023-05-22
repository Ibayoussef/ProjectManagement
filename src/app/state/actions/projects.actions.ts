import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/interfaces';

export const fetchProjectsRequest = createAction(
  '[Projects Component] Fetch Projects Request'
);
export const fetchProjectsSuccess = createAction(
  '[Projects Component] Fetch Projects Success',
  props<{ projects: Project[] | null }>()
);
export const fetchProjectRequest = createAction(
  '[Projects Component] Fetch Project Request',
  props<{ id: number }>()
);
export const fetchProjectSuccess = createAction(
  '[Projects Component] Fetch Project Success',
  props<{ project: Project }>()
);
export const createProjectRequest = createAction(
  '[Projects Component] Fetch Project Success',
  props<{ name: string; description: string }>()
);
export const createProjectSuccess = createAction(
  '[Projects Component] Fetch Project Success'
);
export const searchProjectsRequest = createAction(
  '[Projects Component] Search Projects Request',
  props<{ search: string }>()
);
export const searchProjectsSuccess = createAction(
  '[Projects Component] Search Projects Success',
  props<{ projects: Project[] | null }>()
);
export const deleteProjectsRequest = createAction(
  '[Projects Component] Search Projects Success',
  props<{ id: number }>()
);
export const deleteProjectsSuccess = createAction(
  '[Projects Component] Delete Projects Success'
);

export const fetchFailure = createAction(
  '[Projects Component] Fetch Projects Failure',
  props<{ errors: any }>()
);
