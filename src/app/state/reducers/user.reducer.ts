import { createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  logout,
  loginFailure,
  signupFailure,
} from '../actions/user.actions';

export const initialState: { token: string | null; errors: any | null } = {
  token: null,
  errors: '',
};

export const userReducer = createReducer(
  initialState,
  on(loginFailure, (state, { errors }) => ({ ...state, errors })),
  on(loginSuccess, (state, { token }) => ({ ...state, token })),
  on(signupFailure, (state, { errors }) => ({ ...state, errors })),
  on(logout, (state) => ({ ...state, token: null }))
);
