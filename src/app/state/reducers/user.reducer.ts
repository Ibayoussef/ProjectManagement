import { createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  logout,
  loginFailure,
  signupFailure,
  fetchUsersSuccess,
} from '../actions/user.actions';

export const initialState: {
  token: string | null;
  errors: any | null;
  users: any;
} = {
  token: localStorage.getItem('token'),
  users: [],
  errors: '',
};

export const userReducer = createReducer(
  initialState,
  on(loginFailure, (state, { errors }) => ({ ...state, errors })),
  on(loginSuccess, (state, { token }) => {
    localStorage.setItem('token', token);
    return { ...state, token };
  }),
  on(fetchUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(signupFailure, (state, { errors }) => ({ ...state, errors })),
  on(logout, (state) => {
    localStorage.removeItem('token');
    return { ...state, token: null };
  })
);
