import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[User Component] Login Request',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[User Component] Login Success',
  props<{ token: string }>()
);
export const loginFailure = createAction(
  '[User Component] Login Failure',
  props<{ errors: string }>()
);
export const signupRequest = createAction(
  '[User Component] Signup Request',
  props<{ email: string; password: string }>()
);
export const signupFailure = createAction(
  '[User Component] Signup Request',
  props<{ errors: any }>()
);
export const signupSuccess = createAction('[User Component] Signup Request');
export const logout = createAction('[User Component] Logout');
