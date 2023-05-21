import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/interfaces';

export const fetchProjectsRequest = createAction(
  '[Projects Component] Fetch Projects Request'
);
export const fetchProjectRequest = createAction(
  '[Projects Component] Fetch Project Request',
  props<{ id: number }>()
);
export const fetchFailure = createAction(
  '[Projects Component] Fetch Projects Failure',
  props<{ errors: any }>()
);
export const fetchProjectsSuccess = createAction(
  '[Projects Component] Fetch Projects Success',
  props<{ projects: Project[] | null }>()
);
export const fetchProjectSuccess = createAction(
  '[Projects Component] Fetch Project Success',
  props<{ project: Project }>()
);
