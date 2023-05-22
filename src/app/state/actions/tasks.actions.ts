import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/interfaces';

export const fetchTasksRequest = createAction(
  '[Tasks Component] Fetch Tasks Request'
);
export const fetchTaskRequest = createAction(
  '[Tasks Component] Fetch Task Request',
  props<{ id: number }>()
);
export const updateTaskRequest = createAction(
  '[Tasks Component] Update Task Request',
  props<{
    id: number;
    data: {
      title?: string;
      description?: string;
      status?: string;
      assignee?: string;
      type?: string;
      priority?: string;
    };
  }>()
);
export const updateTaskSuccess = createAction(
  '[Tasks Component] Update Task Success'
);
export const removeTaskRequest = createAction(
  '[Tasks Component] Remove Task Request',
  props<{
    id: number;
  }>()
);
export const removeTaskSucces = createAction(
  '[Tasks Component] Remove Task Success'
);
export const fetchFailure = createAction(
  '[Tasks Component] Fetch Tasks Failure',
  props<{ errors: any }>()
);
export const fetchTasksSuccess = createAction(
  '[Tasks Component] Fetch Tasks Success',
  props<{ tasks: Task[] | null }>()
);
export const fetchTaskSuccess = createAction(
  '[Tasks Component] Fetch Task Success',
  props<{ task: any }>()
);
export const filterTaskRequest = createAction(
  '[Tasks Component] Filter Task Success',
  props<{ query?: any; status?: string; assignee?: string }>()
);
export const filterTaskSuccess = createAction(
  '[Tasks Component] Fetch Task Success',
  props<{ tasks: Task[] | null }>()
);
export const createTaskRequest = createAction(
  '[Tasks Component] Create Task Request',
  props<{
    data: any;
  }>()
);
export const createTaskSuccess = createAction(
  '[Tasks Component] Create Task Success'
);
